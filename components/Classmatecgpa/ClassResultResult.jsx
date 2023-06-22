import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import Hr from '../Hr/Hr';
import Info from '../Home/info';
import Branch from '../Json/Branch_codes.json';
import College from '../Json/college_codes.json';


const ClassResultResult = ({ query, semester }) => {
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
    const branchName = Branch.find(item => item.Code === branchCode);
    const collegeName = College.find(item => item.Code === collegeCode);


    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'P'];

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
            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]" >
                <h1 className=" font-bold text-[180%] text-center uppercase" >
                    {collegeName?.College || ''}
                </h1>
                <h1 className="mb-2 text-center uppercase" style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold' }}>
                    {branchName?.Branch || ''}
                </h1>
                <table className="w-[100%]">
                    <tbody>
                        <tr className="bg-white">
                            <th>{semester} Results</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <table className="w-[100%] my-1">
                    <tbody>
                        <tr className="bg-gray-300">
                            <th>ROLL NO</th>
                            <th>NAME</th>
                            <th>CREDITS</th>
                            <th>SGPA</th>
                            <th>STATUS</th>
                        </tr>
                        {query.map((value, index) => {
                            const Details = value['Details'];
                            const Results = value['Results'];

                            return (
                                <tr key={index}>
                                    <th>{Details['ROLL_NO'] === "" ? "-" : Details['ROLL_NO']}</th>
                                    <th>{Details['NAME'] === "" ? "-" : Details['NAME']}</th>
                                    {Object.keys(Results).map((val, index) => (
                                        <React.Fragment key={index}>
                                            <th>{Results[val]['credits'] === "" ? "-" : Results[val]['credits']}</th>
                                            <th>{Results[val]['SGPA'] === "" ? "-" : Results[val]['SGPA']}</th>
                                            <th className={Results[val]['status'] === 'FAILED' ? 'text-red-600' : 'text-green-600'}>{Results[val]['status'] === "" ? "-" : Results[val]['status']}</th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr className='bg-gray-300'><th>TOTAL STUDENTS</th><th>PASSED</th><th>FAILED</th></tr>
                        <tr><th>{totalStudents}</th><th>{passedStudents} ({totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(2) : 0}%)</th>
                            <th>{failedStudents} ({totalStudents > 0 ? ((failedStudents / totalStudents) * 100).toFixed(2) : 0}%)</th>
                        </tr>
                        <tr></tr>
                    </tbody>
                </table>
            </div>
            <Info />
            <Hr />
            <div>
                <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]">
                    Made with ❤ by &nbsp;

                    <a target="_blank" className="font-bold text-red-400 hover:text-red-600" >
                        MD MOIZ UDDIN
                    </a>
                </p>
            </div>

            <PrintButton />
            <ScrollToTop
                className='scroller'
                smooth
                viewBox="-5 0 18 18"
                svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }}
            />
        </>
    );

};

export default ClassResultResult;
