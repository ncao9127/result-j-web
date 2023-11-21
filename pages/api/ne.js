// Import necessary libraries
const axios = require('axios');
const cheerio = require('cheerio');

// Class for scraping results
class ResultScraper {
    constructor(rollNumber, degree, examCode, etype, result, grad, type) {
        // URL for fetching results
        this.url = 'http://results.jntuh.ac.in/resultAction';
        // this.url = "http://202.63.105.184/results/resultAction";
        this.rollNumber = rollNumber;
        this.degree = degree || null;
        this.examCode = examCode || null;
        this.etype = etype || null;
        this.result = result || null;
        this.grad = grad || null;
        this.type = type || null;
        this.data = { Details: {}, Results: {} };
        this.gradesToGPA = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, C: 5, 'D': 0, F: 0, 'P': 0, Ab: 0, '-': 0 };
    }

    // Method to fetch result data
    async fetchResult() {
        try {
            const payloadData = `?degree=${this.degree}&examCode=${this.examCode}&etype=${this.etype}&result=${this.result}&grad=${this.grad}&type=${this.type}&htno=${this.rollNumber}`;
            // console.log(payloadData);
            const response = await axios.get(this.url + payloadData);
            // console.log('Response HTML:', response.data);
            const $ = cheerio.load(response.data);

            // Extracting details from HTML
            const examName = $('h6').text();
            this.data.Results[examName] = {}
            const details = $('table').eq(0).find('tr');
            const htno = details.eq(0).find('td').eq(1).text();
            const name = details.eq(0).find('td').eq(3).text();
            const fatherName = details.eq(1).find('td').eq(1).text();
            const collegeCode = details.eq(1).find('td').eq(3).text();

            this.data.Details.NAME = name;
            this.data.Details.ROLL_NO = htno;
            this.data.Details.COLLEGE_CODE = collegeCode;
            this.data.Details.FATHER_NAME = fatherName;

            // Extracting results from HTML
            var results = $('table').eq(1).find('tr');

            const resultsColumnNames = results.eq(0).find('b').map((_, element) => $(element).text()).get();
            const gradeIndex = resultsColumnNames.indexOf('GRADE');
            const subjectNameIndex = resultsColumnNames.indexOf('SUBJECT NAME');
            const subjectCodeIndex = resultsColumnNames.indexOf('SUBJECT CODE');
            const subjectCreditsIndex = resultsColumnNames.indexOf('CREDITS(C)');
            const subjectInternalMarksIndex = resultsColumnNames.indexOf('INTERNAL');
            const subjectExternalMarksIndex = resultsColumnNames.indexOf('EXTERNAL');
            const subjectTotalMarksIndex = resultsColumnNames.indexOf('TOTAL');

            results = results.slice(1);
            results.each((_, resultSubject) => {
                const subjectName = $(resultSubject).find('td').eq(subjectNameIndex).text();
                const subjectCode = $(resultSubject).find('td').eq(subjectCodeIndex).text();
                const subjectGrade = $(resultSubject).find('td').eq(gradeIndex).text();
                const subjectCredits = $(resultSubject).find('td').eq(subjectCreditsIndex).text();
                const subjectInternalMarks = $(resultSubject).find('td').eq(subjectInternalMarksIndex).text();
                const subjectExternalMarks = $(resultSubject).find('td').eq(subjectExternalMarksIndex).text();
                const subjectTotalMarks = $(resultSubject).find('td').eq(subjectTotalMarksIndex).text();

                // Filter out lower grades for subjects already present
                if (subjectCode in this.data.Results[examName] &&
                    this.data.Results[examName][subjectCode].subject_grade !== 'F' &&
                    this.data.Results[examName][subjectCode].subject_grade !== 'Ab' &&
                    this.data.Results[examName][subjectCode].subject_grade !== '-' &&
                    this.gradesToGPA[this.data.Results[examName][subjectCode].subject_grade] > this.gradesToGPA[subjectGrade]) {
                    return;
                }

                // Store result data
                this.data.Results[examName][subjectCode] = {
                    subject_code: subjectCode,
                    subject_name: subjectName,
                    subject_internal: subjectInternalMarks,
                    subject_external: subjectExternalMarks,
                    subject_total: subjectTotalMarks,
                    subject_grade: subjectGrade,
                    subject_credits: subjectCredits
                };
            });
            console.log('Scraping successful! Result data:');
        } catch (error) {
            console.error('Error during scraping:', error.message);
            return null;
        }
    }
}

// Exporting API handler
export default async function handler(req, res) {

    // List of allowed origins
    const allowedOrigins = [
        "https://resultsjntuh.vercel.app",
        "https://resultsjntuh.netlify.app",
        "http://localhost:3000"
    ];

    // Get the origin of the request
    const origin = req.headers.origin;

    // Check if the request's origin is in the list of allowed origins
    if (allowedOrigins.includes(origin)) {
        // Set the Access-Control-Allow-Origin header to the request's origin
        res.setHeader("Access-Control-Allow-Origin", origin);
        console.log('Access Granted')
    } else {
        // Origin is not in the list of allowed origins
        // You can choose to handle this case based on your requirements
        console.log("Access Denied For This Origin Domain: " + origin);
        res.status(403).json("Forbidden");
        return;
    }

    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Retrieve parameters from the request URL
    const rollNumber = req.query['htno'];
    const degree = req.query['degree'];
    const examCode = req.query['examCode'];
    const etype = req.query['etype'];
    const result = req.query['result'];
    const grad = req.query['grad'];
    const type = req.query['type'];

    // Set values in the ResultScraper instance
    const scraper = new ResultScraper(rollNumber, degree, examCode, etype, result, grad, type);

    // Fetch and scrape results
    const startTime = performance.now();
    try {
        await scraper.fetchResult();
        const endTime = performance.now();
        console.log(rollNumber, 'Time taken:', endTime - startTime, 'seconds');
        res.status(200).json(scraper.data);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
        console.log(rollNumber, "results failed to fetch");
        res.end();
    }
}

// Configuration for the API
export const config = {
    api: {
        externalResolver: true,
    },
};
