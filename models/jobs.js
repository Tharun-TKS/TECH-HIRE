const dbConnection = require("../config/db");
const { DataTypes, Sequelize } = require("sequelize");

const jobs = dbConnection.define(
  "jobs",
  {
    organizationid: {
        type: DataTypes.INTEGER,
        references: {
          model: "organizations",
          key: "id",
        },
        
      },
    jobpostingsubject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobsalaryoffered: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobteachinglevel:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobexperience:{
        type: DataTypes.STRING,
        allowNull: false,
      },
     jobdescription:{
      type: DataTypes.STRING,
      allowNull: false,
     },
     jobpostdate:{
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
     },
     joblastdate:{
      type: DataTypes.DATEONLY,
      allowNull: false,
     },
     jobtype:{
      type: DataTypes.STRING,
      allowNull: false,
     },

  },
  {
    timestamps: false,
  }
);

module.exports = jobs;