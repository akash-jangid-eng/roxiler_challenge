import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setTransactions, setLoading } from "../redux/transactionSlice";

const useGetAllTransactions = () => {
  const dispatch = useDispatch();
  const { search, page, month } = useSelector((state) => state.transaction);
  console.log("params value", { search, page, month });

  useEffect(() => {
    const fetchTransactions = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `http://localhost:8000/api/transaction/transactions?keyword=${search}&page=${page}&month=${month}`
        );

        if (response.data.success) {
          dispatch(
            setTransactions({
              transactions: response.data.transactions,
              totalCount: response.data.totalCount,
              page: page,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTransactions();
  }, [dispatch, search, page, month]);
};

export default useGetAllTransactions;
