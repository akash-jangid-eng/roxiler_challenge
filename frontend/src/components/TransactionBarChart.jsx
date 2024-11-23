import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TransactionBarChart = ({ barChartData }) => {
  console.log("barChartData", barChartData);
  return (
    <div className="bg-white rounded-lg shadow-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Price Range Distribution
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barChartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="range"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fill: "#4B5563" }}
            />
            <YAxis tick={{ fill: "#4B5563" }} />
            <Tooltip
              formatter={(value) => [`${value} items`, "Count"]}
              labelFormatter={(label) => `Price Range: ${label}`}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
              }}
            />
            <Legend />
            <Bar
              dataKey="count"
              fill="#7e22ce"
              name="Number of Items"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionBarChart;
