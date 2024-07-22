const dbConnection = require("../config/db");
const { DataTypes, Sequelize } = require("sequelize");

const payments = dbConnection.define(
  "payments",
  {
    placementid: {
      type: DataTypes.INTEGER,
      references: {
        model: "placements",
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
    referenceid: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    paymentemailid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentamount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    paymentdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = payments;
