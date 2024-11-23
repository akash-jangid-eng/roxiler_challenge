import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#d0ed57",
  "#a4de6c",
  "#8dd1e1",
  "#83a6ed",
  "#8dd1ba",
  "#ff8042",
  "#ffbb28",
];

const TransactionPieChart = ({ pieChartData }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Category Distribution
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({ category, percent }) =>
                `${category}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${value} items`,
                `Category: ${name}`,
              ]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionPieChart;
