const dbConnection = require("../config/db");
const { DataTypes, Sequelize } = require("sequelize");

const employer = dbConnection.define(
  "employers",
  {
    employeid: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      
    },
    employerfullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employercontactnumber: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    employeremail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employerimage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employerlocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = employer;