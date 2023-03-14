import React from 'react';
import { PieChart, Pie, Cell, Legend } from  'react-chartjs-2';


function round(value, precision) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}


const RenderOverAllPassFailPieChart = ({ query }) => {
  const examCode = Object.keys(query[0]['Results'])[0];
  const numStudentsPassed = query.filter((result) => result.Results[examCode].status === "PASSED").length;
  const numStudentsFailed = query.length - numStudentsPassed;
  const totalStudents = query.length;
  const passPercentage = ((numStudentsPassed / totalStudents) * 100).toFixed(2);
  const failPercentage = ((numStudentsFailed / totalStudents) * 100).toFixed(2);

  const data = [
    { name: 'Passed', value: passPercentage },
    { name: 'Failed', value: failPercentage }
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  const chartData = {
    labels: ['Fail', 'Pass'],
    datasets: [
      {
        data: [failPercentage, passPercentage],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1.0,
      },
    ],
  }

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        data={chartData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend layout="vertical" verticalAlign="middle" align="right" />
    </PieChart>
  );
};

export default RenderOverAllPassFailPieChart;

