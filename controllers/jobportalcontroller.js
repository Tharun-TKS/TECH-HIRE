const { jobportal } = require("../models");

const createjobportal = async (req, res) => {
  try {
    const jobId = req.headers.jobid;
    const seekerId = req.headers.seekerid;

    if (!jobId || !seekerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingHeaders",
        message: "Job ID and Seeker ID are required in headers.",
        data: null,
      });
    }

    // Check if the entry already exists
    const existingEntry = await jobportal.findOne({ where: { jobid: jobId, seekerid: seekerId } });

    if (existingEntry) {
      return res.status(400).json({
        isError: true,
        resCode: "duplicateEntry",
        message: "You have already applied for this job.",
        data: null,
      });
    }

    const newJobPortalEntry = await jobportal.create({
      jobid: jobId,
      seekerid: seekerId,
    });

    res.status(201).json({
      isError: false,
      resCode: "jobPortalEntryCreated",
      message: "Job portal entry created successfully.",
      data: newJobPortalEntry,
    });
  } catch (error) {
    console.error("Error creating job portal entry:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};


///////get all jobportal///////
const getAlljobportal = async (req, res) => {
  try {
    const Jobportals = await jobportal.findAll();

    if (!Jobportals || Jobportals.length === 0) {
      return res.status(404).json({
        isError: true,
        resCode: "noJobportalsFound",
        message: "No Jobportals found.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "JobportalsRetrieved",
      message: "Jobportals retrieved successfully.",
      data: Jobportals,
    });
  } catch (error) {
    console.error("Error retrieving Jobportals:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

  
//////////////getJobPortalEntriesBySeekerId ///////////
  const getJobPortalEntriesBySeekerId = async (req, res) => {
    try {
      const seekerId = req.headers.seekerid;
      if (!seekerId) {
        return res.status(400).json({
          isError: true,
          resCode: "missingSeekerId",
          message: "Seeker ID is required in headers.",
          data: null,
        });
      }
  
      const jobPortalEntries = await jobportal.findAll({
        where: {
          seekerid: seekerId,
        },
      });
  
      if (jobPortalEntries.length === 0) {
        return res.status(404).json({
          isError: true,
          resCode: "entriesNotFound",
          message: "No job portal entries found for the provided seeker ID.",
          data: null,
        });
      }
  
      res.status(200).json({
        isError: false,
        resCode: "entriesFound",
        message: "Job portal entries found successfully.",
        data: jobPortalEntries,
      });
    } catch (error) {
      console.error("Error retrieving job portal entries:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };



////////////////getJobPortalEntriesByJobId ////////

  const getJobPortalEntriesByJobId = async (req, res) => {
    try {
      const jobId = req.headers.id;
      if (!jobId) {
        return res.status(400).json({
          isError: true,
          resCode: "missingJobId",
          message: "Job ID is required in headers.",
          data: null,
        });
      }
  
      const jobPortalEntries = await jobportal.findAll({
        where: {
          jobid: jobId,
        },
      });
  
      if (jobPortalEntries.length === 0) {
        return res.status(404).json({
          isError: true,
          resCode: "entriesNotFound",
          message: "No job portal entries found for the provided job ID.",
          data: null,
        });
      }
  
      res.status(200).json({
        isError: false,
        resCode: "entriesFound",
        message: "Job portal entries found successfully.",
        data: jobPortalEntries,
      });
    } catch (error) {
      console.error("Error retrieving job portal entries:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };

////////updateJobPortalEntryById ///////////

  const updateJobPortalEntryById = async (req, res) => {
    try {
      const entryId = req.headers.id;
      const { jobportalstatus } = req.body;
  
      const jobPortalEntry = await jobportal.findByPk(entryId);
  
      if (!jobPortalEntry) {
        return res.status(404).json({
          isError: true,
          resCode: "entryNotFound",
          message: "Job portal entry not found.",
          data: null,
        });
      }
  
      jobPortalEntry.jobportalstatus = jobportalstatus || jobPortalEntry.jobportalstatus;
  
      await jobPortalEntry.save();
  
      res.status(200).json({
        isError: false,
        resCode: "entryUpdated",
        message: "Job portal entry updated successfully.",
        data: jobPortalEntry,
      });
    } catch (error) {
      console.error("Error updating job portal entry:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
  
///////////deleteJobPortalEntryById/////////////


const deleteJobPortalEntryById = async (req, res) => {
    try {
      const entryId = req.headers.id;
  
      const deleteResult = await jobportal.destroy({ where: { id: entryId } });
  
      if (!deleteResult) {
        return res.status(404).json({
          isError: true,
          resCode: "entryNotFound",
          message: "Job portal entry not found.",
          data: null,
        });
      }
  
      res.status(200).json({
        isError: false,
        resCode: "entryDeleted",
        message: "Job portal entry deleted successfully.",
        data: null,
      });
    } catch (error) {
      console.error("Error deleting job portal entry:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
  
  


module.exports = {
    createjobportal,
    getJobPortalEntriesBySeekerId,
    getJobPortalEntriesByJobId,
    updateJobPortalEntryById,
    deleteJobPortalEntryById,
    getAlljobportal
    
  };

























  