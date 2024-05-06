"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "@redux/actions";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  TextField,
} from "@mui/material";

const Filters = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const [filters, setFilters] = useState({
    minExperience: "",
    companyNames: [],
    locations: [],
    roles: [],
    minBasePay: "",
  });

  const handleChange = (event, newValue, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
    dispatch(
      updateFilters({
        ...filters,
        [name]: newValue,
      }),
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="min-experience-label">
              Minimum Experience
            </InputLabel>
            <Select
              labelId="min-experience-label"
              name="minExperience"
              value={filters.minExperience}
              onChange={(e) => handleChange(e, e.target.value, "minExperience")}
              label="Minimum Experience"
            >
              <MenuItem value="">All</MenuItem>
              {[...Array(10).keys()].map((exp) => (
                <MenuItem key={exp} value={exp + 1}>
                  {exp + 1} year(s)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            multiple
            id="company-names"
            options={Array.from(new Set(jobs.map((job) => job.companyName)))}
            value={filters.companyNames}
            size="small"
            onChange={(event, newValue) =>
              handleChange(event, newValue, "companyNames")
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Company Names" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            multiple
            id="locations"
            options={Array.from(new Set(jobs.map((job) => job.location)))}
            value={filters.locations}
            size="small"
            onChange={(event, newValue) =>
              handleChange(event, newValue, "locations")
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Locations" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            multiple
            id="roles"
            options={Array.from(new Set(jobs.map((job) => job.jobRole)))}
            value={filters.roles}
            size="small"
            onChange={(event, newValue) =>
              handleChange(event, newValue, "roles")
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Roles" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="min-base-pay-label">Minimum Base Pay</InputLabel>
            <Select
              labelId="min-base-pay-label"
              name="minBasePay"
              value={filters.minBasePay}
              onChange={(e) => handleChange(e, e.target.value, "minBasePay")}
              label="Minimum Base Pay"
            >
              <MenuItem value="">All</MenuItem>
              {[...Array(10).keys()].map((pay) => (
                <MenuItem key={pay} value={20 * pay}>
                  {20 * pay} USD
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
