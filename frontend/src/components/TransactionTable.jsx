import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearch, setPage, setMonth } from "../redux/transactionSlice";
import useGetAllTransactions from "../hooks/useGetAllTransactions";

const months = [
  { month: "All", value: 0 },
  { month: "January", value: 1 },
  { month: "February", value: 2 },
  { month: "March", value: 3 },
  { month: "April", value: 4 },
  { month: "May", value: 5 },
  { month: "June", value: 6 },
  { month: "July", value: 7 },
  { month: "August", value: 8 },
  { month: "September", value: 9 },
  { month: "October", value: 10 },
  { month: "November", value: 11 },
  { month: "December", value: 12 },
];

const TransactionTable = () => {
  const dispatch = useDispatch();
  const {
    transactions,
    totalCount,
    page,
    loading,
    month,
    search: searchTerm,
  } = useSelector((state) => state.transaction);
  const [searchInput, setSearchInput] = useState("");
  const fetchTransactions = useGetAllTransactions();

  useEffect(() => {
    setSearchInput(searchTerm || "");
  }, [searchTerm]);

  const handleSearch = (e) => {
    e?.preventDefault();
    dispatch(setSearch(searchInput.trim()));
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setSearch(""));
    dispatch(setMonth(0));
  };

  const handleMonthChange = (e) => {
    dispatch(setMonth(parseInt(e.target.value)));
  };

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="w-full mt-6 px-6 shadow-2xl">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl mb-4 font-bold text-gray-800">
            Transactions
          </h2>
          <div className="flex justify-between items-center">
            <form onSubmit={handleSearch} className="w-2/3 relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search transactions..."
                className="w-2/3 mr-4 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition duration-200"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-[35%] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                >
                  <span className="text-xl">&times;</span>
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  outline-none cursor-pointer transition duration-200"
              >
                Search
              </button>
            </form>
            <div className="flex flex-wrap gap-4">
              <select
                onChange={handleMonthChange}
                value={month}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  outline-none cursor-pointer transition duration-200"
              >
                {months.map((monthItem, index) => (
                  <option value={monthItem.value} key={index}>
                    {monthItem.month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Image
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr
                    key={txn._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                      {txn.id}
                    </td>
                    <td className="px-6 py-4 text-sm  text-gray-600 capitalize max-w-xs truncate">
                      {txn.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize max-w-xs truncate">
                      {txn.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                      {txn.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      ₹{parseInt(txn.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600capitalize">
                      {txn.sold ? "Sold" : "Not Sold"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <img
                        src={txn.image}
                        alt={txn.title}
                        className="h-20 w-20 rounded-lg object-cover border border-gray-300"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => dispatch(setPage(page - 1))}
              disabled={page <= 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{page}</span> of
              <span className="font-medium">{totalPages}</span>
            </span>

            <button
              onClick={() => dispatch(setPage(page + 1))}
              disabled={page >= totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
