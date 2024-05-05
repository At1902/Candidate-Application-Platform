import apiService from "@services/apiService";
import {
  fetchJobsRequest,
  fetchJobsSuccess,
  fetchJobsFailure,
} from "./jobSlice";

export const fetchJobs = (limit, offset) => {
  return async (dispatch) => {
    dispatch(fetchJobsRequest());
    try {
      const response = await apiService.fetchJobs(limit, offset);
      const { jdList, totalCount } = response;
      console.log("JD LIST:", jdList);
      dispatch(fetchJobsSuccess({ jobs: jdList, totalCount }));
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    }
  };
};
