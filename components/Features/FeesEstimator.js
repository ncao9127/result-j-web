// import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import React, { useState } from 'react';
import Link from "next/link";
import Info from '../Home/info';
import Hr from '../Hr/Hr';
import Jntuh from '../Home/jnuth';
import HomeFooter from '../Home/HomeFooter';
import TypingAnimation from '../ui/TypingAnimation';

const FeesEstimator = ({ query }) => {

    // State to track selected subjects for each semester
    const [selectedSubjectsBySemester, setSelectedSubjectsBySemester] = useState({});
    
    const Results = query['Results'];
    const Details = query['Details'];

    const rollNumber = Details['ROLL_NO'];
    let isUG = false; // Default value, assuming not an undergraduate
    let isPG = false; // Default value, assuming not a postgraduate
    if (rollNumber[5] === 'A' || rollNumber[5] === 'R') {
        isUG = true;
        console.log("Undergraduate Student");
    } else if (rollNumber[5] === 'D' || rollNumber[5] === 'S' || rollNumber[5] === 'E') {
        isPG = true;
        console.log("Postgraduate Student");
    } else {
        console.log("Invalid Graduate");
    }

    // Create a list to store semesters and their subjects
    const semesterSubjects = [];

    // Group subjects by semester
    Object.keys(Results).forEach((val) => {
        if (val !== 'Total') {
            const semester = val;
            const subjects = Object.keys(Results[val]).filter(
                (item) =>
                    Results[val][item]['subject_grade'] === 'F' ||
                    Results[val][item]['subject_grade'] === 'Ab' ||
                    Results[val][item]['subject_grade'] === '-'
            );
            semesterSubjects.push({ semester, subjects });
        }
    });

    // Check if F, Ab, or - grades are present
    const hasBacklogs = Object.keys(Results).some(val =>
        val !== 'Total' && Object.keys(Results[val]).some(item =>
            Results[val][item]['subject_grade'] === 'F' ||
            Results[val][item]['subject_grade'] === 'Ab' ||
            Results[val][item]['subject_grade'] === '-'
        )
    );
    console.log('Has Backlogs', hasBacklogs);

    const animatedText = `You Don't have any supplementary exams here... have a nice day ...`;

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
                <p className="capitalize">
                    Hello ! <b>{Details['NAME']} </b>
                    <br />
                    <TypingAnimation text={animatedText} />
                </p>
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

    // Function to handle checkbox selection
    const handleCheckboxChange = (semester, subject) => {
        // Create a copy of the current selected subjects for the semester
        const selectedSubjectsForSemester = selectedSubjectsBySemester[semester] || [];

        // Check if the subject is already selected, and toggle its selection
        if (selectedSubjectsForSemester.includes(subject)) {
            const updatedSelectedSubjects = selectedSubjectsForSemester.filter((item) => item !== subject);
            setSelectedSubjectsBySemester({ ...selectedSubjectsBySemester, [semester]: updatedSelectedSubjects });
        } else {
            const updatedSelectedSubjects = [...selectedSubjectsForSemester, subject];
            setSelectedSubjectsBySemester({ ...selectedSubjectsBySemester, [semester]: updatedSelectedSubjects });
        }
    };
    // console.log(selectedSubjectsBySemester);

    // Calculate the total selected subjects across all semesters
    const totalSelectedSubjectsCount = Object.keys(selectedSubjectsBySemester).reduce((total, semester) => {
        return total + (selectedSubjectsBySemester[semester] ? selectedSubjectsBySemester[semester].length : 0);
    }, 0);

    // Calculate the exam fee for each semester based on the number of selected subjects
    const examFeesBySemester = Object.keys(selectedSubjectsBySemester).reduce((fees, semester) => {
        const selectedSubjectsCount = selectedSubjectsBySemester[semester] ? selectedSubjectsBySemester[semester].length : 0;

        let semesterExamFee = 0;

        if (isUG) {
            // Adjust the fee calculation for undergraduate students
            if (selectedSubjectsCount === 1) {
                semesterExamFee = 360; // Rs. 360 for one subject
            } else if (selectedSubjectsCount === 2) {
                semesterExamFee = 460; // Rs. 460 for two subjects
            } else if (selectedSubjectsCount === 3) {
                semesterExamFee = 560; // Rs. 560 for three subjects
            } else if (selectedSubjectsCount > 3) {
                semesterExamFee = 760; // Rs. 760 for four or more subjects
            }
        } else if (isPG) {
            // Adjust the fee calculation for postgraduate students
            if (selectedSubjectsCount === 1) {
                semesterExamFee = 365; // Rs. 365 for one subject
            } else if (selectedSubjectsCount === 2) {
                semesterExamFee = 615; // Rs. 615 for two subjects
            } else if (selectedSubjectsCount > 2) {
                semesterExamFee = 955; // Rs. 955 for three or more subjects
            }
        }

        // Store the calculated fee for this semester
        fees[semester] = semesterExamFee;

        return fees;
    }, {});

    // Calculate the total exam fee
    const totalExamFee = Object.keys(examFeesBySemester).reduce((total, semester) => {
        return total + examFeesBySemester[semester];
    }, 0);

    // Function to convert a number to words
    function numberToWords(number) {
        const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

        function convertThreeDigits(num) {
            const hundred = Math.floor(num / 100);
            const remainder = num % 100;
            const words = [];

            if (hundred > 0) {
                words.push(units[hundred] + " Hundred");
            }

            if (remainder > 0) {
                if (remainder < 10) {
                    words.push(units[remainder]);
                } else if (remainder < 20) {
                    words.push(teens[remainder - 10]);
                } else {
                    words.push(tens[Math.floor(remainder / 10)]);
                    if (remainder % 10 > 0) {
                        words.push(units[remainder % 10]);
                    }
                }
            }

            return words.join(" ");
        }

        if (number === 0) {
            return "Zero";
        }

        const billion = Math.floor(number / 1000000000);
        const million = Math.floor((number % 1000000000) / 1000000);
        const thousand = Math.floor((number % 1000000) / 1000);
        const remainder = number % 1000;
        const words = [];

        if (billion > 0) {
            words.push(convertThreeDigits(billion) + " Billion");
        }

        if (million > 0) {
            words.push(convertThreeDigits(million) + " Million");
        }

        if (thousand > 0) {
            words.push(convertThreeDigits(thousand) + " Thousand");
        }

        if (remainder > 0) {
            words.push(convertThreeDigits(remainder));
        }

        return words.join(" ") + " Rupees Only /-";
    }

    // Example usage
    const totalExamFeeInWords = numberToWords(totalExamFee);
    console.log(totalExamFeeInWords);

    return (
        <>
            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <br />
                <table className="my-1" key="Details">
                    <tbody>
                        <tr class="bg-gray-200 dark:bg-slate-900">
                            <th>NAME</th>
                            <th>ROLL NO</th>
                            <th>COLLEGE CODE</th>
                            <th>FATHER NAME</th>
                        </tr>
                        <tr>
                            <th>{Details['NAME']}</th>
                            <th>{Details['ROLL_NO']}</th>
                            <th>{Details['COLLEGE_CODE']}</th>
                            <th>{Details['FATHER_NAME']}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <div id="1">
                    <table>
                        <tbody>
                            <tr class="bg-gray-200 dark:bg-slate-900">
                                <th colSpan={5}>Supplementary Exams Fee</th>
                            </tr>
                            <tr class="bg-gray-200 dark:bg-slate-900">
                                <th>SEMESTERS</th>
                                <th>SUBJECT NAME</th>
                                <th>SELECT</th>
                                <th>SUBJECTS</th>
                                <th>AMOUNT</th>
                            </tr>
                            {semesterSubjects.map((semesterData, index) => (
                                semesterData.subjects.map((item, subjectIndex) => (
                                    <tr key={subjectIndex}>
                                        {subjectIndex === 0 ? (
                                            <th class="no-hover" rowSpan={semesterData.subjects.length}>
                                                {semesterData.semester}
                                            </th>
                                        ) : null}
                                        <th class="no-hover">
                                            {Results[semesterData.semester][item]['subject_name'] === ''
                                                ? '-'
                                                : Results[semesterData.semester][item]['subject_name']}{' '}
                                            <sub>
                                                (
                                                {Results[semesterData.semester][item]['subject_code'] === ''
                                                    ? ''
                                                    : Results[semesterData.semester][item]['subject_code']}
                                                )
                                            </sub>
                                        </th>
                                        <th><input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(semesterData.semester, item)}
                                        /> </th>
                                        {subjectIndex === 0 ? (
                                            <th class="no-hover" rowSpan={semesterData.subjects.length}>
                                                {selectedSubjectsBySemester[semesterData.semester] && selectedSubjectsBySemester[semesterData.semester].length > 0 ? (
                                                    <span>
                                                        {selectedSubjectsBySemester[semesterData.semester].length}
                                                    </span>
                                                ) : null}
                                            </th>
                                        ) : null}
                                        {subjectIndex === 0 ? (
                                            <th class="no-hover" rowSpan={semesterData.subjects.length}>
                                                {/* {examFeesBySemester[semesterData.semester] ? examFeesBySemester[semesterData.semester] + ' Rs.' : ''} */}
                                                {examFeesBySemester[semesterData.semester] ? examFeesBySemester[semesterData.semester].toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : ''}
                                            </th>
                                        ) : null}
                                    </tr>
                                ))
                            ))
                            }
                            <tr><th colSpan={3}>TOTAL SUBJECTS</th> {totalSelectedSubjectsCount > 0 && (
                                <th>{totalSelectedSubjectsCount}</th>
                            )}</tr>
                            <tr><th colSpan={4}>TOTAL AMOUNT</th><th className='text-green-600'>{totalExamFee ? totalExamFee.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : ''}</th></tr>
                            <tr><th colSpan={5} className='text-green-600 '> {totalExamFee ? totalExamFeeInWords : ''}</th></tr>
                        </tbody>
                        <caption className='caption-bottom'>
                            <div className="mt-1 block text-center text-[#808080]  mb-4 text-[55%] md:text-[80%] text-red-600 capitalize">
                                <b>NOTE :-</b> select only the subjects for which you have present supply exams.<br />
                                However, there will be additional charges for individual subjects taken from your institute.<br />
                            </div>
                        </caption>
                    </table>
                    <center>
                        {isUG ? (
                            <table className="md:w-1/2 lg:w-1/3" >
                                {/* <caption className='caption-bottom'>Examination Fee</caption> */}
                                <tbody>
                                    <tr class="bg-gray-100 dark:bg-slate-900">
                                        <td>FOR WHOLE EXAMINATION (ALL SUBJECTS)</td>
                                        <td>Rs.760/-</td>
                                    </tr>
                                    <tr>
                                        <td>FOR ONE SUBJECT (THEORY/PRACTICAL)</td>
                                        <td>Rs.360/-</td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-slate-900">
                                        <td>FOR TWO SUBJECTS (THEORY/PRACTICAL/BOTH)</td>
                                        <td>Rs.460/-</td>
                                    </tr>
                                    <tr>
                                        <td>FOR THREE SUBJECTS (THEORY/PRACTICAL/BOTH)</td>
                                        <td>Rs.560/-</td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-slate-900">
                                        <td>FOR FOUR SUBJECTS AND ABOVE</td>
                                        <td>Rs.760/-</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <table className="md:w-1/2 lg:w-1/3 text-sm" >
                                {/* <caption className='caption-bottom'>Examination Fee</caption> */}
                                <tbody>
                                    <tr class="bg-gray-100 dark:bg-slate-900">
                                        <td>FOR WHOLE EXAMINATION (ALL SUBJECTS)</td>
                                        <td>Rs.955/-</td>
                                    </tr>
                                    <tr>
                                        <td>FOR ONE SUBJECT (THEORY/PRACTICAL)</td>
                                        <td>Rs.365/-</td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-slate-900">
                                        <td>FOR TWO SUBJECTS (THEORY/PRACTICAL/BOTH)</td>
                                        <td>Rs.615/-</td>
                                    </tr>
                                    <tr>
                                        <td>FOR THREE SUBJECTS (THEORY/PRACTICAL/BOTH)</td>
                                        <td>Rs.840/-</td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-slate-900">
                                        <td>FOR FOUR SUBJECTS AND ABOVE</td>
                                        <td>Rs.955/-</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </center>
                </div>
                <Info />
                <Hr />
                <HomeFooter />
            </div>
            <PrintButton />
            <ScrollToTop
                className="scroller"
                smooth
                viewBox="-5 0 18 18"
                svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }}
            />
        </>
    );
};

export default FeesEstimator;