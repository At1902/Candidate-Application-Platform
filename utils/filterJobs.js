export const filterJobs = (jobs, filters) => {
  if (jobs.length === 0) {
    return [];
  }

  return jobs.filter((job) => {
    const {
      minExperience,
      companyNames = [],
      locations = [],
      roles = [],
      minBasePay,
    } = filters;

    const matchesExperience =
      minExperience === "" || job.minExp >= parseInt(minExperience);
    const matchesCompanyName =
      companyNames.length === 0 || companyNames.includes(job.companyName);
    const matchesLocation =
      locations.length === 0 || locations.includes(job.location);
    const matchesRole = roles.length === 0 || roles.includes(job.jobRole);
    const matchesMinBasePay =
      minBasePay === "" ||
      (job.minJdSalary && job.minJdSalary >= parseInt(minBasePay));

    return (
      matchesExperience &&
      matchesCompanyName &&
      matchesLocation &&
      matchesRole &&
      matchesMinBasePay
    );
  });
};
