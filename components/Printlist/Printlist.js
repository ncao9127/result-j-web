import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import HomePrintlist from '../Home/HomePrintlist';


const Printlist = ({ query }) => {
    const exam_co=Object.keys(query[0]['Results'])[0]
    return (            
        <div key="Results" className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
            {query.map((Result) =>
                <div key={Result['DETAILS']['NAME']}>
                    <table className="w-[100%]" key="Heading">
                        <tbody key="heading_tbody">
                            <tr>
                            <th>{Object.keys(Result['Results'])[0]}Results</th>
                            </tr>
                        </tbody>
                    </table>
                        
                </div>) 
            } 
                <table className="w-[100%]" key="Details">
                    <tbody key="Details_tbody">
                        <tr>
                            <th>NAME</th>
                            <th>ROLL NO</th>
                            <th>COLLEGE CODE</th>
                            <th>FATHER NAME</th>
                            <th>CREDITS</th>
                            <th>SGPA</th>
                            <th>STATUS</th>
                            </tr>
                            {query.map((Result) =>
                            <div key={Result['DETAILS']['NAME']}>            
                            {
                                Object.keys(Result['DETAILS']).map((value, index) => { return <><th>{Result['DETAILS'][value]}</th></>})
                            }
                            
                        <th>{Result['Results'][exam_co]['credits']}</th>
                        <th>{Result['Results'][exam_co]['CGPA']}</th>
                        <th>{Result['Results'][exam_co]['status']}</th>
                            </div>)        
                        }
                    </tbody>
                    </table>
              <PrintButton />
      <ScrollToTop
        className='scroller'
        smooth
        viewBox="-5 0 18 18"
        svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        style={{bottom:"30px", opacity:0.75, backgroundColor:'grey'}}
      />
        </div>)

}
export default Printlist;