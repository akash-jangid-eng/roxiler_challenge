import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCombinedData,
  setLoading,
  setError,
} from "../redux/combinedDataSlice";

export const useCombinedData = () => {
  const dispatch = useDispatch();
  const { month, statistics, pieChartData, barChartData, loading, error } =
    useSelector((state) => state.combinedData);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const response = await axios.get(
          `http://localhost:8000/api/transaction/combined-data`,
          {
            params: { month: parseInt(month) },
          }
        );

        if (response.data.success) {
          dispatch(
            setCombinedData({
              statistics: response.data.data.statistics,
              pieChartData: response.data.data.pieChartData,
              barChartData: response.data.data.barChartData,
            })
          );
        } else {
          dispatch(
            setError(response.data.message || "Failed to fetch combined data")
          );
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Network error. Please check your connection.";
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [month, dispatch]);

  return { statistics, pieChartData, barChartData, loading, error };
};
