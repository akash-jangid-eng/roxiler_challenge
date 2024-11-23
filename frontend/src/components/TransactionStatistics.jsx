import React from "react";

const TransactionStatistics = ({ statistics }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-purple-100 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">
            Total Sale Amount
          </h3>
          <p className="text-xl text-purple-900 font-bold">
            ₹{(statistics?.totalSaleAmount).toFixed(0)}
          </p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800">Sold Items</h3>
          <p className="text-xl text-yellow-900 font-bold">
            {statistics?.soldItemsCount}
          </p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">
            Not Sold Items
          </h3>
          <p className="text-xl text-green-900 font-bold">
            {statistics?.notSoldItemsCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
