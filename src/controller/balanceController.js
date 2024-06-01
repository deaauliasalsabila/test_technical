const balanceModel = require("../models/balanceModels");

exports.getBalance = async (req, res) => {
  const userId = req.userId;

  try {
    const balance = await balanceModel.getUserBalance(userId);
    return res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: { balance },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};
