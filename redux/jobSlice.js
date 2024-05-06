import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  totalCount: 0,
  isLoading: false,
  error: null,
  filters: {
    minExperience: "",
    companyName: "",
    location: "",
    role: "",
    minBasePay: "",
  },
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    fetchJobsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.jobs = [...state.jobs, ...action.payload.jobs];
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
      state.error = null;
    },
    fetchJobsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action) => {
      console.log("filter", action.payload);
      state.filters = action.payload;
    },
  },
});

export const {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
  updateFilters,
} = jobSlice.actions;
export default jobSlice.reducer;
