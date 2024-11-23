import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statistics: {},
  pieChartData: [],
  barChartData: [],
  month: 0,
  loading: false,
  error: null,
};

const combinedDataSlice = createSlice({
  name: "combinedData",
  initialState,
  reducers: {
    setCombinedData: (state, action) => {
      const { statistics, pieChartData, barChartData } = action.payload;
      state.statistics = statistics;
      state.pieChartData = pieChartData;
      state.barChartData = barChartData;
    },
    setMonth: (state, action) => {
      console.log("Updating month to:", action.payload);
      state.month = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCombinedData, setMonth, setLoading, setError } =
  combinedDataSlice.actions;

export default combinedDataSlice.reducer;
