import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const RenderOverAllPassFailPieChart = ({ numStudentsPassed, numStudentsFailed }) => {
  const COLORS = ["#00C49F", "#ffb3b3"];
  const totalStudents = numStudentsPassed.length + numStudentsFailed.length;
  const numStudentsPassedCount = numStudentsPassed.filter(
    (result) => result.Results[Object.keys(result.Results)[0]].status === "PASSED"
  ).length;
  const numStudentsFailedCount = numStudentsFailed.length - numStudentsPassedCount;
  const dataForPieChart = [
    {
      name: "Pass",
      value: numStudentsPassedCount,
    },
    {
      name: "Fail",
      value: numStudentsFailedCount,
    },
  ];

  return (
    <div className="w-full text-center mt-4">
      <h2 className="text-lg font-bold mb-4">Overall Pass/Fail Students PieChart</h2>
      <center>
      <PieChart width={500} height={200}>
        <Pie
          data={dataForPieChart}
          
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {dataForPieChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </center>
    </div>
  );
};

export default RenderOverAllPassFailPieChart;
