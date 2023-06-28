import axios from 'axios';
import { useEffect, useState } from 'react';
import url from "../components/api/api";
import Loading from "../components/Loading/Loading";
import Head from 'next/head';

const ExamTable = () => {
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await axios.get(url + '/api/examcodes', { mode: 'cors' });
        setExamData(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching exam data:', error);
      }
    };

    fetchData();
    // Fetch current date and time
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='m-3'>
      <Head>
        <title>
          JNTUH | EXAMSCODES
        </title>
        <meta
          name="description"
          content="Check out academic resultS examcodes with in a go."
          key="desc"
        />
      </Head>

      {isLoading ? (
        <Loading /> // Render the loading component
      ) : (
        <>
          <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
            <h1>EXAMSCODES</h1>
            
          </div>
          <div className='current-date-time' style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
            {currentDateTime}
          </div>

          {/* B.Tech R18 Table */}
          <table className='my-4'>
            <caption>B.Tech R18</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.btech.R18).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          {/* B.Tech R22 Table */}
          <table>
            <caption>B.Tech R22</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.btech.R22).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          {/* B.Pharmacy R17 Table */}
          <table className='my-4'>
            <caption>B.Pharmacy R17</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.bpharmacy.R17).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* B.pharmacy R22 Table */} 
           <table> 
             <caption>B.pharmacy R22</caption> 
             <thead> 
               <tr> 
                 <th>Semester</th> 
                 <th>Course Codes</th> 
               </tr> 
             </thead> 
             <tbody> 
               {Object.entries(examData.bpharmacy.R22).map(([semester, codes]) => ( 
                 <tr key={semester}> 
                   <th>{semester}</th> 
                   <th>{codes.join(', ')}</th> 
                 </tr> 
               ))} 
             </tbody> 
           </table>
          {/* M.Pharmacy R19 Table */}
          <table className='my-4'>
            <caption>M.Pharmacy R19</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.mpharmacy.R19).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* M.Pharmacy R22 Table */}
          <table className='my-4'>
            <caption>M.Pharmacy R22</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.mpharmacy.R22).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* M.Tech R19 Table */}
          <table className='my-4'>
            <caption>M.Tech R19</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.mtech.R19).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* M.Tech R22 Table */}
          <table className='my-4'>
            <caption>M.Tech R22</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.mtech.R22).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* MBA R19 Table */}
          <table className='my-4'>
            <caption>MBA R19</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.mba.R19).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          {/* MBA R22 Table */}
          <table className='my-4'>
            <caption>MBA R22</caption>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course Codes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.mba.R22).map(([semester, codes]) => (
                <tr key={semester}>
                  <th>{semester}</th>
                  <th>{codes.join(', ')}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <a
          className='text-blue-400 hover:text-blue-600 text-center'
          href='/api/examcodes'
          target='_blank'
          rel="noreferrer"
        >Click Here To View JSON</a>
        </>
      )}
    </div>
  );
};

export default ExamTable;
