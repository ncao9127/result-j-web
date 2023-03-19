import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const EachSubjectOverAllPassFailBarChart = ({ query }) => {
  const subjects = new Set();

  // Get all subjects across all exams
  query.forEach((result) => {
    Object.keys(result['Results']).forEach((examCode) => {
      Object.keys(result['Results'][examCode]).forEach((subjectCode) => {
        if (subjectCode !== 'SGPA' && subjectCode !== 'total' && subjectCode !== 'credits' && subjectCode !=='status') {
          subjects.add(result['Results'][examCode][subjectCode]['subject_name']);
        }
      });
    });
  });

  // Calculate pass/fail percentage for each subject
  const passFailData = Array.from(subjects).map((subjectName) => {
    let passCount = 0;
    let totalCount = 0;

    query.forEach((result) => {
      Object.keys(result['Results']).forEach((examCode) => {
        Object.keys(result['Results'][examCode]).forEach((subjectCode) => {
          if (subjectCode !== 'SGPA' && subjectCode !== 'total' && subjectCode !== 'credits' && subjectCode !=='status') {
            if (result['Results'][examCode][subjectCode]['subject_name'] === subjectName) {
              totalCount += 1;
              if (result['Results'][examCode][subjectCode]['subject_grade'] !== 'F' && result['Results'][examCode][subjectCode]['subject_grade'] !== 'Ab') {
                passCount += 1;
              }
            }
          }
        });
      });
    });

    const passPercentage = (passCount / totalCount) * 100;
    const failPercentage = 100 - passPercentage;

    return { subjectName, passPercentage, failPercentage };
  });

  // Generate chart data
  const chartData = {
    labels: passFailData.map((data) => data.subjectName),
    datasets: [
      {
        label: 'Pass',
        data: passFailData.map((data) => data.passPercentage),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 1,
      },
      {
        label: 'Fail',
        data: passFailData.map((data) => data.failPercentage),
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderWidth: 1,
      },
    ],
  };

  // Configure chart options
  const chartOptions = {
  
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
      <Bar data={chartData} options={chartOptions} height={200} width={400} />
      <h2 className="text-sm font-bold mb-4 text-center">Pass/Fail Percentage for Each Subject</h2>
    </div>
  );
};

export default EachSubjectOverAllPassFailBarChart;
