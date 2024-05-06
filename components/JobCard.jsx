"use client";
import { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import style from "@styles/JobCard.module.css";
import Image from "next/image";

const JobCard = ({ job }) => {
  const {
    companyName,
    location,
    jobRole,
    jobDetailsFromCompany,
    minExp,
    maxExp,
    jdLink,
    minJdSalary,
    maxJdSalary,
    logoUrl,
    jdUid,
    salaryCurrencyCode,
  } = job;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Handling NULL Values:
  // Incase of logoUrl is NULL: Using background-color as a fallback
  // Incase of min value is NULL: value = 0;
  // Incase of max value is NULL: not displaying the value;
  // Any other value is NULL or both min and max are NULL: not displaying the entire field;

  return (
    <div id={jdUid}>
      <Card
        sx={{ maxWidth: "360px", minHeight: "390px", display: "flex" }}
        className={style.jobCard}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box gap="0.75rem" display="flex" className={style.infoBox}>
            {/* Optimization: Lazy Loading */}
            <Image
              src={logoUrl}
              alt="Company Logo"
              loading="lazy"
              width={50}
              height={48}
            />
            <div className={style.infoContainer}>
              <div className={style.infoMainDiv}>
                <h3>{companyName}</h3>
                <h2>{jobRole}</h2>
              </div>
              <p>{location}</p>
            </div>
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ margin: "8px 0", color: "rgb(77, 89, 106)" }}
          >
            Expected Salary: {minJdSalary || 0}{" "}
            {maxJdSalary && `- ${maxJdSalary}`} {salaryCurrencyCode || ""}
          </Typography>
          {jobDetailsFromCompany && (
            <Box>
              <Typography
                variant="h1"
                component="h2"
                sx={{ fontSize: "16px", lineHeight: "1.5", fontWeight: "500" }}
              >
                Job Description:
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ fontSize: "14px", margin: "4px 0" }}
              >
                {jobDetailsFromCompany && jobDetailsFromCompany.length > 250 ? (
                  <>
                    {showFullDescription ? (
                      <>
                        {jobDetailsFromCompany}
                        <Button
                          onClick={toggleDescription}
                          color="primary"
                          sx={{
                            fontSize: "14px",
                            textTransform: "capitalize",
                            padding: "0",
                          }}
                        >
                          Show Less
                        </Button>
                      </>
                    ) : (
                      <>
                        {jobDetailsFromCompany.slice(0, 250)}...
                        <Button
                          onClick={toggleDescription}
                          color="primary"
                          sx={{
                            fontSize: "14px",
                            textTransform: "capitalize",
                            padding: "0",
                          }}
                        >
                          Show More
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  jobDetailsFromCompany
                )}
              </Typography>
            </Box>
          )}
          {(minExp || maxExp) && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: "16px", margin: "8px 0" }}
            >
              Experience: {minExp || 0} {maxExp && `- ${maxExp}`} year(s)
            </Typography>
          )}

          <a
            className={style.applyLink}
            href={jdLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className={style.applyBtn}
              sx={{
                textTransform: "capitalize",
                fontSize: "16px",
                lineHeight: "1.75",
                backgroundColor: "rgb(85, 239, 196)",
                color: "rgb(0, 0, 0)",
                padding: "8px 18px",
                "&:hover": {
                  backgroundColor: "rgb(37, 233, 178)",
                },
              }}
            >
              Apply Now
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCard;
