const dbConnection = require("../config/db");
const { DataTypes, Sequelize } = require("sequelize");

const jobportal = dbConnection.define(
  "jobportal",
  {
    jobid: {
      type: DataTypes.INTEGER,
      references: {
        model: "jobs",
        key: "id",
      },
    },
    seekerid: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    jobportalstatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Applied",
    },
    jobapplieddate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = jobportal;
