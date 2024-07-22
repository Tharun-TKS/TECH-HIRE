const dbConnection = require("../config/db");
const { DataTypes, Sequelize, HasMany } = require("sequelize");

const placement = dbConnection.define(
  "placements",
  {
    seekerid: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },

    organizationid: {
      type: DataTypes.INTEGER,
      references: {
        model: "organizations",
        key: "id",
      },
    },

    jobid: {
      type: DataTypes.INTEGER,
      references: {
        model: "jobs",
        key: "id",
      },
    },

    placementdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    placementlocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placedcollege: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placedseekername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placedsalary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placedcharges: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    placementstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = placement;


