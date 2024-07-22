const dbConnection = require("../config/db");
const { DataTypes, Sequelize } = require("sequelize");

const Organization = dbConnection.define(
  "organizations",
  {
    employeid: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    organizationname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationcity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationstate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationdescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationregistereddate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Organization;
