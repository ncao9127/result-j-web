import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import Hr from '../Hr/Hr';
import Info from '../Home/info';
import { useState, useEffect } from 'react';
import Branch from '../Json/Branch_codes.json';
import College from '../Json/college_codes.json';

const ClassResultResult = ({ query, semester }) => {
    const [disableMessage, setDisableMessage] = useState(false);

    useEffect(() => {
        const disableTimeout = setTimeout(() => {
            setDisableMessage(true);
        }, 2 * 60 * 1000); // 3 minutes in milliseconds

        return () => clearTimeout(disableTimeout);
    }, []);
    if (!query || query.length === 0) {
        // Handle the case when the query array is empty
        return <div>No results found.</div>;
    }

    const detailed = query[0]['Details'];
    if (!detailed) {
        // Handle the case when the first object in the query array does not have 'Details' property
        return <div>Invalid data format.</div>;
    }

    const collegeCode = detailed['COLLEGE_CODE'];
    const branchCode = detailed['ROLL_NO'].slice(6, 8);
    const branchName = Branch.find((item) => item.Code === branchCode);
    const collegeName = College.find((item) => item.Code === collegeCode);

    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C'];
    // ...

    // Create an object to store the subject-wise pass/fail count and percentage
    const subjectStats = {};

    // Iterate over the query array to calculate subject-wise pass/fail count and percentage
    query.forEach((value) => {
        const Results = value['Results'];

        Object.keys(Results).forEach((val) => {
            if (val !== 'Total') {
                Object.keys(Results[val]).forEach((item) => {
                    if (
                        item !== 'SGPA' &&
                        item !== 'total' &&
                        item !== 'credits' &&
                        item !== 'status'
                    ) {
                        const subjectCode = Results[val][item]['subject_code'];
                        const subjectName = Results[val][item]['subject_name'];
                        const grade = Results[val][item]['subject_grade'];

                        // Update subjectStats object with pass/fail count
                        if (subjectStats[subjectCode]) {
                            subjectStats[subjectCode].total++;
                            if (grade !== 'F' && grade !== 'AB' && grade !== '-') {
                                subjectStats[subjectCode].passed++;
                            }
                        } else {
                            subjectStats[subjectCode] = {
                                name: subjectName,
                                total: 1,
                                passed: (grade !== 'F' && grade !== 'AB' && grade !== '-') ? 1 : 0,
                            };
                        }
                    }
                });
            }
        });
    });

    // ...
    const totalStudents = query.length;
    let passedStudents = 0;
    let failedStudents = 0;

    query.forEach((value) => {
        const Results = value['Results'];

        Object.keys(Results).forEach((val) => {
            if (Results[val]['status'] === 'PASSED') {
                passedStudents++;
            } else {
                failedStudents++;
            }
        });
    });


    return (
        <>
            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <h1 className=" font-bold text-[180%] text-center uppercase">
                    {collegeName?.College || ''}
                </h1>
                <h1
                    className="mb-2 text-center uppercase"
                    style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold' }}
                >
                    {branchName?.Branch || ''}
                </h1>

                <table className="w-[100%]">
                    <tbody>
                        <tr className="bg-white">
                            <th>{semester} Semester Subjects Results Stats</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <table className='my-1'>
                    <tbody>
                        <tr className="mx-auto w-max bg-gray-200">
                            <th>SUBJECT CODE</th>
                            <th>SUBJECT NAME</th>
                            <th>PASS<sub style={{ fontSize: '5px' }}>(STUDS)</sub></th>
                            <th>FAIL<sub style={{ fontSize: '5px' }}>(STUDS)</sub></th>
                            {/* <th>PERCENTAGE</th> */}
                        </tr>
                        {Object.entries(subjectStats).map(([subjectCode, subjectData]) => (
                            <tr key={subjectCode}>
                                <th>{subjectCode}</th>
                                <th>{subjectData.name}</th>
                                <th>
                                    {subjectData.passed} <sub>({((subjectData.passed / subjectData.total) * 100).toFixed()}%)</sub>
                                </th>
                                <th>{subjectData.total - subjectData.passed} <sub>({(((subjectData.total - subjectData.passed) / subjectData.total) * 100).toFixed()}%)</sub></th>

                            </tr>
                        ))}

                    </tbody>
                </table>
                <table>
                    <tbody>

                        <tr className='bg-gray-300'><th>TOTAL STUDENTS</th><th>PASSED</th><th>FAILED</th></tr>
                        <tr><th>{totalStudents}</th><th>{passedStudents} <sub>({totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed() : 0}%)</sub></th>
                            <th>{failedStudents} <sub>({totalStudents > 0 ? ((failedStudents / totalStudents) * 100).toFixed() : 0}%)</sub></th>
                        </tr>
                        <tr></tr>
                    </tbody>
                </table>
            </div>
            <div className="font-serif block text-center text-[#808080]  text-[55%] md:text-[80%]">
                <sup>NOTE:-</sup>Caluclation Done Based Upon Regular & Lateral Entery Students Only..<br />
                {!disableMessage && (
                    <>
                        Query Queue Updating. Please be patient !<span className="animate-ellipsis"></span>
                    </>
                )}
            </div>


            <Info />
            <Hr />
            <div>
                <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]">
                    Made with ❤ by&nbsp;
                    <a
                        target="_blank"
                        className="font-bold text-red-400 hover:text-red-600"
                    >
                        MD MOIZ UDDIN
                    </a>
                </p>

            </div>

            <PrintButton />
            <ScrollToTop
                className="scroller"
                smooth
                viewBox="-5 0 18 18"
                svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                style={{ bottom: '30px', opacity: 0.75, backgroundColor: 'grey' }}
            />
        </>
    );
};

export default ClassResultResult;
