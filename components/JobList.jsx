"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchJobs } from "@redux/actions";
import { CircularProgress, Grid } from "@mui/material";
import style from "@styles/JobList.module.css";
import JobCard from "./JobCard";
import { filterJobs } from "@utils/filterJobs";

// Later I will implement custom(in-house) infinite scroll using Intersection Observer API

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount, isLoading, filters } = useSelector(
    (state) => state,
  );
  const [filteredJobs, setFilteredJobs] = useState(filterJobs(jobs, filters));

  useEffect(() => {
    dispatch(fetchJobs(10, 0));
  }, [dispatch]);

  const fetchMoreJobs = () => {
    const nextOffset = jobs.length;
    dispatch(fetchJobs(10, nextOffset));
  };

  useEffect(() => {
    const response = filterJobs(jobs, filters);
    setFilteredJobs(response);
    console.log("jobsfilter", filterJobs(jobs, filters));
  }, [filters, jobs]);

  return (
    <div>
      <h2>Job Listings</h2>
      {isLoading ? (
        <CircularProgress />
      ) : (
        filteredJobs.length === 0 &&
        !isLoading && (
          <div className={style.noResultText}>
            No jobs available matching the selected filters!
          </div>
        )
      )}
      <InfiniteScroll
        dataLength={filteredJobs.length}
        next={fetchMoreJobs}
        hasMore={filteredJobs.length < totalCount}
      >
        <Grid container spacing={4}>
          {filteredJobs.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <JobCard key={index} job={job} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default JobList;
