// import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';
import Link from "next/link";
import Info from '../Home/info';
import Hr from '../Hr/Hr';
import Image from 'next/image';
import HomeFooter from '../Home/HomeFooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: "5000",
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};
const StudentDataCard = ({ query }) => {
  const Results = query['Results'];
  const Details = query['Details'];
  const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'P'];
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const handleNameClick = () => {
    setIsConfettiActive(prevState => !prevState);
  };

  // Initialize variables for counting subjects
  let totalSubjects = 0;
  let passedSubjects = 0;
  let failedSubjects = 0;
  let totalCredits = 0;

  Object.keys(Results).map((val) => {

    if (val !== 'Total') {
      Object.keys(Results[val]).map(function (item, index) {
        if (item !== 'SGPA' & item !== 'total' & item !== 'credits') {
          totalSubjects++;
          totalCredits += parseFloat(Results[val][item]?.subject_credits) || 0;

          if (Results[val][item]['subject_grade'] === 'F' || Results[val][item]['subject_grade'] === 'Ab' || Results[val][item]['subject_grade'] === '-') {
            failedSubjects++;
          } else {
            passedSubjects++;
          }
        }
      });
    }
  });

  console.log('Total Subjects:', totalSubjects);
  console.log('Failed Subjects:', failedSubjects);
  console.log('Passed Subjects:', passedSubjects);
  console.log('Total Credits:', totalCredits);

  // check its final or not 
  const isFinal = Object.keys(query['Results']).includes("4-2");
  console.log('isFinal', isFinal);

  const rollNumber = Details['ROLL_NO'];

  // Check if F, Ab, or - grades are present
  const hasBacklogs = Object.keys(Results).some(val =>
    val !== 'Total' && Object.keys(Results[val]).some(item =>
      Results[val][item]['subject_grade'] === 'F' ||
      Results[val][item]['subject_grade'] === 'Ab' ||
      Results[val][item]['subject_grade'] === '-'
    )
  );
  console.log('Has Backlogs', hasBacklogs);

  let isFirstClass = false;
  let isSecondClass = false;
  let isPassClass = false;

  if (rollNumber[5] === 'A') {
    // Check if the student is in the first class
    isFirstClass = Results['Total'] >= 6.5 && Results['Total'] < 8.0;
    console.log('isFirstClass', isFirstClass);
    toast.success('Congratulations 🎉', {
      toastId: 'success1',
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      rtl: false,
      theme: "light",
    });

    // Check if the student is in the second class
    isSecondClass = Results['Total'] >= 5.5 && Results['Total'] < 6.5;
    console.log('isSecondClass', isSecondClass);

    // Check if the student is in the pass class
    isPassClass = Results['Total'] >= 5.0 && Results['Total'] < 5.5;
    console.log('isPassClass', isPassClass);
  }
  return (
    <>
      <br />
      <div class="mx-auto w-max bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="font-bold">CGPA Calculator</p></div>
      <div className="flex flex-col items-center justify-center text-center ">
        <div className="p-6">
          <h1 className="text-xl font-semibold" onClick={handleNameClick}>
            {Details['NAME']}
            <div className="relative">
              {isFinal && isFirstClass && !hasBacklogs && (
                <div className="absolute -top-8 -right-7 w-10 h-10">
                  <Image
                    src="/firstclass.png"
                    alt="First Class Stamp"
                    layout="fill"
                    objectFit="contain"
                  />
                  <ToastContainer />
                </div>
              )}
            </div>
          </h1>
          {/* <div className="relative">
              {isFinal && isFirstClass && !hasBacklogs && (
                <div className="absolute -top-1.5 -right-7 w-10 h-10">
                  <Image
                    src="/firstclass.png"
                    alt="First Class Stamp"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              <h1 className="text-xl font-semibold" onClick={handleNameClick}>
                <span className="relative">
                  {Details['NAME']}
                </span>
              </h1>
            </div> */}
          <h1 className="text-lg text-black  sm:text-xl">{Details['ROLL_NO']}</h1>
          <hr className="w-full border-gray-700" />
          <Confetti active={isConfettiActive} config={config} />
        </div>
      </div>
      <div className="mb-5 text-center">
        <h1 className="text-blue-500 text-bold text-xl">FINAL CGPA</h1>
        <h1 className="text-bold text-2xl">
          {/* DECLARED BSASED UPON AWARD CLASS SYSTEM JNTUH */}
          {Results['Total']} ({Results['Total'] >= 8.0 ? 'Outstanding' :
            Results['Total'] >= 7.5 ? 'Execellent' :
              Results['Total'] >= 7.0 ? 'Very Good' :
                Results['Total'] >= 6.5 ? 'Good' :
                  Results['Total'] >= 5.5 ? 'Average' :
                    'Pass'
          })
        </h1>
      </div>
      <div className='m-4 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]'>
        <table >
          <tbody>
            <tr class="bg-gray-200">
              <th>SEMESTER</th>
              <th>CREDITS</th>
              <th>SGPA</th>
              <th>STATUS</th>
            </tr>
            {Object.keys(Results).map((val) => {
              if (val !== 'Total') {
                return (
                  <tr key={val} >
                    <th>{val}</th>
                    <th>{Results[val]['credits']}</th>
                    <th>{Results[val]['SGPA']}</th>
                    <th className={Results[val]['status'] === 'FAILED' ? 'text-red-600' : 'text-green-600'}>{Results[val]['status']}</th>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <div className="relative">
          <table >
            <tbody >
              <tr>
                <th className="py-2" style={{ width: '75%' }}>Cumulative Grade Point Average - CGPA</th>
                <th>{Results['Total']}</th>
              </tr>
              <tr>
                <th className="py-2" style={{ width: '75%' }}>Final Percentage</th>
                <th>{((Results['Total'] - 0.5) * 10).toFixed(2)}%</th></tr>
            </tbody>
          </table>
          {isFinal && isFirstClass && !hasBacklogs && (
            <div className="absolute top-4 right-10 w-10 h-10">
              <Image
                src="/firstclass.png"
                alt="First Class Stamp"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div>
      </div>


      {/* Display the subject counts */}
      {/* <div className='m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]'>
        <table >
          <tbody>
            <tr><th>TOTAL CREDITS </th><th>{totalCredits}</th></tr>
            <tr><th>TOTAL SUBJECTS </th><th>{totalSubjects}</th></tr>
            <tr><th>PASSED SUBJECTS </th><th class="text-green-600"> {passedSubjects}</th></tr>
            <tr><th>FAILED SUBJECTS </th><th class="text-red-600">{failedSubjects}</th></tr>
          </tbody>
        </table>
      </div> */}

      <div className='flex flex-wrap items-center justify-center'>
        <Link href="/CreditsCalculator">
          <a target="_blank" className='border-2 border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-2 mt-6 md:w-36 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-gray-300 duration-300 m-4'>
            <h3 className='group-hover:text-black text-lg sm:text-xl font-bold text-center'>TOTAL CREDITS</h3>
            <p className='group-hover:text-black text-slate-500 mt-2 text-base sm:text-2xl text-center text-black'>{totalCredits}</p>
          </a>
        </Link>

        <a target="_blank" className='border-2 border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-2 mt-6 md:w-36 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-gray-300 duration-300 m-4'>
          <h3 className='group-hover:text-black text-lg sm:text-xl font-bold text-center'>TOTAL SUBJECTS</h3>
          <p className='group-hover:text-black text-slate-500 mt-2 text-base sm:text-2xl text-center text-black'>{totalSubjects}</p>
        </a>


        <a target="_blank" className='border-2 border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-2 mt-6 md:w-36 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-gray-300 duration-300 m-4'>
          <h3 className='group-hover:text-black text-lg sm:text-xl font-bold text-center'>TOTAL PASSED</h3>
          <p className='group-hover:text-green-600 text-slate-500 mt-2 text-base sm:text-2xl text-center '>{passedSubjects}</p>
        </a>


        <Link href="/Backlogs">
          <a target="_blank" className='border-2 border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-2 mt-6 md:w-36 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-gray-300 duration-300 m-4 '>
            <h3 className='group-hover:text-black text-lg sm:text-xl font-bold text-center '>TOTAL FAILED</h3>
            <p className='group-hover:text-red-600 text-slate-500 mt-2 text-base sm:text-2xl text-center '>{failedSubjects}</p>
          </a>
        </Link>

        <Link href="/CreditsCalculator">
          <a target="_blank" className='border-2 border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-2 mt-6 md:w-36 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-gray-300 duration-300 m-4'>
            <h3 className='group-hover:text-black text-lg sm:text-xl font-bold text-center'>CHECK YOUR CREDITS ELIGIBLILTY</h3>
          </a>
        </Link>
      </div>


      <br />

      <div className="m-4 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
        <div id='1'>
          {Object.keys(Results).some(val => val !== 'Total' && Object.keys(Results[val]).some(item => Results[val][item]['subject_grade'] === 'F' || Results[val][item]['subject_grade'] === 'Ab' || Results[val][item]['subject_grade'] === '-')) && (
            <table>
              <thead>
                <tr class="bg-gray-200">
                  <th colspan={10}>BACKLOGS LIST</th>
                </tr>
                <tr >
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
                {Object.keys(Results).map(val => {
                  if (val !== 'Total') {
                    const subjects = Object.keys(Results[val]).filter(item => Results[val][item]['subject_grade'] === 'F' || Results[val][item]['subject_grade'] === 'Ab' || Results[val][item]['subject_grade'] === '-');
                    if (subjects.length > 0) {
                      return (
                        <>
                          <tr class="mx-auto w-max bg-gray-200">
                            <th colspan={10}>{val} Results</th>
                          </tr>
                          {Object.keys(Results[val]).map(function (item, index) {
                            if (Results[val][item]['subject_grade'] === 'F' || Results[val][item]['subject_grade'] === 'Ab' || Results[val][item]['subject_grade'] === '-') {
                              return (
                                <tr key={index}>
                                  <th>{Results[val][item]['subject_code'] === "" ? "-" : Results[val][item]['subject_code']}</th>
                                  <th>{Results[val][item]['subject_name'] === "" ? "-" : Results[val][item]['subject_name']}</th>
                                  <th>{Results[val][item]['subject_internal'] === "" ? "-" : Results[val][item]['subject_internal']}</th>
                                  <th>{Results[val][item]['subject_external'] === "" ? "-" : Results[val][item]['subject_external']}</th>
                                  <th>{Results[val][item]['subject_total'] === "" ? "-" : Results[val][item]['subject_total']}</th>
                                  <th className={` ${!grades.includes(Results[val][item]['subject_grade']) ? 'text-red-600' : 'text-green-600'}`}>
                                    {Results[val][item]['subject_grade'] === "-" ? "MALPRACTICE" : Results[val][item]['subject_grade']}
                                  </th>
                                  <th>{Results[val][item]['subject_credits']}</th>
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
            </table>
          )}
        </div>
        <Info />
        {hasBacklogs && (
          <div className="mt-1 block text-center text-[#808080]  mb-4 text-[55%] md:text-[80%] text-red-600">
            <b>NOTE :-</b> The SGPA/CGPA for students who have backlogs is neither calculated or shown, as per SGPA/CGPA calculation guidelines .<br />
            However, we calculate the SGPA/CGPA for the students who have backlogs for their convenience.<br />
            The SGPA/CGPA is calculated through the following semester. <a href="/CGPAGuidelines.pdf" className='text-blue-400 hover:text-blue-600'>View SGPA/CGPA Guidelines</a>
          </div>
        )}
        <Hr />
        <HomeFooter />
        {/* <div>
          <table className="w-[100%]">
            <tbody>
              <tr>
                {Object.keys(Details).map((value, index) => { return <><th>{Details[value]}</th></> })}
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
      <PrintButton />
      <ScrollToTop
        className='scroller'
        smooth
        viewBox="-5 0 18 18"
        svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }} />
    </>
  )
}
export default StudentDataCard     