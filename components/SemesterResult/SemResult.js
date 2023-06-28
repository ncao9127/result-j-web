import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import Info from '../Home/info';
import Hr from '../Hr/Hr';
import Jntuh from '../Home/jnuth';
import Branch from '../Json/Branch_codes.json';
import College from '../Json/college_codes.json';
import mpbranch from '../Json/mpharmbranchcode.json'
import mbranch from '../Json/mtechbranchcodes.json'
import Mba from '../Json/mbabranchcode.json'


const SemResult = ({ query }) => {
    if (!query) {
        // Handle the case when the query is empty or undefined
        return <><div
            style={{
                marginTop: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <p>500 | Please try again later</p>
            <br />
            <button onClick={() => window.location.reload()} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >Refresh</button>
        </div></>;
    }

    const detailed = query['Details'];
    if (!detailed) {
        // Handle the case when the 'Details' property is missing in the query
        return <><div
            style={{
                marginTop: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <p>500 | Please try again later</p>
            <br />
            <button onClick={() => window.location.reload()} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >Refresh</button>
        </div></>;
    }

    const collegeCode = detailed['COLLEGE_CODE'];
    // const branchCode = detailed['ROLL_NO'].slice(6, 8);
    // const branchName = Branch.find(item => item.Code === branchCode);
    const rollNumber = detailed['ROLL_NO'];
    let branchName;

    if (rollNumber[5] === 'A' || rollNumber[5] === 'R') {
        const branchCode = rollNumber.slice(6, 8);
        branchName = Branch.find(item => item.Code === branchCode)?.Branch || '-';
    } else if (rollNumber[5] === 'D') {
        const branchCode = rollNumber.slice(6, 8);
        branchName = mbranch.find(item => item.Code === branchCode)?.Branch || '-';
    } else if (rollNumber[5] === 'S') {
        const branchCode = rollNumber.slice(6, 8);
        branchName = mpbranch.find(item => item.Code === branchCode)?.Branch || '-';
    } else if (rollNumber[5] === 'E') {
        const branchCode = rollNumber.slice(6, 8);
        branchName = Mba.find(item => item.Code === branchCode)?.Branch || '-';
    } else {
        branchName = '-';
    }


    const collegeName = College.find(item => item.Code === collegeCode);
    const semesterCode = Object.keys(query['Results'])[0]; // Extracting the semester code
    // console.log(semesterCode);

    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'P'];

    return (
        <>
            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]" >
                {/* <h1 className=" font-bold text-[180%] text-center uppercase" >
                    {collegeName?.College || ''}
                </h1>
                <h1 className="mb-2 text-center uppercase" style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold' }}>
                    {branchName?.Branch || ''}
                </h1> */}

                {/* <table className="w-[100%]">
                    <tbody>
                        <tr className="bg-gray-300 md:bg-white">
                            <th>{semesterCode}</th>
                        </tr>
                    </tbody>
                </table> */}
            </div>

            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <table className="w-[100%] mt-10 my-1">
                    <tbody>
                        <tr class="bg-gray-200">
                            <th>ROLL NO</th><th>NAME</th>
                            <th>FATHER NAME</th><th>BRANCH</th>
                            <th>SEMESTER</th>
                        </tr>
                        <tr>
                            <th>{detailed['ROLL_NO']}</th>
                            <th>{detailed['NAME']}</th>
                            <th>{detailed['FATHER_NAME']}</th>
                            <th className='uppercase'>{branchName}</th>
                            <th>{semesterCode}</th>
                        </tr>
                    </tbody>
                </table>
                <table className="w-[100%] my-1">
                    <tbody>
                        <tr class="mx-auto w-max bg-gray-200">
                            <th>COLLEGE CODE</th><th>COLLEGE NAME</th>
                        </tr>
                        <tr>
                            <th>{detailed['COLLEGE_CODE']}</th><th className='uppercase'>{collegeName?.College || '-'}</th>
                        </tr>
                    </tbody>
                </table>
                {Object.keys(query['Results']).map((semester) => {
                    const Results = query['Results'][semester];

                    return (
                        <div key={semester} id='1'>
                            <table>
                                <tbody>
                                    <tr className="mx-auto w-max bg-gray-200">
                                        <th>SUBJECT CODE</th>
                                        <th>SUBJECT NAME</th>
                                        <th>INTERNAL</th>
                                        <th>EXTERNAL</th>
                                        <th>TOTAL</th>
                                        <th>GRADE</th>
                                        <th>CREDITS</th>
                                    </tr>
                                    {Object.keys(Results).map((subjectCode) => {
                                        if (subjectCode !== 'total' && subjectCode !== 'credits' && subjectCode !== 'status' && subjectCode !== 'SGPA') {
                                            const subject = Results[subjectCode];
                                            return (
                                                <tr key={subjectCode}>
                                                    <th>{subject['subject_code']}</th>
                                                    <th>{subject['subject_name']}</th>
                                                    <th>{subject['subject_internal'] === "" ? "-" : subject['subject_internal']}</th>
                                                    <th>{subject['subject_external'] === "" ? "-" : subject['subject_external']}</th>
                                                    <th>{subject['subject_total'] === "" ? "-" : subject['subject_total']}</th>
                                                    <th className={` ${!grades.includes(subject['subject_grade']) ? 'text-red-600' : 'text-green-600'}`}>{subject['subject_grade'] === "-" ? "MALPRACTICE" : subject['subject_grade']}</th>
                                                    <th>{subject['subject_credits'] === "" ? "-" : subject['subject_credits']}</th>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <th style={{ width: '75%' }}>SGPA</th>
                                        <th>{Results['SGPA']}</th>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '75%' }}>Result</th>
                                        <th className={Results['status'] === 'FAILED' ? 'text-red-600' : 'text-green-600'}>{Results['status']}</th>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                        </div>
                    );
                })}
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

export default SemResult;
