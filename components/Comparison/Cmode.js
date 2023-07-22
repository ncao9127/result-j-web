import React from 'react';
import Branch from '../Json/Branch_codes.json';
import College from '../Json/college_codes.json';
import Info from '../Home/info';
import Hr from '../Hr/Hr';

import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import HomeFooter from '../Home/HomeFooter';

const Cmode = ({ query }) => {
  const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'P'];

  // use this below objects when use main api calls
  // const result1 = query.Result1;
  // const result2 = query.Result2;

  // its just temp
  const result1 = query[0];
  const result2 = query[1];


  // --------------------backlogs---------------------------

  const rf = Object.keys(result1.Results).map((val) => {
    if (val !== 'Total') {
      const subjects = Object.keys(result1.Results[val]).filter(item => result1.Results[val][item]['subject_grade'] === 'F' || result1.Results[val][item]['subject_grade'] === 'Ab' || result1.Results[val][item]['subject_grade'] === '-');
      if (subjects.length > 0) {
        return (
          <>
            {/* <tr class="mx-auto w-max bg-gray-200">
              <th colspan={10}>{val} Results</th>
            </tr> */}
            {Object.keys(result1.Results[val]).map(function (item, index) {
              if (result1.Results[val][item]['subject_grade'] === 'F' || result1.Results[val][item]['subject_grade'] === 'Ab' || result1.Results[val][item]['subject_grade'] === '-') {
                return (
                  <tr key={index}>
                    <th>{val} Sem / {result1.Results[val][item]['subject_name'] === "" ? "-" : result1.Results[val][item]['subject_name']}  /&nbsp;
                      {result1.Results[val][item]['subject_internal'] === "" ? "-" : result1.Results[val][item]['subject_internal']}I /&nbsp;
                      {result1.Results[val][item]['subject_external'] === "" ? "-" : result1.Results[val][item]['subject_external']}E /&nbsp;
                      {result1.Results[val][item]['subject_total'] === "" ? "-" : result1.Results[val][item]['subject_total']}T /&nbsp;
                      {result1.Results[val][item]['subject_grade'] === "-" ? "MALPRACTICE" : result1.Results[val][item]['subject_grade']}
                    </th>
                  </tr>
                );
              }
            })}
          </>
        );
      }
    }
  })
  const rf2 = Object.keys(result2.Results).map((val) => {
    if (val !== 'Total') {
      const subjects = Object.keys(result2.Results[val]).filter(item => result2.Results[val][item]['subject_grade'] === 'F' || result2.Results[val][item]['subject_grade'] === 'Ab' || result2.Results[val][item]['subject_grade'] === '-');
      if (subjects.length > 0) {
        return (
          <>
            {/* <tr class="mx-auto w-max bg-gray-200">
              <th colspan={10}>{val} Results</th>
            </tr> */}
            {Object.keys(result2.Results[val]).map(function (item, index) {
              if (result2.Results[val][item]['subject_grade'] === 'F' || result2.Results[val][item]['subject_grade'] === 'Ab' || result2.Results[val][item]['subject_grade'] === '-') {
                return (
                  <tr key={index}>
                    <th>{val} Sem / {result2.Results[val][item]['subject_name'] === "" ? "-" : result2.Results[val][item]['subject_name']}  /&nbsp;
                      {result2.Results[val][item]['subject_internal'] === "" ? "-" : result2.Results[val][item]['subject_internal']}I /&nbsp;
                      {result2.Results[val][item]['subject_external'] === "" ? "-" : result2.Results[val][item]['subject_external']}E /&nbsp;
                      {result2.Results[val][item]['subject_total'] === "" ? "-" : result2.Results[val][item]['subject_total']}T /&nbsp;
                      {result2.Results[val][item]['subject_grade'] === "-" ? "MALPRACTICE" : result2.Results[val][item]['subject_grade']}
                    </th>
                  </tr>

                );
              }
            })}
          </>
        );
      }
    }
  })
  // ------------------------------------------------------------

  // --------------results statics-------------------------------

  const resultObjects = Object.keys(result1.Results).map((val) => {
    if (val !== 'Total') {
      const result = result1.Results[val];
      return (
        <tr key={val}>
          <th className={result.status === 'FAILED' ? 'text-red-600' : 'text-green-600'}>
            {val} Sem / {result.credits} Credits / {result.SGPA} SGPA / {result.status}
          </th>
        </tr>
      );
    }
    return null;
  });

  const resultObjects2 = Object.keys(result2.Results).map((val) => {
    if (val !== 'Total') {
      const result = result2.Results[val];
      return (
        <tr key={val}>
          <th className={result.status === 'FAILED' ? 'text-red-600' : 'text-green-600'}>
            {val} Sem / {result.credits} Credits / {result.SGPA} SGPA / {result.status}
          </th>
        </tr>
      );
    }
    return null;
  });
  // -------------------------------------------------------------

  const collegeCode = result1.Details.COLLEGE_CODE;
  const branchCode = result1.Details.ROLL_NO.slice(6, 8);

  const collegeCode2 = result2.Details.COLLEGE_CODE;
  const branchCode2 = result2.Details.ROLL_NO.slice(6, 8);

  const branch = Branch.find(item => item.Code === branchCode);
  const b2 = Branch.find(item => item.Code === branchCode2);

  const branchName = branch ? branch.Branch : null;
  const bn2 = b2 ? b2.Branch : null;

  const cn1 = College.find(item => item.Code === collegeCode);
  const cn2 = College.find(item => item.Code === collegeCode2);

  const Cname1 = cn1 ? cn1.College : null;
  const Cname2 = cn2 ? cn2.College : null;

  let tsr1 = 0;
  let psr1 = 0;
  let fsr1 = 0;
  let tcr1 = 0;

  let tsr2 = 0;
  let psr2 = 0;
  let fsr2 = 0;
  let tcr2 = 0;

  Object.keys(result1.Results).forEach((val) => {
    if (val !== 'Total') {
      Object.keys(result1.Results[val]).forEach((item, index) => {
        if (item !== 'SGPA' && item !== 'total' && item !== 'credits') {
          tsr1++;
          tcr1 += parseFloat(result1.Results[val][item]?.subject_credits) || 0;

          if (result1.Results[val][item]['subject_grade'] === 'F' || result1.Results[val][item]['subject_grade'] === 'Ab' || result1.Results[val][item]['subject_grade'] === '-') {
            fsr1++;
          } else {
            psr1++;
          }
        }
      });
    }
  });

  Object.keys(result2.Results).forEach((val) => {
    if (val !== 'Total') {
      Object.keys(result2.Results[val]).forEach((item, index) => {
        if (item !== 'SGPA' && item !== 'total' && item !== 'credits') {
          tsr2++;
          tcr2 += parseFloat(result2.Results[val][item]?.subject_credits) || 0;

          if (result2.Results[val][item]['subject_grade'] === 'F' || result2.Results[val][item]['subject_grade'] === 'Ab' || result2.Results[val][item]['subject_grade'] === '-') {
            fsr2++;
          } else {
            psr2++;
          }
        }
      });
    }
  });

  if (!result1 || !result1.Details || !result1.Results || !result2 || !result2.Details || !result2.Results) {
    return null;
  }

  return (
    <>
      <div key="Results" className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
        <br />
        <table className="w-[100%] my-1">
          <tbody>
            <tr className="bg-gray-200">
              <th>Results Comparison View</th>
            </tr>
          </tbody>
        </table>

        <div className="">
          <div className="">
            <table className="my- w-[100%]">
              <tbody>
                <tr>
                  <th className="bg-gray-200" colSpan={10}>NAME</th>
                </tr>
                <tr>
                  <th>{result1.Details.NAME}</th>
                  <th>{result2.Details.NAME}</th>
                </tr>
                <tr>
                  <th className="bg-gray-200" colSpan={10}>ROLL NO</th>
                </tr>
                <tr>
                  <th>{result1.Details.ROLL_NO}</th>
                  <th>{result2.Details.ROLL_NO}</th>
                </tr>
                <tr>
                  <th className="bg-gray-200" colSpan={10}>FATHER NAME</th>
                </tr>
                <tr>
                  <th>{result1.Details.FATHER_NAME}</th>
                  <th>{result2.Details.FATHER_NAME}</th>
                </tr>
                <tr>
                  {(branchName !== null || bn2 !== null) && <th className="bg-gray-200" colSpan={10}>Branch</th>}
                </tr>
                <tr>
                  {branchName !== null && <th>{branchName}</th>}
                  {bn2 !== null && <th>{bn2}</th>}
                </tr>

                <tr>
                  {(Cname1 !== null || Cname2 !== null) && <th className="bg-gray-200" colSpan={10}>College NAME</th>}
                </tr>
                <tr>
                  {Cname1 !== null && <th className="uppercase">{Cname1}</th>}
                  {Cname2 !== null && <th className="uppercase">{Cname2}</th>}
                </tr>

                <tr>
                  <th className="bg-gray-200" colSpan={10}>Final CGPA</th>
                </tr>
                <tr>
                  <th>{result1.Results.Total}</th>
                  <th>{result2.Results.Total}</th>
                </tr>
                <tr>
                  <th className="bg-gray-200" colSpan={10}>Final Percentage</th>
                </tr>
                <tr>
                  <th>{((result1.Results.Total - 0.5) * 10).toFixed(2)}%</th>
                  <th>{((result2.Results.Total - 0.5) * 10).toFixed(2)}%</th>
                </tr>
                <tr>
                  <th className="bg-gray-200" colSpan={10}>Total Gained Credits</th>
                </tr>
                <tr>
                  <th>{tcr1}</th>
                  <th>{tcr2}</th>
                </tr>
                <tr>
                  <th className="bg-gray-200" colSpan={10}>Total Subjects</th>
                </tr>
                <tr>
                  <th>{tsr1}</th>
                  <th>{tsr2}</th>
                </tr>
                <tr>
                  <th className="bg-gray-200" colSpan={10}>Total Passed Subjects</th>
                </tr>
                <tr>
                  <th>{psr1}</th>
                  <th>{psr2}</th>
                </tr>
                <tr>
                  <th className="bg-gray-200" colSpan={10}>Total Failed Subjects</th>
                </tr>
                <tr>
                  <th>{fsr1}</th>
                  <th>{fsr2}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="">
          <table className="my-1 w-[100%]">
            <tbody>
              <tr>
                <th className="bg-gray-200" colSpan={10}>OverAll Results Score</th>
              </tr>
              <tr>
                <th>
                  <table className="w-full ">
                    <tbody>
                      {resultObjects}
                    </tbody>
                  </table>
                </th>
                <th>
                  <table className="w-full">
                    <tbody>
                      {resultObjects2}
                    </tbody>
                  </table>
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="">
          <table className="my-1 w-[100%]">
            <tbody>
              <tr>
                <th className="bg-gray-200" colSpan={10}>Backlogs</th>
              </tr>
              <tr>
                <th>
                  <table className="w-full ">
                    <tbody>
                      {rf}
                    </tbody>
                  </table>
                </th>
                <th>
                  <table className="w-full ">
                    <tbody>
                      {rf2}
                    </tbody>
                  </table>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <Info />
        <Hr />
        <HomeFooter/>
      </div>

      <PrintButton />
      <ScrollToTop
        className='scroller'
        smooth
        viewBox="-5 0 18 18"
        svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }} />
    </>

  );
};

export default Cmode;
