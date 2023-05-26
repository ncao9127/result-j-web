import axios from 'axios';
import { useEffect, useState } from 'react';
import url from "../components/api/api"


const ExamTable = () => {
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url+'/api/ExamCodes');
        setExamData(response.data);
      } catch (error) {
        console.error('Error fetching exam data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <br/>
      <br/>
      <table>
        <thead>
          <tr>
            <th>Exam</th>
            <th>Codes</th>
          </tr>
        </thead>
        <tbody>
          {examData &&
            Object.entries(examData).map(([exam, codes]) => (
              <tr key={exam}>
                <th>{exam}</th>
                <th>{codes.join(', ')}</th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;
