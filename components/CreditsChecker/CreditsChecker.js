import React, { useState } from 'react';

const CreditsChecker = ({ query }) => {
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
  return (
    <>
      <br />
      <div class="mx-auto w-max bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="font-bold">B.Tech Credits Checker</p></div>
      <div className="flex flex-col items-center justify-center text-center ">
        <div className="p-6">
          <h1 className="text-xl font-semibold" >{Details['NAME']}</h1>
          <h1 className="text-lg text-black  sm:text-xl">{Details['ROLL_NO']}</h1>
          <hr className="w-full border-gray-700" />
        </div>
      </div>
      <div className="mb-5 text-center">
        <h1 className="text-blue-500 text-bold text-xl">Overall GPA</h1>
        <h1 className="text-bold text-2xl">
        {totalCredits}
        </h1>
      </div>
      <table >
        <tbody>
          <tr class="mx-auto w-max bg-blue-100">
            <th>SEMESTER</th>
            <th>CREDITS</th>
          </tr>
          {Object.keys(Results).map((val) => {
            if (val !== 'Total') {
              return (
                <tr key={val} >
                  <th>{val}</th>
                  <th>{Results[val]['credits']}</th>
                </tr>
              );
            }
          })}
          <tr><th >TOTAL CREDITS </th><th>{totalCredits}</th></tr>
        </tbody>
      </table>
    </>
  )
}
export default CreditsChecker