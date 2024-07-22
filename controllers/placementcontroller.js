const {placement} = require ("../models")

/////////create placements /////

const createplacements = async (req, res) => {
    try {
      const seekerId = req.headers.seekerid;
      const organizationId = req.headers.organizationid;
      const jobId = req.headers.jobid;
  
      if (!seekerId || !organizationId || !jobId) {
        return res.status(400).json({
          isError: true,
          resCode: "missingHeaders",
          message: "Seeker ID, Organization ID, and Job ID are required in headers.",
          data: null,
        });
      }
  
      const {
        placementdate,
        placementlocation,
        placedcollege,
        placedseekername,
        placedsalary,
        placedcharges,
        placementstatus,
      } = req.body;
  
      if (!placementdate || !placementlocation || !placedcollege || !placedseekername || !placedsalary || !placedcharges || !placementstatus) {
        return res.status(400).json({
          isError: true,
          resCode: "missingFields",
          message: "All placement fields are required in the request body.",
          data: null,
        });
      }
  
      const newPlacement = await placement.create({
        seekerid: seekerId,
        organizationid: organizationId,
        jobid: jobId,
        placementdate,
        placementlocation,
        placedcollege,
        placedseekername,
        placedsalary,
        placedcharges,
        placementstatus,
      });
  
      res.status(201).json({
        isError: false,
        resCode: "placementCreated",
        message: "Placement created successfully.",
        data: newPlacement,
      });
    } catch (error) {
      console.error("Error creating placement:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };



  /////////get placementbyid ////////
  const getPlacementById = async (req, res) => {
    try {
      const placementId = req.headers.id;
  
      const placements = await placement.findByPk(placementId);
  
      if (!placements) {
        return res.status(404).json({
          isError: true,
          resCode: "placementNotFound",
          message: "Placement not found.",
          data: null,
        });
      }
  
      res.status(200).json({
        isError: false,
        resCode: "placementFound",
        message: "Placement retrieved successfully.",
        data: placements,
      });
    } catch (error) {
      console.error("Error retrieving placement:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };

////////////getPlacementsByJobId///////

  const getPlacementsByJobId = async (req, res) => {
    try {
      const jobId = req.headers.jobid;
  
      if (!jobId) {
        return res.status(400).json({
          isError: true,
          resCode: "missingHeaders",
          message: "Job ID is required in headers.",
          data: null,
        });
      }
  
      const placements = await placement.findAll({
        where: { jobid: jobId },
      });
  
      if (placements.length === 0) {
        return res.status(404).json({
          isError: true,
          resCode: "placementsNotFound",
          message: "No placements found for the provided job ID.",
          data: null,
        });
      }
  
      res.status(200).json({
        isError: false,
        resCode: "placementsFound",
        message: "Placements retrieved successfully.",
        data: placements,
      });
    } catch (error) {
      console.error("Error retrieving placements:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
  
/////////getPlacementsBySeekerId//////////

  const getPlacementsBySeekerId = async (req, res) => {
    try {
      const seekerId = req.headers.seekerid;
  
      if (!seekerId) {
        return res.status(400).json({
          isError: true,
          resCode: "missingHeaders",
          message: "Seeker ID is required in headers.",
          data: null,
        });
      }
  
      const placements = await placement.findAll({
        where: { seekerid: seekerId },
      });
  
      if (placements.length === 0) {
        return res.status(404).json({
          isError: true,
          resCode: "placementsNotFound",
          message: "No placements found for the provided seeker ID.",
          data: null,
        });
      }
  
      res.status(200).json({
        isError: false,
        resCode: "placementsFound",
        message: "Placements retrieved successfully.",
        data: placements,
      });
    } catch (error) {
      console.error("Error retrieving placements:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };

  /////////////////getPlacementsByOrganizationId////////////

  const getPlacementsByOrganizationId = async (req, res) => {
  try {
    const organizationId = req.headers.organizationid;

    if (!organizationId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingHeaders",
        message: "Organization ID is required in headers.",
        data: null,
      });
    }

    const placements = await placement.findAll({
      where: { organizationid: organizationId },
    });

    if (placements.length === 0) {
      return res.status(404).json({
        isError: true,
        resCode: "placementsNotFound",
        message: "No placements found for the provided organization ID.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "placementsFound",
      message: "Placements retrieved successfully.",
      data: placements,
    });
  } catch (error) {
    console.error("Error retrieving placements:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

//////update placementid/////
const updatePlacementById = async (req, res) => {
    try {
      const placementId = req.headers.id;
  
      const {
        placementdate,
        placementlocation,
        placedcollege,
        placedseekername,
        placedsalary,
        placedcharges,
        placementstatus,
      } = req.body;
  
      const placements = await placement.findByPk(placementId);
  
      if (!placements) {
        return res.status(404).json({
          isError: true,
          resCode: "placementNotFound",
          message: "Placement not found.",
          data: null,
        });
      }
  
      if (
        !placementdate ||
        !placementlocation ||
        !placedcollege ||
        !placedseekername ||
        !placedsalary ||
        !placedcharges ||
        !placementstatus
      ) {
        return res.status(400).json({
          isError: true,
          resCode: "missingFields",
          message: "All placement fields are required in the request body.",
          data: null,
        });
      }
  
      placements.placementdate = placementdate;
      placements.placementlocation = placementlocation;
      placements.placedcollege = placedcollege;
      placements.placedseekername = placedseekername;
      placements.placedsalary = placedsalary;
      placements.placedcharges = placedcharges;
      placements.placementstatus = placementstatus;
  
      await placements.save();
  
      res.status(200).json({
        isError: false,
        resCode: "placementUpdated",
        message: "Placement updated successfully.",
        data: placements,
      });
    } catch (error) {
      console.error("Error updating placement:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
  
/////////////delete placementbyid//////////  

const deletePlacementById = async (req, res) => {
    try {
      const placementId = req.headers.id;
  
      const placements = await placement.findByPk(placementId);
  
      if (!placements) {
        return res.status(404).json({
          isError: true,
          resCode: "placementNotFound",
          message: "Placement not found.",
          data: null,
        });
      }
  
      await placements.destroy();
  
      res.status(200).json({
        isError: false,
        resCode: "placementDeleted",
        message: "Placement deleted successfully.",
        data: null,
      });
    } catch (error) {
      console.error("Error deleting placement:", error);
      res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
  
  

  

module.exports={
    createplacements,
    getPlacementById,
    getPlacementsByJobId,
    getPlacementsBySeekerId,
    getPlacementsByOrganizationId,
    updatePlacementById,
    deletePlacementById

}