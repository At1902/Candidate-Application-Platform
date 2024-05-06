"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "@redux/actions";
import { CircularProgress, Grid } from "@mui/material";
import style from "@styles/JobList.module.css";
import JobCard from "./JobCard";
import { filterJobs } from "@utils/filterJobs";

// Implement custom Infinite Scroll using Intersection Observer API
const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, filters } = useSelector((state) => state);
  const [filteredJobs, setFilteredJobs] = useState(filterJobs(jobs, filters));
  const loaderRef = useRef(null);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs(10, 0));
  }, []);

  const fetchMoreJobs = () => {
    const nextOffset = jobs.length;
    dispatch(fetchJobs(10, nextOffset));
  };

  // Callback function to fetch more jobs upon reaching the intersection point
  const fetchData = useCallback(async () => {
    if (isLoading) return;

    fetchMoreJobs();
  }, [isLoading]);

  // Observing the intersection point using Intersection Observer API
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);

  useEffect(() => {
    setNoResult(false);
    const response = filterJobs(jobs, filters);
    setFilteredJobs(response);
    if (response.length === 0) setNoResult(true);
    console.log("jobsfilter", filterJobs(jobs, filters));
  }, [filters, jobs]);

  return (
    <div className={style.jobList}>
      <h2 className={style.listingTitle}>Jobs</h2>
      <Grid container spacing={3} rowGap={2}>
        {filteredJobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobCard key={index} job={job} />
          </Grid>
        ))}
      </Grid>
      <div ref={loaderRef}>
        {isLoading && !noResult && <CircularProgress />}
      </div>
      {noResult && (
        <div className={style.noResultText}>
          No jobs available matching the selected filters!
        </div>
      )}
    </div>
  );
};

export default JobList;
