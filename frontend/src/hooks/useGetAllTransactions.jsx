import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setTransactions, setLoading } from "../redux/transactionSlice";

const useGetAllTransactions = () => {
  const dispatch = useDispatch();
  const { search, page, month } = useSelector((state) => state.transaction);

  useEffect(() => {
    const fetchTransactions = async () => {
      dispatch(setLoading(true));
      try {
        const searchParam = encodeURIComponent(search.trim());
        const url = `http://localhost:8000/api/transaction/transactions?keyword=${searchParam}&page=${page}&month=${month}`;

        console.log("Fetching URL:", url);

        const response = await axios.get(url);

        if (response.data.success) {
          dispatch(
            setTransactions({
              transactions: response.data.transactions,
              totalCount: response.data.totalCount,
              page: response.data.page,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    const timeoutId = setTimeout(() => {
      fetchTransactions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, page, month]);
};

export default useGetAllTransactions;
