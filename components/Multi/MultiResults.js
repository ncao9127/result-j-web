import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import EachSubjectOverAllPassFailBarChart from '../ui/EachSubjectPassFailBar';
import RenderOverAllPassFailPieChart from '../ui/OverAllPassFailPieChart';
import Hr from '../Hr/Hr';
import Info from '../Home/info';

const MultiResults = ({ query }) => {

    const exam_co = Object.keys(query[0]['Results'])[0]
    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C'];
    return (
        <div key="Results" className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
            {/* <div className='flex flex-col items-center'>
                <div className='w-full sm:w-2/4'>
                    <RenderOverAllPassFailPieChart
                        numStudentsPassed={query}
                        numStudentsFailed={query} />
                </div>
                <div className='w-full lg:w-2/4' >
                    <EachSubjectOverAllPassFailBarChart
                        query={query} />
                </div>
            </div> */}
            <br />
            <table className="w-[100%] my-1  " key="Heading">
                <tbody key="heading_tbody">
                    <tr className="bg-gray-200">
                        <th>{Object.keys(query[0]['Results'])[0]} Results</th>
                    </tr>
                </tbody>
            </table>

            {query.map((Result) => {
                if (!Result || !Result['DETAILS']) return null;
                return (
                    <div key={Result['DETAILS']['NAME']}>
                        <table className="my-1 w-[100%]" key="Details">
                            <tbody>
                                    <tr class="bg-gray-200">
                                        <th>NAME</th>
                                        <th>ROLL NO</th>
                                        <th>COLLEGE CODE</th>
                                        <th>FATHER NAME</th>
                                    </tr>
                                <tr>
                                    {
                                        Object.keys(Result['DETAILS']).map((value, index) => { return <><th>{Result['DETAILS'][value]}</th></> })
                                    }
                                </tr>
                            </tbody>
                        </table>

                        <table key="Result">
                            <tbody key="Result_tbody">
                                <tr class="mx-auto w-max bg-gray-200">
                                    <th>SUBJECT CODE</th>
                                    <th>SUBJECT NAME</th>
                                    <th>INTERNAL</th>
                                    <th>EXTERNAL</th>
                                    <th>TOTAL</th>
                                    <th>GRADE</th>
                                    <th>CREDITS</th>
                                </tr>
                                {
                                    Object.keys(Result['Results']).map(function (exam_code) {
                                        return (
                                            Object.keys(Result['Results'][exam_code]).map(function (subject_code) {
                                                if (subject_code !== 'SGPA' && subject_code !== 'total' && subject_code !== 'credits' && subject_code !== 'status') {
                                                    return <><tr>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_code']}</th>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_name']}</th>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_internal'] === "" ? "-" : Result['Results'][exam_code][subject_code]['subject_internal']}</th>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_external'] === "" ? "-" : Result['Results'][exam_code][subject_code]['subject_external']}</th>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_total'] === "" ? "-" : Result['Results'][exam_code][subject_code]['subject_total']}</th>
                                                        <th className={` ${// item.grade_earned === 'F' || item.grade_earned === 'Ab'
                                                            !grades.includes(Result['Results'][exam_code][subject_code]['subject_grade'])
                                                                ? 'text-red-600' : 'text-green-600'}`}
                                                        >{Result['Results'][exam_code][subject_code]['subject_grade'] === "-" ? "MALPRACTICE" : Result['Results'][exam_code][subject_code]['subject_grade']}</th>
                                                        <th>{Result['Results'][exam_code][subject_code]['subject_credits']}</th>
                                                    </tr>
                                                    </>
                                                }
                                            })
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <table key="CGPA">
                            <tbody key="CGPA_tbody">
                                <tr>
                                    <th style={{ width: '75%' }}>SGPA</th>
                                    <th>{Result['Results'][exam_co]['SGPA']}</th>
                                </tr>

                            </tbody>
                        </table>
                        <br />
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
        </div>)
}
export default MultiResults;