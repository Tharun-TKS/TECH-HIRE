const { jobs } = require("../models");

/////////post jobs /////////////
const createjobs = async (req, res) => {
  try {
    const organizationId = req.headers.organizationid;
    if (!organizationId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingOrganizationId",
        message: "Organization ID is required in headers.",
        data: null,
      });
    }

    const {
      jobpostingsubject,
      jobsalaryoffered,
      jobstatus,
      jobteachinglevel,
      jobexperience,
      jobdescription,
      joblastdate,
      jobtype,
    } = req.body;

    const newJob = await jobs.create({
      organizationid: organizationId,
      jobpostingsubject,
      jobsalaryoffered,
      jobstatus,
      jobteachinglevel,
      jobexperience,
      jobdescription,
      joblastdate,
      jobtype,
    });

    res.status(201).json({
      isError: false,
      resCode: "jobCreated",
      message: "Job created successfully.",
      data: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

//////get all jobs//////
const getAllJobs = async (req, res) => {
  try {
    const job = await jobs.findAll(); // Replace Job with your Mongoose model name

    res.status(200).json({
      isError: false,
      resCode: "jobsFetched",
      message: "Jobs fetched successfully.",
      data: job,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};


// GET endpoint to retrieve organizations by employer ID
const getJobsByOrganizationId = async (req, res) => {
  try {
    const organizationId = req.headers.organizationid;
    if (!organizationId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingOrganizationId",
        message: "Organization ID is required in headers.",
        data: null,
      });
    }

    const job = await jobs.findAll({
      where: {
        organizationid: organizationId,
      },
    });

    if (job.length === 0) {
      return res.status(404).json({
        isError: true,
        resCode: "jobsNotFound",
        message: "No jobs found for the provided organization ID.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "jobsFound",
      message: "Jobs found successfully.",
      data: job,
    });
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

////////////// organization get by ID API ////////

const getJobById = async (req, res) => {
  try {
    const jobId = req.headers.id;

    const job = await jobs.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        isError: true,
        resCode: "jobNotFound",
        message: "Job not found.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "jobFound",
      message: "Job found successfully.",
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

////////// organization update by id ////////////
const updateJobById = async (req, res) => {
  try {
    const jobId = req.headers.id;
    const { jobpostingsubject, jobsalaryoffered, jobstatus, jobteachinglevel,jobexperience,jobdescription,jobpostdate,joblastdate,jobtype } =
      req.body;
    const job = await jobs.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        isError: true,
        resCode: "jobNotFound",
        message: "Job not found.",
        data: null,
      });
    }

    job.jobpostingsubject = jobpostingsubject || job.jobpostingsubject;
    job.jobsalaryoffered = jobsalaryoffered || job.jobsalaryoffered;
    job.jobstatus = jobstatus || job.jobstatus;
    job.jobteachinglevel = jobteachinglevel || job.jobteachinglevel;
    job.jobexperience = jobexperience || job.jobexperience;
    job.jobdescription = jobdescription || job.jobdescription;
    job.jobpostdate = jobpostdate || job.jobpostdate;
    job.joblastdate = joblastdate || job.joblastdate;
    job.jobtype = jobtype || job.jobtype;

    await job.save();

    res.status(200).json({
      isError: false,
      resCode: "jobUpdated",
      message: "Job updated successfully.",
      data: job,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

///// organization Delete by id /////////////

const deleteJobById = async (req, res) => {
  try {
    const jobId = req.headers.id;

    const deleteResult = await jobs.destroy({ where: { id: jobId } });

    if (!deleteResult) {
      return res.status(404).json({
        isError: true,
        resCode: "jobNotFound",
        message: "Job not found.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "jobDeleted",
      message: "Job deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  createjobs,
  getJobsByOrganizationId,
  getJobById,
  updateJobById,
  deleteJobById,
  getAllJobs
};
