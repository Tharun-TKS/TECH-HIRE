

const { User,Seeker,employer } = require("../models");
const path = require("path");
const url = require("url");
const fs = require("fs");


// GET all users API
const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
  
      // If no users found, return a 404 response
      if (!users || users.length === 0) {
        return res.status(404).json({
          isError: true,
          resCode: "usersNotFound",
          message: "No users found",
          data: null,
        });
      }
  
      // Return the list of users
      return res.status(200).json({
        isError: false,
        resCode: "usersFound",
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      console.error("Error retrieving users:", error);
      return res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };

// GET user by ID API
const getUserById = async (req, res) => {
  const userId = req.headers.id; // Assuming the user ID is passed in the headers

  try {
    // Fetch user by ID
    const user = await User.findOne({ where: { id: userId } });

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).json({
        isError: true,
        resCode: "userNotFound",
        message: "User not found",
        data: null,
      });
    }

    // Return the user data
    return res.status(200).json({
      isError: false,
      resCode: "userFound",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

  
  // DELETE user by ID API
  const deleteUserById = async (req, res) => {
    const userId = req.headers.id; // Assuming the user ID is passed in the headers
    
    try {
      // Check if the user exists
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({
          isError: true,
          resCode: "userNotFound",
          message: "User not found",
          data: null,
        });
      }
  


  
      // Function to delete files associated with Seeker
      const deleteSeekerFiles = async (seekerId) => {
        try {
          const existingSeeker = await Seeker.findOne({ where: { seekerid: seekerId } });
          if (existingSeeker) {
            // Delete seekerresume file if it exists
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
  
            // Delete seekerimage file if it exists
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
          }
        } catch (error) {
          console.error("Error deleting Seeker files:", error);
        }
      };
  
      // Function to delete files associated with employer
      const deleteemployerFiles = async (employerId) => {
        try {
          const existingemployer = await employer.findOne({ where: { employeid: employerId } });
          if (existingemployer) {
            // Delete employerimage file if it exists
            if (existingemployer.employerimage) {
              const parsedUrl = url.parse(existingemployer.employerimage);
              const employerimagePath = parsedUrl.pathname;
              const filePath = path.join(__dirname, "..", employerimagePath);
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.error("Error deleting employer image:", err);
                } else {
                  console.log("employer image deleted successfully");
                }
              });
            }
          }
        } catch (error) {
          console.error("Error deleting employer files:", error);
        }
      };
  
      // Call functions to delete associated files for Seeker and employer
      await deleteSeekerFiles(userId);
      await deleteemployerFiles(userId);
      
      // Delete associated records in Seeker and employer tables if they exist
      await Seeker.destroy({ where: { seekerid: userId } });
      await employer.destroy({ where: { employeid: userId } });
  
      // Finally, delete the user from the User table
      await User.destroy({ where: { id: userId } });
  
      return res.status(200).json({
        isError: false,
        resCode: "userDeleted",
        message: "User and associated records deleted successfully",
        data: null,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({
        isError: true,
        resCode: "internalServerError",
        message: "Internal Server Error",
        data: null,
      });
    }
  };
  
  


module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById
  };