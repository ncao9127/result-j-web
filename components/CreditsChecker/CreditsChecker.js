import React, { useState } from 'react';
import TypingAnimation from '../ui/TypingAnimation';
import Credits from '../CreditsChecker/Credits.json'
import Hr from '../Hr/Hr';
import PrintButton from '../ui/PrintButton';
import Info from '../Home/info'

const CreditsChecker = ({ query }) => {
  const Results = query['Results'];
  const Details = query['Details'];

  const rollNumber = Details['ROLL_NO'];
  const animatedText = `"Access Restricted: This feature is exclusively available to students pursuing a B.Tech degree. We appreciate your understanding. Have a wonderful day!"`;
  if (rollNumber[5] === 'R' || rollNumber[5] === 'D' || rollNumber[5] === 'S' || rollNumber[5] === 'E') {
    return (
      <div
        style={{
          marginTop: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }} className='m-7'
      >
        <p className="capitalize">Hello! <br /><b className='bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>{Details['NAME']} </b><br /><TypingAnimation text={animatedText} /> </p>
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
  let message, SemStatus, rc, sc;
  // let rc; // RequiredCredits
  // let sc; // SecuredCredits
  let R18Regular, R18LE, R22Regular, R22LE = false;

  if (rollNumber.slice(0, 2) < '22' && rollNumber[4] === '1') {
    // R18Regular
    R18Regular = true;
    console.log('R18Regular', R18Regular);
    rc = Credits.find(item => item.Btech === 'R18')?.Regular;
    sc = rc.find(item => item.semester === lastVal)?.secured_credits || '-';
  } else if (rollNumber.slice(0, 2) < '23' && rollNumber[4] === '5') {
    // R18LE
    R18LE = true;
    console.log('R18LE', R18LE);
    rc = Credits.find(item => item.Btech === 'R18')?.LE;
    sc = rc.find(item => item.semester === lastVal)?.secured_credits || '-';
  } else if (rollNumber.slice(0, 2) >= '22' && rollNumber[4] === '1') {
    // R22Regular
    R22Regular = true;
    console.log('R22Regular', R22Regular);
    rc = Credits.find(item => item.Btech === 'R22')?.Regular;
    sc = rc.find(item => item.semester === lastVal)?.secured_credits || '-';
  } else if (rollNumber.slice(0, 2) > '22' && rollNumber[4] === '5') {
    // R22LE
    R22LE = true;
    console.log('R22LE', R22LE);
    rc = Credits.find(item => item.Btech === 'R22')?.LE;
    sc = rc.find(item => item.semester === lastVal)?.secured_credits || '-';
  }
  switch (lastVal) {
    case '1-1':
      message = `You are currently in your 1st Year 2nd Semester and you require ${sc - totalCredits} specific extra credits to meet the eligibility criteria for the 2nd Year`;
      break;
    case '1-2':
      if (totalCredits >= sc) {
        SemStatus = "Eligible"
        message = "Congratulations! You are eligible for 2nd Year";
      } else {
        SemStatus = "Not Eligible"
        message = `You need ${sc - totalCredits} specific extra credits to be eligible for 2nd Year`;
      }
      break;
    case '2-1':
      message = `You are currently in your 2nd Year 2nd Semester and you require ${sc - totalCredits} specific extra credits to meet the eligibility criteria for the 3rd Year`;
      break;
    case '2-2':
      if (totalCredits >= sc) {
        SemStatus = "Eligible"
        message = "Congratulations! You are eligible for 3rd Year";
      } else {
        SemStatus = "Not Eligible"
        message = `You need ${sc - totalCredits} specific extra credits to be eligible for 3rd Year`;
      }
      break;
    case '3-1':
      message = `You are currently in your 3rd Year 2nd Semester and you require ${sc - totalCredits} specific extra credits to meet the eligibility criteria for the 4th Year`;
      break;
    case '3-2':
      if (totalCredits >= sc) {
        SemStatus = "Eligible"
        message = "Congratulations! 🎉 You are eligible for 4th Year";
      } else {
        SemStatus = "Not Eligible"
        message = `You need ${sc - totalCredits} specific extra credits to be eligible for 4th Year`;
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
  console.log('rc:', sc, message, lastVal); // To debug and check if 'rc' is correctly assigned


  return (
    <>
      <br />
      <div class="mx-auto w-max bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="font-bold">B.Tech Credits Checker</p>
      </div>
      <div className="flex flex-col items-center justify-center text-center ">
        <div className="p-6">
          <h1 className="text-xl font-semibold">{Details['NAME']}</h1>
          <h1 className="text-lg text-black dark:text-white sm:text-xl">{Details['ROLL_NO']}</h1>
          <hr className="w-full border-gray-700" />
        </div>
      </div>
      <div className="mb-5 text-center">
        <h1 className="text-blue-500 text-bold text-xl">Overall Credits </h1>
        <h1 className="text-bold text-2xl">{totalCredits} <sub className='text-xs'>{SemStatus}</sub></h1>
      </div>
      <div className='m-6'>
        <table className="min-w-full table-auto text-sm text-center">
          <tbody className="text-gray-600 divide-y border  border-gray-200 dark:bg-gray-800 dark:text-white">
            <tr class="bg-gray-50 text-gray-600 border-b border-gray-300 dark:bg-gray-700 dark:text-white font-bold no-hover">
              <td>SEMESTER</td>
              <td>CREDITS</td>
            </tr>
            {Object.keys(Results).map((val) => {
              if (val !== 'Total') {
                return (
                  <tr key={val}>
                    <td>{val}</td>
                    <td>{Results[val]['credits']}</td>
                  </tr>
                );
              }
            })}
            <tr>
              <td>TOTAL CREDITS</td>
              <td>{totalCredits}</td>
            </tr>
            <tr>
              <td colSpan={10} className='capitalize'>{message}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <PrintButton/> */}
      <Info />
      <br />
      <Hr />

      {R18Regular || R18LE ? (
        <div className="mt-1 block text-center text-[#808080] mb-4 text-[55%] md:text-[80%] text-red-600">
          <b>NOTE:</b> Your Credits Validation Is Done Based Upon JNTUH B.Tech Regulation Given.<br />
          Check Here Is The Reference Of R18 Doc <a href="/R18B.TECHAcademicRegulations2.pdf" className='text-blue-400 hover:text-blue-600'>Click Here To View</a>
        </div>
      ) : (
        <div className="mt-1 block text-center text-[#808080] mb-4 text-[55%] md:text-[80%] text-red-600">
          <b>NOTE:</b> Your Credits Validation Is Done Based Upon JNTUH B.Tech Regulation Given.<br />
          Check Here Is The Reference Of R22 Doc <a href="/R22B.Tech.AcademicRegulations.pdf" className='text-blue-400 hover:text-blue-600'>Click Here To View</a>
        </div>
      )}
    </>
  )
}
export default CreditsChecker