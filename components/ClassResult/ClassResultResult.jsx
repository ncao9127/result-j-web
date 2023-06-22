import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import Hr from '../Hr/Hr';
import Info from '../Home/info';

import Branch from '../Json/Branch_codes.json';
import College from '../Json/college_codes.json';


const ClassResultResult = ({ query, semester }) => {
    if (!query || query.length === 0) {
        // Handle the case when the query array is empty
        return <div>No results found.</div>;
    }

    const detailed = query[0]['Details'];
    if (!detailed) {
        // Handle the case when the first object in the query array does not have 'Details' property
        return <div>Invalid data format.</div>;
    }

    const collegeCode = detailed['COLLEGE_CODE'];
    const branchCode = detailed['ROLL_NO'].slice(6, 8);
    const branchName = Branch.find(item => item.Code === branchCode);
    const collegeName = College.find(item => item.Code === collegeCode);


    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'P'];

    return (
        <>

            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]" >
                <h1 className=" font-bold text-[180%] text-center uppercase" >
                    {collegeName?.College || ''}
                </h1>
                <h1 className="mb-2 text-center uppercase" style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold' }}>
                    {branchName?.Branch || ''}
                </h1>



                <table className="w-[100%]">
                    <tbody>
                        <tr className="bg-gray-300 md:bg-white">
                            <th>{semester} Results</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            {query.map((value, index) => {
                const Details = value['Details'];
                const Results = value['Results'];

                return (
                    <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]" key={index}>

                        <table className="w-[100%] mt-2 my-1">
                            <tbody>
                                <tr class="bg-gray-200">
                                    <th>ROLL NO</th>
                                    <th>NAME</th>
                                    <th>FATHER NAME</th>
                                </tr>
                                <tr>
                                    {/* {Object.keys(Details).map((value, index) => (
                                        <th key={index}>{Details[value]}</th>
                                    ))} */}
                                    <th>{Details['ROLL_NO']}</th>
                                    <th>{Details['NAME']}</th>
                                    <th>{Details['FATHER_NAME']}</th>
                                </tr>
                            </tbody>
                        </table>
                        {Object.keys(Results).map((val) => {
                            if (val !== 'Total') {
                                return (
                                    <div key={val} id='1'>


                                        <table>
                                            <tbody>
                                                <tr class="mx-auto w-max bg-gray-200">
                                                    <th>SUBJECT CODE</th>
                                                    <th>SUBJECT NAME</th>
                                                    <th>INTERNAL</th>
                                                    <th>EXTERNAL</th>
                                                    <th>TOTAL</th>
                                                    <th>GRADE</th>
                                                    <th>CREDITS</th>
                                                </tr>
                                                {Object.keys(Results[val]).map((item, index) => {
                                                    if (item !== 'SGPA' && item !== 'total' && item !== 'credits' && item !== 'status') {
                                                        return (
                                                            <tr key={index}>
                                                                <th>{Results[val][item]['subject_code']}</th>
                                                                <th>{Results[val][item]['subject_name']}</th>
                                                                <th>{Results[val][item]['subject_internal'] === "" ? "-" : Results[val][item]['subject_internal']}</th>
                                                                <th>{Results[val][item]['subject_external'] === "" ? "-" : Results[val][item]['subject_external']}</th>
                                                                <th>{Results[val][item]['subject_total'] === "" ? "-" : Results[val][item]['subject_total']}</th>
                                                                <th className={` ${// item.grade_earned === 'F' || item.grade_earned === 'Ab'
                                                                    !grades.includes(Results[val][item]['subject_grade'])
                                                                        ? 'text-red-600' : 'text-green-600'}`}>{Results[val][item]['subject_grade'] === "-" ? "MALPRACTICE" : Results[val][item]['subject_grade']}</th>
                                                                <th>{Results[val][item]['subject_credits'] === "" ? "-" : Results[val][item]['subject_credits']}</th>
                                                            </tr>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: '81%' }}>SGPA</th>
                                                    <th>{Results[val]['SGPA']}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                    </div>
                                );
                            }
                            return null;
                        })}

                    </div>
                );
            })}
            <Info />
            <Hr />
            <div>
                <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]">
                    Made with ❤ by &nbsp;

                    <a target="_blank" className="font-bold text-red-400 hover:text-red-600" >
                        MD MOIZ UDDIN
                    </a>
                </p>
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
    );
};

export default ClassResultResult;
