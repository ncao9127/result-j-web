// import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';

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

          if (Results[val][item]['subject_grade'] === 'F') {
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

  return (
    <>
      <br />
      <div class="mx-auto w-max bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="font-bold">B.Tech Student Score Board</p></div>
      <div className="flex flex-col items-center justify-center text-center dark:text-white">
        <div className="p-6">
          <h1 className="text-xl font-semibold" onClick={handleNameClick}>{Details['NAME']}</h1>
          <h1 className="text-lg text-black dark:text-white sm:text-xl">{Details['ROLL_NO']}</h1>
          <hr className="w-full border-gray-700" />
          <Confetti active={isConfettiActive} config={config} />
        </div>
      </div>
      <div className="mb-5 text-center">
        <h1 className="text-blue-500 text-bold text-xl">Overall GPA</h1>
        <h1 className="text-bold text-2xl">
          {Results['Total']} ({Results['Total'] >= 9.5 ? 'Outstanding' :
            Results['Total'] >= 8.5 ? 'Excellent' :
              Results['Total'] >= 7.5 ? 'Very Good' :
                Results['Total'] >= 6.5 ? 'Good' :
                  Results['Total'] >= 5.5 ? 'Average' :
                    'Pass'
          })
        </h1>
      </div>
      <table >
        <tbody>
          <tr class="mx-auto w-max bg-blue-100">
            <th>SEMESTER</th>
            <th>CREDITS</th>
            <th>SGPA</th>
            <th>STATUS</th>
          </tr>
          {Object.keys(Results).map((val) => {
            if (val !== 'Total') {
              return (
                <tr key={val} >
                  <th>{val} Results</th>
                  <th>{Results[val]['credits']}</th>
                  <th>{Results[val]['SGPA']}</th>
                  <th className={Results[val]['status'] === 'PASSED' ? 'pass' : 'fail'}>{Results[val]['status']}</th>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <table >
        <tbody >
          <tr>
            <th className="py-2" style={{ width: '75%' }}>Overall CGPA</th>
            <th>{Results['Total']}</th>
          </tr>
        </tbody>
      </table>
      <br />
      {/* Display the subject counts */}
      <div>
        <table >
          <tbody>
            <tr><th>TOTAL CREDITS : {totalCredits}</th></tr>
            <tr><th>TOTAL SUBJECTS : {totalSubjects}</th></tr>
            <tr><th>PASSED SUBJECTS : {passedSubjects}</th></tr>
            <tr><th>FAILED SUBJECTS : {failedSubjects}</th></tr>
          </tbody>
        </table>
      </div>
      <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
      <div id='1'>
  {Object.keys(Results).some(val => val !== 'Total' && Object.keys(Results[val]).some(item => Results[val][item]['subject_grade'] === 'F')) && (
    <tr> 
                     <th colspan={10}>Backlog List</th> 
                   </tr>
    <table>
      <thead>
        <tr>
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
            const subjects = Object.keys(Results[val]).filter(item => Results[val][item]['subject_grade'] === 'F');
            if (subjects.length > 0) {
              return (
                <>
                  <tr>
                    <th colspan={10}>{val} Results</th>
                  </tr>
                  {Object.keys(Results[val]).map(function (item, index) {
                    if (Results[val][item]['subject_grade'] === 'F') {
                      return (
                        <tr key={index}>
                          <th colspan={1}>{Results[val][item]['subject_name']}</th>
                          <th>{Results[val][item]['subject_code']}</th>
                          <th>{Results[val][item]['subject_internal']}</th>
                          <th>{Results[val][item]['subject_external']}</th>
                          <th>{Results[val][item]['subject_total']}</th>
                          <th>{Results[val][item]['subject_grade']}</th>
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
  <br />
</div>

        <div class="powered-by-container">
          <a href="http://netflix.com">Powered by Moiz
            <div role="img" aria-label="Powered by Netflix" class="powered-by centered"></div>
          </a>
        </div>
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