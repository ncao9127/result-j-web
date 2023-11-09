const axios = require('axios');
const cheerio = require('cheerio');
const Redis = require('ioredis');

// Create a new Redis client and connect to the Redis server
const redis = new Redis(process.env.REDIS_URL);

class ResultScraper {
    constructor(rollNumber) {
        this.url = 'http://results.jntuh.ac.in/resultAction';
        // this.url = "http://202.63.105.184/results/resultAction";
        this.rollNumber = rollNumber;
        this.results = { Details: {}, Results: {} };
        this.examCodes = {
            btech: {
                R16: {
                    '1-1': ['1302', '1324', '1359', '1405', '1431', '1468', '1505', '1573', '1616', '1659', '1701'],
                    '1-2': ['1310', '1357', '1363', '1382', '1436', '1482', '1571', '1621', '1657', '1706'],
                    '2-1': ['1297', '1319', '1352', '1392', '1426', '1450', '1497', '1561', '1611', '1632', '1668', '1708'],
                    '2-2': ['1438', '1477', '1566', '1606', '1631', '1664', '1712'],
                    '3-1': ['1315', '1348', '1387', '1421', '1455', '1492', '1551', '1591', '1630', '1646', '1687'],
                    '3-2': ['1337', '1396', '1442', '1446', '1472', '1556', '1596', '1629', '1650', '1683'],
                    '4-1': ['1383', '1417', '1459', '1487', '1546', '1586', '1641', '1679'],
                    '4-2': ['1409', '1413', '1463', '1483', '1601', '1674', '1692']
                }
            }
        };
        this.gradesToGPA = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, C: 5, 'D': 0, F: 0, 'P': 0, Ab: 0, '-': 0 };
        this.payloads = {
            btech: ['&degree=btech&etype=r17&result=null&grad=null&type=intgrade&htno=', '&degree=btech&etype=r17&result=gradercrv&grad=null&type=rcrvintgrade&htno='],
        };
    }

    async fetchResult(examCode, payload) {
        const payloadData = `?&examCode=${examCode}${payload}${this.rollNumber}`;
        const response = await axios.get(this.url + payloadData);
        return response.data;
    }

    scrapeResults(semesterCode, response) {
        const $ = cheerio.load(response);

        const details = $('table').eq(0).find('tr');
        const htno = details.eq(0).find('td').eq(1).text();
        const name = details.eq(0).find('td').eq(3).text();
        const fatherName = details.eq(1).find('td').eq(1).text();
        const collegeCode = details.eq(1).find('td').eq(3).text();

        this.results.Details.NAME = name;
        this.results.Details.ROLL_NO = htno;
        this.results.Details.COLLEGE_CODE = collegeCode;
        this.results.Details.FATHER_NAME = fatherName;

        var results = $('table').eq(1).find('tr');

        const resultsColumnNames = results.eq(0).find('b').map((_, element) => $(element).text()).get();
        const subjectInternalIndex = resultsColumnNames.indexOf('INTERNAL');
        const gradeIndex = resultsColumnNames.indexOf('GRADE');
        const subjectNameIndex = resultsColumnNames.indexOf('SUBJECT NAME');
        const subjectCodeIndex = resultsColumnNames.indexOf('SUBJECT CODE');
        const subjectCreditsIndex = resultsColumnNames.indexOf('CREDITS(C)');

        const subjectExternalIndex = resultsColumnNames.indexOf('EXTERNAL');
        const subjectTotalIndex = resultsColumnNames.indexOf('TOTAL');


        results = results.slice(1);
        results.each((_, resultSubject) => {
            const subjectName = $(resultSubject).find('td').eq(subjectNameIndex).text();
            const subjectCode = $(resultSubject).find('td').eq(subjectCodeIndex).text();
            const subjectGrade = $(resultSubject).find('td').eq(gradeIndex).text();
            const subjectCredits = $(resultSubject).find('td').eq(subjectCreditsIndex).text();
            const subjectInternal = $(resultSubject).find('td').eq(subjectInternalIndex).text();
            const subjectExternal = $(resultSubject).find('td').eq(subjectExternalIndex).text();
            const subjectTotal = $(resultSubject).find('td').eq(subjectTotalIndex).text();

            if (subjectCode in this.results.Results[semesterCode] &&
                this.results.Results[semesterCode][subjectCode].subject_grade !== 'F' &&
                this.results.Results[semesterCode][subjectCode].subject_grade !== 'Ab' &&
                this.results.Results[semesterCode][subjectCode].subject_grade !== '-' &&
                this.gradesToGPA[this.results.Results[semesterCode][subjectCode].subject_grade] > this.gradesToGPA[subjectGrade]) {
                return;
            }

            this.results.Results[semesterCode][subjectCode] = {
                subject_name: subjectName,
                subject_code: subjectCode,
                subject_internal: subjectInternal,
                subject_external: subjectExternal,
                subject_total: subjectTotal,
                subject_grade: subjectGrade,
                subject_credits: subjectCredits
            };
        });
        //           // Extract exam name
        //   const examName = $('h6').text();
        //   this.results.Results.exam_name = examName;

        //   console.log(examName);
    }

    totalGradeCalculator(code, value) {
        let total = 0;
        let credits = 0;
        let orgGrades = [];

        for (const data in value) {
            if (data === 'DETAILS') continue;

            // if (value[data].subject_grade === 'F' || value[data].subject_grade === 'Ab' || value[data].subject_grade === '-') {
            //     return '';
            // }

            total += parseInt(this.gradesToGPA[value[data].subject_grade]) * parseFloat(value[data].subject_credits);
            credits += parseFloat(value[data].subject_credits);
            orgGrades.push(value[data]['subject_grade']);
        }

        if (orgGrades.includes('F') || orgGrades.includes('Ab') || orgGrades.includes('-') || credits === 0) {
            this.results.Results[code]['status'] = 'FAILED';
        } else {
            this.results.Results[code]['status'] = 'PASSED';
        }
        this.results.Results[code].total = total;
        this.results.Results[code].credits = credits;
        this.results.Results[code].SGPA = (total / credits).toFixed(2);
    }

    async scrapeAllResults(examCode = 'all') {
        const session = axios.create();
        const tasks = {};
        var payloads = []
        var examCodes = {}
        if (this.rollNumber[5] === 'A') {
            payloads = this.payloads.btech;
            examCodes = this.examCodes.btech[this.rollNumber.startsWith('22') && this.rollNumber[4] !== '5' ? 'R16' : 'R16'];
        } else if (this.rollNumber[5] === 'R') {
            payloads = this.payloads.bpharmacy;
            examCodes = this.examCodes.bpharmacy[this.rollNumber.startsWith('22') && this.rollNumber[4] !== '5' ? 'R22' : 'R17'];
        } else if (this.rollNumber[5] == 'D') {
            payloads = this.payloads.mtech;
            examCodes = this.examCodes.mtech[this.rollNumber.startsWith('22') ? 'R22' : 'R19'];
        } else if (this.rollNumber[5] == 'S') {
            payloads = this.payloads.mpharmacy;
            examCodes = this.examCodes.mpharmacy[this.rollNumber.startsWith('22') ? 'R22' : 'R19'];
        } else if (this.rollNumber[5] == 'E') {
            payloads = this.payloads.mba;
            examCodes = this.examCodes.mba[this.rollNumber.startsWith('22') ? 'R22' : 'R19'];
        }

        if (this.rollNumber[4] === '5') {
            delete examCodes['1-1'];
            delete examCodes['1-2'];
        }

        if (examCode !== 'all') {
            examCodes = { [examCode]: examCodes[examCode] };
        }

        for (const examCode in examCodes) {
            tasks[examCode] = [];

            for (const code of examCodes[examCode]) {
                for (const payload of payloads) {
                    try {
                        const task = this.fetchResult(code, payload);
                        tasks[examCode].push(task);
                    } catch (error) {
                        console.error(this.rollNumber, error);
                    }
                }
            }
        }

        for (const examCode in tasks) {
            this.results.Results[examCode] = {};

            try {
                const responses = await Promise.all(tasks[examCode]);

                for (const response of responses) {
                    if (!response.includes('Enter HallTicket Number')) {
                        this.scrapeResults(examCode, response);
                    }
                }

                if (Object.keys(this.results.Results[examCode]).length > 0) {
                    this.totalGradeCalculator(examCode, this.results.Results[examCode]);
                } else {
                    delete this.results.Results[examCode];
                }
            } catch (error) {
                console.error(this.rollNumber, error);
            }
        }
        try {
            const results = this.results.Results;
            var total = 0, credits = 0;
            for (let val in results) {
                total = total + results[val].total
                credits = credits + results[val].credits

            }
            this.results.Results.Total = (total / credits).toFixed(2)
            if (this.results.Results.Total === "NaN") {
                this.results.Results.Total = ""
            }

        }
        catch (error) {
            console.log("okay")

        }

        return this.results;
    }

    async run() {
        return await this.scrapeAllResults();
    }
}


