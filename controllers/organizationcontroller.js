const { Organization } = require("../models");

// Create organization
const createorganization = async (req, res) => {
  try {
    const employeId = req.headers.employeid;
    if (!employeId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingEmployerId",
        message: "Employer ID is required in headers.",
        data: null,
      });
    }

    const { organizationname, organizationcity, organizationstate, organizationdescription } = req.body;

    const newOrganization = await Organization.create({
      employeid: employeId,
      organizationname,
      organizationcity,
      organizationstate,
      organizationdescription,
    });

    res.status(201).json({
      isError: false,
      resCode: "organizationCreated",
      message: "Organization created successfully.",
      data: newOrganization,
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// GET endpoint to retrieve organizations by employer ID
const getorganizationemployerbyid = async (req, res) => {
  try {
    const employeId = req.headers.employeid;
    if (!employeId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingEmployerId",
        message: "Employer ID is required in headers.",
        data: null,
      });
    }

    const organizations = await Organization.findAll({
      where: {
        employeid: employeId,
      },
    });

    if (organizations.length === 0) {
      return res.status(404).json({
        isError: true,
        resCode: "organizationsNotFound",
        message: "No organizations found for the provided employer ID.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "organizationsFound",
      message: "Organizations found successfully.",
      data: organizations,
    });
  } catch (error) {
    console.error("Error retrieving organizations:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// GET endpoint to retrieve organization by ID
const getOrganizationById = async (req, res) => {
  try {
    const organizationId = req.headers.id;

    const organization = await Organization.findByPk(organizationId);

    if (!organization) {
      return res.status(404).json({
        isError: true,
        resCode: "organizationNotFound",
        message: "Organization not found.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "organizationFound",
      message: "Organization found successfully.",
      data: organization,
    });
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// GET endpoint to retrieve all organizations
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();

    res.status(200).json({
      isError: false,
      resCode: "organizationsFound",
      message: "Organizations found successfully.",
      data: organizations,
    });
  } catch (error) {
    console.error("Error retrieving organizations:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// PUT endpoint to update organization by ID
const updateOrganizationById = async (req, res) => {
  try {
    const organizationId = req.headers.id;
    const { organizationname, organizationcity, organizationstate, organizationdescription } = req.body;

    const organization = await Organization.findByPk(organizationId);

    if (!organization) {
      return res.status(404).json({
        isError: true,
        resCode: "organizationNotFound",
        message: "Organization not found.",
        data: null,
      });
    }

    organization.organizationname = organizationname || organization.organizationname;
    organization.organizationcity = organizationcity || organization.organizationcity;
    organization.organizationstate = organizationstate || organization.organizationstate;
    organization.organizationdescription = organizationdescription || organization.organizationdescription;

    await organization.save();

    res.status(200).json({
      isError: false,
      resCode: "organizationUpdated",
      message: "Organization updated successfully.",
      data: organization,
    });
  } catch (error) {
    console.error("Error updating organization:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// DELETE endpoint to delete organization by ID
const deleteOrganizationById = async (req, res) => {
  try {
    const organizationId = req.headers.id;

    const deleteResult = await Organization.destroy({ where: { id: organizationId } });

    if (!deleteResult) {
      return res.status(404).json({
        isError: true,
        resCode: "organizationNotFound",
        message: "Organization not found.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "organizationDeleted",
      message: "Organization deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting organization:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  createorganization,
  getorganizationemployerbyid,
  getOrganizationById,
  getAllOrganizations,
  updateOrganizationById,
  deleteOrganizationById,
};
