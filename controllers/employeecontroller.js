const { employer } = require("../models");
const { ROOT_URL } = require("../constants/constants");
const multer = require("multer");
const path = require("path");
const url = require("url");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Files"); // specify the directory to save files
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const employerupload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Allow images and common image files
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extname) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and image files are allowed to upload"));
    }
  },
}).fields([{ name: "employerimage", maxCount: 1 }]);

/////post employer api ///////

const createEmployer = async (req, res) => {
  try {
    const { employerfullname, employercontactnumber, employeremail } = req.body;
    const employerId = req.headers.employeid;

    // Check if employerId is provided in headers
    if (!employerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingemployerId",
        message: "Employer ID must be provided in headers",
        data: null,
      });
    }
    // Check if employerId already exists
    const existingEmployer = await employer.findOne({
      where: { employeid: employerId },
    });
    if (existingEmployer) {
      return res.status(400).json({
        isError: true,
        resCode: "employerIdExists",
        message: "Employer ID already exists",
        data: null,
      });
    }

    let employerData = {
      employeid: employerId,
      employerfullname,
      employercontactnumber,
      employeremail,
    };

    if (req.files && req.files.employerimage) {
      employerData.employerimage = (
        ROOT_URL + req.files.employerimage[0].path
      ).replace(/\\/g, "/");
    }

    // Create new employer
    const newEmployer = await employer.create(employerData);

    // Return the newly created employer data
    return res.status(201).json({
      isError: false,
      resCode: "employerCreated",
      message: "Employer created successfully",
      data: newEmployer,
    });
  } catch (error) {
    console.error("Error creating employer:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

///////update by employerid api ////////
const byidemployerupdate = async (req, res) => {
  try {
    const { employerfullname, employercontactnumber } = req.body;
    const employerId = req.headers.id;

    // Check if employerId is provided in headers
    if (!employerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingemployerId",
        message: "Employer ID must be provided in headers",
        data: null,
      });
    }

    let updateInfo = {
      employerfullname,
      employercontactnumber,
    };

    if (req.files) {
      const existingemployer = await employer.findOne({
        where: { employeid: employerId },
      });

      if (req.files.employerimage) {
        if (existingemployer && existingemployer.employerimage) {
          const parsedUrl = url.parse(existingemployer.employerimage);
          const employerimagePath = parsedUrl.pathname;
          const filePath = path.join(__dirname, "..", employerimagePath);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting previous employerimage:", err);
            } else {
              console.log("Previous employerimage deleted successfully");
            }
          });
        }
        updateInfo.employerimage = (
          ROOT_URL + req.files.employerimage[0].path
        ).replace(/\\/g, "/");
      }
    }

    // Update the employer
    await employer.update(updateInfo, {
      where: { employeid: employerId },
    });

    // Fetch the updated employer separately
    const updatedemployer = await employer.findOne({
      where: { employeid: employerId },
    });

    // If the employer is not found after update, return a 404 response
    if (!updatedemployer) {
      return res.status(404).json({
        isError: true,
        resCode: "employerNotFound",
        message: "Employer not found",
        data: null,
      });
    }

    // Return the updated employer data
    return res.status(200).json({
      isError: false,
      resCode: "employerUpdated",
      message: "Employer updated successfully",
      data: updatedemployer,
    });
  } catch (error) {
    console.error("Error updating employer:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// GET Endpoint to fetch employer by id
const getEmployerById = async (req, res) => {
  try {
    const employerId = req.headers.employeid;

    // Check if employerId is provided in headers
    if (!employerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingemployerId",
        message: "Employer ID must be provided in headers",
        data: null,
      });
    }

    // Fetch the employer by id
    const existingemployer = await employer.findOne({
      where: { employeid: employerId },
    });

    // If the employer is not found, return a 404 response
    if (!existingemployer) {
      return res.status(404).json({
        isError: true,
        resCode: "employerNotFound",
        message: "Employer not found",
        data: null,
      });
    }

    // Return the employer data
    return res.status(200).json({
      isError: false,
      resCode: "employerFound",
      message: "Employer found successfully",
      data: existingemployer,
    });
  } catch (error) {
    console.error("Error fetching employer:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// DELETE by employerid API
const deleteEmployerById = async (req, res) => {
  try {
    const employerId = req.headers.employeid;

    // Check if employerId is provided in headers
    if (!employerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingEmployerId",
        message: "Employer ID must be provided in headers",
        data: null,
      });
    }

    // Fetch the employer details from the database
    const existingEmployer = await employer.findOne({ where: { employeid: employerId } });

    // If the employer is not found, return a 404 response
    if (!existingEmployer) {
      return res.status(404).json({
        isError: true,
        resCode: "employerNotFound",
        message: "Employer not found",
        data: null,
      });
    }

    // Delete associated files if they exist
    if (existingEmployer.employerimage) {
      const parsedUrl = url.parse(existingEmployer.employerimage);
      const employerimagePath = parsedUrl.pathname;
      const filePath = path.join(__dirname, "..", employerimagePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting employer image:", err);
        } else {
          console.log("Employer image deleted successfully");
        }
      });
    }

    // Delete the employer from the database
    await employer.destroy({ where: { employeid: employerId } });

    // Return a success response
    return res.status(200).json({
      isError: false,
      resCode: "employerDeleted",
      message: "Employer deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting employer:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  byidemployerupdate,
  employerupload,
  getEmployerById,
  createEmployer,
  deleteEmployerById
};
