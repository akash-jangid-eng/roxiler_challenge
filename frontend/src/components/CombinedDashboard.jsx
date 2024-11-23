import React from "react";
import TransactionStatistics from "./TransactionStatistics";
import TransactionBarChart from "./TransactionBarChart";
import TransactionPieChart from "./TransactionPieChart";
import { useDispatch, useSelector } from "react-redux";
import { setMonth } from "../redux/combinedDataSlice";
import { useCombinedData } from "../hooks/useGetCombinedData";

const months = [
  { value: "0", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const CombinedDashboard = () => {
  const dispatch = useDispatch();
  const { statistics, pieChartData, barChartData, loading, error } =
    useCombinedData();
  const month = useSelector((state) => state.combinedData.month);

  const handleMonthChange = (event) => {
    dispatch(setMonth(event.target.value));
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full mx-auto space-y-6 p-6">
      <div className="flex justify-end">
        <select
          value={month}
          onChange={handleMonthChange}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  outline-none cursor-pointer transition duration-200"
        >
          {months.map((monthItem) => (
            <option key={monthItem.value} value={monthItem.value}>
              {monthItem.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="text-gray-600">Loading...</div>
        </div>
      ) : (
        <>
          <TransactionStatistics statistics={statistics} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TransactionBarChart barChartData={barChartData} />
            <TransactionPieChart pieChartData={pieChartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default CombinedDashboard;
