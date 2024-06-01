const { getTransactionHistory } = require("../models/transactionHistoryModels");

exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { offset = 0, limit = 3 } = req.query;

    const transactionHistory = await getTransactionHistory(
      userId,
      offset,
      limit
    );

    // Remove users_id from each record
    const filteredTransactionHistory = transactionHistory.map((record) => {
      const { users_id, ...rest } = record;
      return rest;
    });

    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: parseInt(offset),
        limit: parseInt(limit),
        records: filteredTransactionHistory,
      },
    });
  } catch (error) {
    console.error("Error getting transaction history:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
};
