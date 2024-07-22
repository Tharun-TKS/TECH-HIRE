const dbConnection = require("../config/db");
const { DataTypes, Sequelize } = require("sequelize");

const Seeker = dbConnection.define(
  "seekers",
  {
    seekerid: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    seekerfullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seekercontactnumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    seekeremail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pastworking: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    presentworking: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    presentlocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    presentsalary: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    expectedhike: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    teachinglevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seekersubject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seekerexperience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seekerimage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Seeker;