export default async function handler(req, res) {

    // List of allowed origins
    // const allowedOrigins = [
    //     "https://resultsjntuh.vercel.app",
    //     "https://resultsjntuh.netlify.app",
    //     "http://localhost:3000"
    // ];

    // // Get the origin of the request
    // const origin = req.headers.origin;

    // // Check if the request's origin is in the list of allowed origins
    // if (allowedOrigins.includes(origin)) {
    //     // Set the Access-Control-Allow-Origin header to the request's origin
    //     res.setHeader("Access-Control-Allow-Origin", origin);
    //     console.log('Access Granted')
    // } else {
    //     // Origin is not in the list of allowed origins
    //     // You can choose to handle this case based on your requirements
    //     console.log("Access Denied For This Origin Domain: " + origin);
    //     res.status(403).json("Forbidden");
    //     return;
    // }

    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, https://resultsjntuh.vercel.app, https://resultsjntuh.netlify.app');

    // Optionally, you can set other CORS headers if needed
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const startTime = performance.now();
    const rollNumber = req.query['htno'];
    const htnos = req.query['htnos']; // Parameter for multiple roll numbers separated by commas
    const examCode = req.query['code']; // New parameter for specifying the exam code
    const scraper = new ResultScraper(rollNumber);

    if (examCode) {
        scraper.scrapeAllResults(examCode) // Call the new method
            .then(results => {
                // const rollResult = results["Results"];
                // const totalResult = rollResult["Total"];
                // if (!totalResult || Object.keys(totalResult).length === 0) {
                //     // Skip this result if it is empty and return null
                //     console.log(rollNumber, 'Empty result');
                //     return null;
                // }
                const endTime = performance.now();
                console.log(rollNumber, 'Time taken:', endTime - startTime, 'seconds');
                res.status(200).json(results);
            })
            // .then(result => {
            //     // Filter out null results and send an empty response if all results are empty
            //     const filteredResults = result.filter(r => r !== null);
            //     if (filteredResults.length === 0) {
            //         console.log('All results are empty');
            //         res.status(200).json({});
            //     } else {
            //         res.status(200).json(filteredResults);
            //     }
            // })
            .catch(error => {
                console.error(error);
                res.status(500).json("Internal Server Error - 500");
            });
    } else if (rollNumber) {
        scraper.run()
            .then(results => {
                // const rollResult = results["Results"];
                // const totalResult = rollResult["Total"];
                // if (!totalResult || Object.keys(totalResult).length === 0) {
                //     // Skip this result if it is empty and return null
                //     console.log(rollNumber, 'Empty result');
                //     return null;
                // }
                const endTime = performance.now();
                console.log(rollNumber, 'Time taken:', endTime - startTime, 'seconds');

                // Set the data in Redis with the specified key and expiration time
                const jsonString = JSON.stringify(results);
                redis.set(rollNumber, jsonString, 'EX', 6 * 3600)
                    .then(() => {
                        console.log('Data has been set in the Redis cache.');
                    })
                    .catch((error) => {
                        console.error('Error setting data in the Redis cache:', error);
                    });

                res.status(200).json(results);
            })
            // .then(result => {
            //     // Filter out null results and send an empty response if all results are empty
            //     const filteredResults = result.filter(r => r !== null);
            //     if (filteredResults.length === 0) {
            //         console.log('All results are empty');
            //         res.status(200).json({});
            //     } else {
            //         res.status(200).json(filteredResults);
            //     }
            // })
            .catch(error => {
                console.error(error);
                res.status(500).json("Internal Server Error");
                console.log(htno, "results failed to fetch")
                res.end();
            });
    } else if (htnos) {
        const rollNumbers = htnos.split(",");
        const resultsPromises = rollNumbers.map(number => {
            const scraper = new ResultScraper(number.trim());
            return scraper.run()
                .then(results => {
                    const rollResult = results["Results"];
                    const totalResult = rollResult["Total"];
                    if (!totalResult) {
                        // Skip this result and proceed to the next roll number
                        return null;
                    }
                    return results;
                })
                .catch(error => {
                    console.error(error);
                    return null;
                });
        });

        Promise.all(resultsPromises)
            .then(results => {
                const validResults = results.filter(result => result !== null);
                const endTime = performance.now();
                console.log(rollNumbers, "Multiple Roll Numbers", 'Time taken:', endTime - startTime, 'seconds');
                res.status(200).json(validResults);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json("Internal Server Error");
            });
    } else {
        res.status(400).json("Bad Request");
    }
}

export const config = {
    api: {
        externalResolver: true,
    },
}
