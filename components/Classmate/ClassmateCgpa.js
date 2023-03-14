import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";

const ClassmateCgpa = ({ query }) => {
  const Results = query['Results'];
  const Details = query['Details'];

  return (
    <>

      <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
        {Object.keys(Results).map((val) => {
          if (val != 'Total') {
            return <>
              <div id='1'>
               
                <table className="w-[100%]">
                  <tbody>
                    <tr>
                      {Object.keys(Details).map((value, index) => { return <><th>{value}</th><th>{Details[value]}</th></> })}
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <th style={{ width: '75%' }}>CGPA</th>
                      <th>{Results[val]['CGPA']}</th>
                    </tr>
                  </tbody>
                </table>
                <br />
              </div>
            </>
          }
        })}
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
      <PrintButton />
      <ScrollToTop
        className='scroller'
        smooth
        viewBox="-5 0 18 18"
        svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }}
      />

    </>
  )
}
export default ClassmateCgpa