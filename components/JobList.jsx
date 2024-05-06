"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchJobs } from "@redux/actions";
import { CircularProgress, Grid } from "@mui/material";
import style from "@styles/JobList.module.css";
import JobCard from "./JobCard";

// Later I will implement custom(in-house) infinite scroll using Intersection Observer API

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount, isLoading, filters } = useSelector(
    (state) => state,
  );

  useEffect(() => {
    dispatch(fetchJobs(10, 0));
  }, [dispatch]);

  const fetchMoreJobs = () => {
    const nextOffset = jobs.length;
    dispatch(fetchJobs(10, nextOffset));
  };

  return (
    <div className={style.jobList}>
      <h2>Job Listings</h2>
      {isLoading && (
        <div>
          <CircularProgress />
        </div>
      )}
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchMoreJobs}
        hasMore={jobs.length < totalCount}
      >
        <Grid container spacing={4} rowGap={3}>
          {jobs.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <JobCard key={index} job={job} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
      {jobs.length === 0 && !isLoading && (
        <div className={style.noResultText}>
          No jobs available matching the selected filters!
        </div>
      )}
    </div>
  );
};

export default JobList;
