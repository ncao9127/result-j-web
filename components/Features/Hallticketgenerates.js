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
import Hallticketview from './Hallticketview';
import Head from 'next/head';

const Hallticketgenerate = ({ query }) => {

    // State variable to store subject details
    const [subjectDetails, setSubjectDetails] = useState({});
    const [isModalVisible, setModalVisible] = useState(false);

    const Results = query['Results'];
    const Details = query['Details'];
    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'P'];

    // Check if F, Ab, or - grades are present
    const hasBacklogs = Object.keys(Results).some(val =>
        val !== 'Total' && Object.keys(Results[val]).some(item =>
            Results[val][item]['subject_grade'] === 'F' ||
            Results[val][item]['subject_grade'] === 'Ab' ||
            Results[val][item]['subject_grade'] === '-'
        )
    );
    console.log('Has Backlogs', hasBacklogs);
    const animatedText = `You Don't have any supplementary exams here...`;

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
                <p className="capitalize">Hello! <b className='bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>{Details['NAME']} </b><br /><TypingAnimation text={animatedText} /> </p>
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

    // Function to handle changes in date or time
    const handleDateTimeChange = (sem, subjectIndex, fieldType, value) => {
        setSubjectDetails(prevDetails => {
            const updatedSubjectDetails = { ...prevDetails };

            // Get the subject data
            const subject = Results[sem][subjectIndex];

            // Create or update object for the subject if it doesn't exist
            if (!updatedSubjectDetails[subjectIndex]) {
                updatedSubjectDetails[subjectIndex] = {
                    date: subject['date'] || null,
                    time: subject['time'] || null,
                    subjectName: subject['subject_name'],
                    semester: sem,
                };
            }

            // Update the date or time for the specified subject
            if (fieldType === 'date') {
                updatedSubjectDetails[subjectIndex]['date'] = value;
            } else if (fieldType === 'time') {
                updatedSubjectDetails[subjectIndex]['time'] = value;
            }

            // Output subject details in the console
            console.log('Subject Details:', updatedSubjectDetails[subjectIndex]);
            return updatedSubjectDetails;
        });
    };

    // Function to handle the link click and show the modal
    const handleLinkClick = () => {
        setModalVisible(true);
    };
    // Function to hide the modal
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Head>
                <title>Hallticket View</title>
                <meta
                    name="description"
                    content="Hallticket View"
                />
            </Head>
            <div className='m-2 mb-6 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]'>
                <br />
                {/* <Jntuh /> */}
                <table className="my-1 text-center border-0" key="Details">
                    <tbody className='divide-y'>
                        <tr class="bg-gray-200 dark:bg-slate-900 font-bold no-hover">
                            <td>NAME</td>
                            <td>ROLL NO</td>
                            <td>COLLEGE CODE</td>
                            <td>FATHER NAME</td>
                        </tr>
                        <tr>
                            <td>{Details['NAME']}</td><td>{Details['ROLL_NO']}</td><td>{Details['COLLEGE_CODE']}</td><td>{Details['FATHER_NAME']}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="m-4 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <div id='1'>
                    {Object.keys(Results).some(val => val !== 'Total' && Object.keys(Results[val]).some(item => Results[val][item]['subject_grade'] === 'F' || Results[val][item]['subject_grade'] === 'Ab' || Results[val][item]['subject_grade'] === '-')) && (

                        <table className='text-center border-0'>
                            <thead>
                                <tr class="bg-gray-200 dark:bg-slate-900 no-hover font-medium">
                                    <td colspan={10}>SUPPLEMENTARY EXAM</td>
                                </tr>
                                <tr className='font-bold no-hover'>
                                    <td>SUBJECT CODE</td>
                                    <td>SUBJECT NAME</td>
                                    <td>DATE</td>
                                    <td>TIMING</td>
                                </tr>
                            </thead>
                            <tbody className='divide-y border-0'>
                                {Object.keys(Results).map((sem) => {
                                    if (sem !== 'Total') {
                                        const subjects = Object.keys(Results[sem]).filter(item => Results[sem][item]['subject_grade'] === 'F' || Results[sem][item]['subject_grade'] === 'Ab' || Results[sem][item]['subject_grade'] === '-');
                                        if (subjects.length > 0) {
                                            return (
                                                <>
                                                    <tr class="mx-auto w-max bg-gray-200 dark:bg-slate-900 no-hover font-medium">
                                                        <td colspan={10}>{sem} Results</td>
                                                    </tr>
                                                    {Object.keys(Results[sem]).map((subjectIndex) => {
                                                        const subject = Results[sem][subjectIndex];
                                                        if (subject['subject_grade'] === 'F' || subject['subject_grade'] === 'Ab' || subject['subject_grade'] === '-') {
                                                            return (
                                                                <tr key={subjectIndex}>
                                                                    <td>{subject['subject_code'] === "" ? "-" : subject['subject_code']}</td>
                                                                    <td>{subject['subject_name'] === "" ? "-" : subject['subject_name']}</td>
                                                                    <td>
                                                                        {/* Input for date */}
                                                                        <input
                                                                            type='date'
                                                                            onChange={(e) => handleDateTimeChange(sem, subjectIndex, 'date', e.target.value)}
                                                                            placeholder='Select Date'
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        {/* Input for time */}
                                                                        {/* <input
                                                                            type='time'
                                                                            onChange={(e) => handleDateTimeChange(sem, subjectIndex, 'time', e.target.value)}
                                                                        /> */}
                                                                        <select onChange={(e) => handleDateTimeChange(sem, subjectIndex, 'time', e.target.value)}>
                                                                            <option value="">Select Timing</option>
                                                                            <option value="10:00 AM - 01:00 PM">10:00 - 01:00</option>
                                                                            <option value="02:00 PM - 05:00 PM">02:00 - 05:00</option>
                                                                        </select>

                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    })}

                                                </>
                                            );
                                        }
                                    }
                                })}
                            </tbody>
                            {/* <caption className='caption-bottom mt-4 text-red-400 capitalize'>please select date and time for which you have current supply exams as per exam time table - read steps below</caption> */}
                        </table>
                    )}
                </div>
                <div>
                    <div className="my-6 text-[55%] md:text-[80%]">
                        <div id="howtouse" className="font-bold mb-4 ml-2">
                            How to Use?
                        </div>
                        <div className="font-light text-gray-400">
                            <ol className="list-decimal pl-4">
                                <li className='m-2'>Check the official supplementary exam timetable provided by JNTUH thoroughly to understand your scheduled subjects for the supplementary exams.</li>
                                <li className='m-2'>Enter the date and time for the subjects of the particular semester for your current supplementary exam schedules.</li>
                                <li className='m-2'>If there are no supplementary exams scheduled for the remaining subjects, leave those fields or simply skip them.</li>
                                <li className='m-2'>After completing the selection of date and time for subjects according to your current exam schedule, proceed to the next step.</li>
                                <li className='m-2'>Click on Generate Hall Ticket to see a pop-up displaying your hall ticket.</li>
                                <li className='m-2'>Preview and review the generated hall ticket.</li>
                                <li className='m-2'>If any changes are needed, go back or click the specific area to re-edit and re-generate the hall ticket. Ensure to preview it again. <br />Download the hall ticket, A generated hall tickets are not stored on our server, reducing the risk of data loss.</li>
                                <li className='m-2'>In case of any errors or if changes cannot be undone, simply refresh the page to start the process again.</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className='mb-4 items-center justify-center flex'>
                    <button onClick={handleLinkClick} className=' bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>Generate HallTicket</button>
                    {isModalVisible && <Hallticketview query={{ subjectDetails, Details }} onClose={handleCloseModal} />}
                </div>
                <Info />
                <Hr />
                <HomeFooter />
            </div>
            {/* <PrintButton /> */}
            <ScrollToTop
                className='scroller'
                smooth
                viewBox="-5 0 18 18"
                svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }} />
        </>
    )
}
export default Hallticketgenerate;