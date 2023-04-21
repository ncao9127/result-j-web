import React, { useState } from 'react';
import Hr from '../Hr/Hr';
import PrintButton from '../ui/PrintButton';
import Info from '../Home/info';

const R18Regular = ({ query }) => {
  const Results = query['Results'];
  const Details = query['Details'];
  // Initialize variables for counting subjects
  let totalCredits = 0;
  Object.keys(Results).map((val) => {
    if (val !== 'Total') {
      Object.keys(Results[val]).map(function (item, index) {
        if (item !== 'SGPA' & item !== 'total' & item !== 'credits') {
          totalCredits += parseFloat(Results[val][item]?.subject_credits) || 0;
        }
      });
    }
  });
  console.log('Total Credits:', totalCredits);
  const semesterOrder = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];
  const lastVal = semesterOrder[semesterOrder.indexOf(Object.keys(Results)[Object.keys(Results).length - 2])];
  let message;
  let SemStatus;

  switch (lastVal) {
    case '1-1':
      message = "You are in your Regular 1st Year 1st Semester";
      break;
    case '1-2':
      if (totalCredits >= 18) {
        SemStatus = "Eligible"
        message = "Congratulations! You are eligible for 2nd Year 1st Semester";
      } else {
        SemStatus = "Not Eligible"
        message = `You need ${18 - totalCredits} specific extra credits to be eligible for 2nd Year 1st Semester`;
      }
      break;
    case '2-1':
      message = "You are in your 2nd Year 2nd Semester";
      break;
    case '2-2':
      if (totalCredits >= 47) {
        SemStatus = "Eligible"
        message = "Congratulations! You are eligible for 3rd Year 1st Semester";
      } else {
        SemStatus = "Not Eligible"
        message = `You need ${47 - totalCredits} specific extra credits to be eligible for 3rd Year 1st Semester`;
      }
      break;
    case '3-1':
      message = "You are in your 3rd Year 2nd Semester";
      break;
    case '3-2':
      if (totalCredits >= 73) {
        SemStatus = "Eligible"
        message = "Congratulations! 🎉 You are eligible for 4th Year 1st Semester";
      } else {
        SemStatus = "Not Eligible"
        message = `You need ${73 - totalCredits} specific extra credits to be eligible for 4th Year 1st Semester`;
      }
      break;
    case '4-1':
      message = "You are in your 4th Year 2nd Semester";
      break;
    case '4-2':
      message = "Congratulations! 🎉 You have completed your B.Tech course";
      break;
    default:
      message = "Please provide valid inputs";
      break;
  }

  return (
    <>
      <br />
      <div class="mx-auto w-max bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="font-bold">B.Tech Credits Checker</p>
      </div>
      <div className="flex flex-col items-center justify-center text-center ">
        <div className="p-6">
          <h1 className="text-xl font-semibold">{Details['NAME']}</h1>
          <h1 className="text-lg text-black sm:text-xl">{Details['ROLL_NO']}</h1>
          <hr className="w-full border-gray-700" />
        </div>
      </div>
      <div className="mb-5 text-center">
        <h1 className="text-blue-500 text-bold text-xl">Overall Credits</h1>
        <h1 className="text-bold text-2xl">{totalCredits} {SemStatus}</h1>
      </div>
      <table>
        <tbody>
          <tr class="mx-auto w-max bg-gray-200">
            <th>SEMESTER</th>
            <th>CREDITS</th>
          </tr>
          {Object.keys(Results).map((val) => {
            if (val !== 'Total') {
              return (
                <tr key={val}>
                  <th>{val}</th>
                  <th>{Results[val]['credits']}</th>
                </tr>
              );
            }
          })}
          <tr>
            <th>TOTAL CREDITS</th>
            <th>{totalCredits}</th>
          </tr>
          <tr>
            <th colSpan={10}>{message}</th>
          </tr>
        </tbody>
      </table>
      {/* <PrintButton/> */}
      <Info/>
      <br />
      <Hr />
      <div className="mt-1 block text-center text-[#808080]  mb-4 text-[55%] md:text-[80%]">
        <b>NOTE:</b> Your Credits Validation Is Done Based Upon JNTUH Regulation Given.<br />
        Check Here Is The Reference Of R18 Doc <a href="/R18B.TECHAcademicRegulations2.pdf" className='text-blue-400 hover:text-blue-600'>Click Here To View</a>
      </div>
    </>
  )
}

export default R18Regular