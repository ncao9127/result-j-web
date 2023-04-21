import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import HomeFooter from '../Home/HomeFooter';
import Hr from '../Hr/Hr';
import Footer from '../Home/Footer';
import Info from '../Home/info';

const SingleResults = ({ query }) => {
  const Results = query['Results'];
  const Details = query['Details'];
  const grades = ['O', 'A+', 'A', 'B+', 'B', 'C'];
  return (
    <>
      <br />
      <br />
      <div className="items-center justify-center text-center ">
        <h1 className="text-xl font-semibold text-green-600 text-bold ">Results History Marks Card</h1>
        <br/>
        <Hr />
      </div>
      <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
        <table className="w-[100%]">
          <tbody>
            <tr class="mx-auto w-max bg-gray-200">
              {Object.keys(Details).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
            <tr>
              {Object.keys(Details).map((key) => (
                <th key={key}>{Details[key]}</th>
              ))}
            </tr>
          </tbody>
        </table>
        <br />
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
            {Object.keys(Results).map((val) => {
              if (val !== 'Total') {
                return (
                  <>
                    <tr class="mx-auto w-max bg-gray-200">
                      <th colSpan={7}>{val} Results</th>
                    </tr>
                    {Object.keys(Results[val]).map(function (item, index) {
                      if (item !== 'SGPA' && item !== 'total' && item !== 'credits' && item !== 'status') {
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
                    <tr>
                      <th colSpan={4}>SGPA</th>
                      <th colSpan={4}>{Results[val]['SGPA']}</th>
                    </tr>
                  </>
                );
              }
            })}
          </tbody>
        </table>
        <div className='Total'>
          <table>
            <tbody >
              <tr>
                <th className="py-2" style={{ width: '75%' }}>Total CGPA</th>
                <th>{Results['Total']}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Info/>
      <Hr/>
      <PrintButton />
      <ScrollToTop
        className='scroller'
        smooth
        viewBox="-5 0 18 18"
        svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }}
      />
      <Footer />
    </>
  )
}
export default SingleResults
