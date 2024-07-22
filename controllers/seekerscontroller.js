const { Seeker } = require("../models");
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

const seekerupload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|jpeg|jpg|png|gif/; // Allow PDF and common image files
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
}).fields([
  { name: "seekerresume", maxCount: 1 },
  { name: "seekerimage", maxCount: 1 },
]);

/////post seeker api ///////

const createSeeker = async (req, res) => {
  try {
    const {
      seekerfullname,
      seekeremail,
      seekercontactnumber,
      pastworking,
      presentworking,
      presentlocation,
      presentsalary,
      expectedhike,
      teachinglevel,
      registrationdate,
      seekersubject,
      seekerexperience,
      facebook,
      twitter,
      linkedin,
    } = req.body;
    const seekerId = req.headers.seekerid;

    // Check if seekerId is provided in headers
    if (!seekerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingSeekerId",
        message: "Seeker ID must be provided in headers",
        data: null,
      });
    }

    // Check if seekerId already exists
    const existingSeeker = await Seeker.findOne({
      where: { seekerid: seekerId },
    });
    if (existingSeeker) {
      return res.status(400).json({
        isError: true,
        resCode: "seekerIdExists",
        message: "Seeker ID already exists",
        data: null,
      });
    }

    let seekerData = {
      seekerid: seekerId,
      seekerfullname,
      seekeremail,
      seekercontactnumber,
      pastworking,
      presentworking,
      presentlocation,
      presentsalary,
      expectedhike,
      teachinglevel,
      registrationdate,
      seekersubject,
      seekerexperience,
      facebook,
      twitter,
      linkedin,
    };

    if (req.files) {
      if (req.files.seekerresume) {
        seekerData.seekerresume = (
          ROOT_URL + req.files.seekerresume[0].path
        ).replace(/\\/g, "/");
      }
      if (req.files.seekerimage) {
        seekerData.seekerimage = (
          ROOT_URL + req.files.seekerimage[0].path
        ).replace(/\\/g, "/");
      }
    }

    // Create new seeker
    const newSeeker = await Seeker.create(seekerData);

    // Return the newly created seeker data
    return res.status(201).json({
      isError: false,
      resCode: "seekerCreated",
      message: "Seeker created successfully",
      data: newSeeker,
    });
  } catch (error) {
    console.error("Error creating seeker:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

///// sekker updatebyid API//////
const byidseekerupdate = async (req, res) => {
  try {
    const {
      seekerfullname,
      seekercontactnumber,
      pastworking,
      presentworking,
      presentlocation,
      presentsalary,
      expectedhike,
      teachinglevel,
      registrationdate,
      seekersubject,
      seekerexperience,
      facebook,
      twitter,
      linkedin,
    } = req.body;
    const seekerId = req.headers.id;

    // Check if seekerId is provided in headers
    if (!seekerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingseekerId",
        message: "Seeker ID must be provided in headers",
        data: null,
      });
    }

    let updateInfo = {
      seekerfullname,
      seekercontactnumber,
      pastworking,
      presentworking,
      presentlocation,
      presentsalary,
      expectedhike,
      teachinglevel,
      registrationdate,
      seekersubject,
      seekerexperience,
      facebook,
      twitter,
      linkedin,
    };

    if (req.files) {
      const existingSeeker = await Seeker.findOne({
        where: { seekerid: seekerId },
      });

      if (req.files.seekerresume) {
        if (existingSeeker && existingSeeker.seekerresume) {
          const parsedUrl = url.parse(existingSeeker.seekerresume);
          const seekerresumePath = parsedUrl.pathname;
          const filePath = path.join(__dirname, "..", seekerresumePath);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting previous seekerresume:", err);
            } else {
              console.log("Previous seekerresume deleted successfully");
            }
          });
        }
        updateInfo.seekerresume = (
          ROOT_URL + req.files.seekerresume[0].path
        ).replace(/\\/g, "/");
      }

      if (req.files.seekerimage) {
        if (existingSeeker && existingSeeker.seekerimage) {
          const parsedUrl = url.parse(existingSeeker.seekerimage);
          const seekerimagePath = parsedUrl.pathname;
          const filePath = path.join(__dirname, "..", seekerimagePath);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting previous seekerimage:", err);
            } else {
              console.log("Previous seekerimage deleted successfully");
            }
          });
        }
        updateInfo.seekerimage = (
          ROOT_URL + req.files.seekerimage[0].path
        ).replace(/\\/g, "/");
      }
    }

    // Update the seeker
    await Seeker.update(updateInfo, {
      where: { seekerid: seekerId },
    });

    // Fetch the updated seeker separately
    const updatedSeeker = await Seeker.findOne({
      where: { seekerid: seekerId },
    });

    // If the seeker is not found after update, return a 404 response
    if (!updatedSeeker) {
      return res.status(404).json({
        isError: true,
        resCode: "seekerNotFound",
        message: "Seeker not found",
        data: null,
      });
    }

    // Return the updated seeker data
    return res.status(200).json({
      isError: false,
      resCode: "seekerUpdated",
      message: "Seeker updated successfully",
      data: updatedSeeker,
    });
  } catch (error) {
    console.error("Error updating seeker:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

/////////get API by seeker id ////
const getSeekerById = async (req, res) => {
  try {
    const seekerId = req.headers.seekerid;

    // Check if seekerId is provided in headers
    if (!seekerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingSeekerId",
        message: "Seeker ID must be provided in headers",
        data: null,
      });
    }

    // Fetch the seeker details from the database
    const seeker = await Seeker.findOne({ where: { seekerid: seekerId } });

    // If the seeker is not found, return a 404 response
    if (!seeker) {
      return res.status(404).json({
        isError: true,
        resCode: "seekerNotFound",
        message: "Seeker not found",
        data: null,
      });
    }

    // Return the seeker data
    return res.status(200).json({
      isError: false,
      resCode: "seekerFound",
      message: "Seeker details retrieved successfully",
      data: seeker,
    });
  } catch (error) {
    console.error("Error retrieving seeker details:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// DELETE  by seekerid API
const deleteSeekerById = async (req, res) => {
  try {
    const seekerId = req.headers.seekerid;

    // Check if seekerId is provided in headers
    if (!seekerId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingSeekerId",
        message: "Seeker ID must be provided in headers",
        data: null,
      });
    }

    // Fetch the seeker details from the database
    const existingSeeker = await Seeker.findOne({
      where: { seekerid: seekerId },
    });

    // If the seeker is not found, return a 404 response
    if (!existingSeeker) {
      return res.status(404).json({
        isError: true,
        resCode: "seekerNotFound",
        message: "Seeker not found",
        data: null,
      });
    }

    // Delete associated files if they exist
    if (existingSeeker.seekerresume) {
      const parsedUrl = url.parse(existingSeeker.seekerresume);
      const seekerresumePath = parsedUrl.pathname;
      const filePath = path.join(__dirname, "..", seekerresumePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting seeker resume:", err);
        } else {
          console.log("Seeker resume deleted successfully");
        }
      });
    }

    if (existingSeeker.seekerimage) {
      const parsedUrl = url.parse(existingSeeker.seekerimage);
      const seekerimagePath = parsedUrl.pathname;
      const filePath = path.join(__dirname, "..", seekerimagePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting seeker image:", err);
        } else {
          console.log("Seeker image deleted successfully");
        }
      });
    }

    // Delete the seeker from the database
    await Seeker.destroy({ where: { seekerid: seekerId } });

    // Return a success response
    return res.status(200).json({
      isError: false,
      resCode: "seekerDeleted",
      message: "Seeker deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting seeker:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  byidseekerupdate,
  seekerupload,
  getSeekerById,
  createSeeker,
  deleteSeekerById,
};
