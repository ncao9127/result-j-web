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
import HomeFooter from '../Home/HomeFooter';
import TypingAnimation from '../ui/TypingAnimation';


const Resultsanalysis = ({ query }) => {
    if (!query && query.length === 0) {
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
        </div>
        </>;
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
    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'P'];

    // Check if there are F, Ab, or - grades present
    const hasBacklogs = Object.keys(query['Results']).some((semesterKey) => {
        const semesterResults = query['Results'][semesterKey];
        return Object.keys(semesterResults).some((examKey) => {
            const examResults = semesterResults[examKey];
            return Object.keys(examResults).some((subjectCode) => {
                const subject = examResults[subjectCode];
                const grade = subject['subject_grade'];
                return grade === 'F' || grade === 'Ab' || grade === '-';
            });
        });
    });
    console.log("hasbacklogs", hasBacklogs);
    const animatedText = `You haven't written any ${semesterCode} supplementary exams ...`;

    if (!hasBacklogs) {
        return (
            <div
                style={{
                    marginTop: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <p className="capitalize">Hey! <b>{detailed['NAME']} </b><br /><TypingAnimation text={animatedText} /> </p>
                <br />
                <button
                    onClick={() => window.location.reload()}
                    className="w-[70px] text-white bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]"
                >
                    Refresh
                </button>
            </div>
        );
    }
    return (
        <>
            <div className="items-center justify-center text-center mt-10 ">
                <h1 className="mb-2 font-bold text-[180%]">Backlogs OverView</h1>
                <p>Supplementary Exams on Overall Results</p>
            </div>
            <br />
            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <table className="w-[100%] mt-1 my-1">
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
                {Object.keys(query['Results']).map((semesterKey) => {
                    const semesterResults = query['Results'][semesterKey];

                    return (
                        <div key={semesterKey}>
                            {Object.keys(semesterResults).map((examKey) => {
                                const examResults = semesterResults[examKey];

                                return (
                                    <div key={examKey}>
                                        <div className="items-center justify-center text-center mt-8">
                                            <h1 className="text-sm font-semibold font-sans text-green-600 text-bold md:text-xl">{examKey}</h1>
                                        </div>
                                        <table className="w-full my-1">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th>SUBJECT CODE</th>
                                                    <th>SUBJECT NAME</th>
                                                    <th>INTERNAL</th>
                                                    <th>EXTERNAL</th>
                                                    <th>TOTAL</th>
                                                    <th>GRADE</th>
                                                    <th>CREDITS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(examResults).map((subjectCode) => {
                                                    const subject = examResults[subjectCode];

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
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

            </div>

            <Info />
            <Hr />
            <HomeFooter />
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

export default Resultsanalysis;
