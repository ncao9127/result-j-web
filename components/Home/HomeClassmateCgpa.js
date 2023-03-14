import React, { useState } from 'react';
import axios from 'axios';

function HomeClassmateCgpa() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://127.0.0.1:8000/'; // replace with your API URL
    const results = [];
    for (let i = from; i <= to; i++) {
      const response = await axios.get(`${url}/api/single?htno=${i}`, { mode: 'cors' });
      const { data } = response;
      results.push(data);
    }
    setResults(results);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from">From: </label>
        <input type="text" id="from" value={from} onChange={(e) => setFrom(e.target.value)} />
        <label htmlFor="to">To: </label>
        <input type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Hall Ticket Number</th>
            <th>Overall GPA</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.htno}>
              <td>{result.htno}</td>
              <td>{result.gpa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomeClassmateCgpa;
