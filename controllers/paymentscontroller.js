const { payments } = require("../models");

// Create Payment
const createPayment = async (req, res) => {
  try {
    const placementId = req.headers.placementid;

    if (!placementId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingHeaders",
        message: "Placement ID is required in headers.",
        data: null,
      });
    }

    const {
      referenceid,
      paymentemailid,
      paymentamount,
      paymentdate,
      paymentstatus,
    } = req.body;

    if (!referenceid || !paymentemailid || !paymentamount || !paymentdate || !paymentstatus) {
      return res.status(400).json({
        isError: true,
        resCode: "missingFields",
        message: "All payment fields are required in the request body.",
        data: null,
      });
    }

    const newPayment = await payments.create({
      placementid: placementId,
      referenceid,
      paymentemailid,
      paymentamount,
      paymentdate,
      paymentstatus,
    });

    res.status(201).json({
      isError: false,
      resCode: "paymentCreated",
      message: "Payment created successfully.",
      data: newPayment,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// Get Payments by Placement ID
const getPaymentsByPlacementId = async (req, res) => {
  try {
    const placementId = req.headers.placementid;

    if (!placementId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingHeaders",
        message: "Placement ID is required in headers.",
        data: null,
      });
    }

    const paymentRecords = await payments.findAll({
      where: {
        placementid: placementId,
      },
    });

    if (paymentRecords.length === 0) {
      return res.status(404).json({
        isError: true,
        resCode: "noPaymentsFound",
        message: "No payments found for the provided placement ID.",
        data: null,
      });
    }

    res.status(200).json({
      isError: false,
      resCode: "paymentsRetrieved",
      message: "Payments retrieved successfully.",
      data: paymentRecords,
    });
  } catch (error) {
    console.error("Error retrieving payments:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// Update Payment by Placement ID
const updatePaymentByPlacementId = async (req, res) => {
  try {
    const placementId = req.headers.placementid;

    if (!placementId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingHeaders",
        message: "Placement ID is required in headers.",
        data: null,
      });
    }

    const {
      referenceid,
      paymentemailid,
      paymentamount,
      paymentdate,
      paymentstatus,
    } = req.body;

    const paymentRecord = await payments.findOne({
      where: {
        placementid: placementId,
      },
    });

    if (!paymentRecord) {
      return res.status(404).json({
        isError: true,
        resCode: "paymentNotFound",
        message: "Payment not found.",
        data: null,
      });
    }

    paymentRecord.referenceid = referenceid || paymentRecord.referenceid;
    paymentRecord.paymentemailid = paymentemailid || paymentRecord.paymentemailid;
    paymentRecord.paymentamount = paymentamount || paymentRecord.paymentamount;
    paymentRecord.paymentdate = paymentdate || paymentRecord.paymentdate;
    paymentRecord.paymentstatus = paymentstatus || paymentRecord.paymentstatus;

    await paymentRecord.save();

    res.status(200).json({
      isError: false,
      resCode: "paymentUpdated",
      message: "Payment updated successfully.",
      data: paymentRecord,
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

// Delete Payment by Placement ID
const deletePaymentByPlacementId = async (req, res) => {
  try {
    const placementId = req.headers.placementid;

    if (!placementId) {
      return res.status(400).json({
        isError: true,
        resCode: "missingHeaders",
        message: "Placement ID is required in headers.",
        data: null,
      });
    }

    const paymentRecord = await payments.findOne({
      where: {
        placementid: placementId,
      },
    });

    if (!paymentRecord) {
      return res.status(404).json({
        isError: true,
        resCode: "paymentNotFound",
        message: "Payment not found.",
        data: null,
      });
    }

    await paymentRecord.destroy();

    res.status(200).json({
      isError: false,
      resCode: "paymentDeleted",
      message: "Payment deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({
      isError: true,
      resCode: "internalServerError",
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  createPayment,
  getPaymentsByPlacementId,
  updatePaymentByPlacementId,
  deletePaymentByPlacementId,
};
