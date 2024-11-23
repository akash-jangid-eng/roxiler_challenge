import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  totalCount: 0,
  search: "",
  month: 0,
  page: 1,
  loading: false,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload.transactions;
      state.totalCount = action.payload.totalCount;

      state.page = action.payload.page || state.page;
    },
    setSearch(state, action) {
      state.search = action.payload || "";
      state.page = 1;
    },
    setMonth(state, action) {
      state.month = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload || 1;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setTransactions, setSearch, setMonth, setPage, setLoading } =
  transactionSlice.actions;

export default transactionSlice.reducer;
