// import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import React, { useState } from 'react';
import Link from "next/link";
import Info from '../Home/info';
import Hr from '../Hr/Hr';
import Jntuh from '../Home/jnuth';
import HomeFooter from '../Home/HomeFooter';

const Backlogslist = ({ query }) => {
    const Results = query['Results'];
    const Details = query['Details'];
    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C'];

    Object.keys(Results).map((val) => {

    });
    return (
        <>
            <div className='m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]'>
                <br />
                {/* <Jntuh /> */}
                <table className="my-1" key="Details">
                    <tbody>
                        <tr class="bg-gray-200">
                            <th>NAME</th>
                            <th>ROLL NO</th>
                            <th>COLLEGE CODE</th>
                            <th>FATHER NAME</th>
                        </tr>
                        <tr>
                            <th>{Details['NAME']}</th><th>{Details['ROLL_NO']}</th><th>{Details['COLLEGE_CODE']}</th><th>{Details['FATHER_NAME']}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
          

            <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
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
    )
}
export default Backlogslist;