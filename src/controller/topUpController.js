const {
  insertTopupTransaction,
  getBalanceByUserId,
} = require("../models/topUpModels");
const { generateInvoiceNumberTopUp } = require("../helpers/helpers");

const TopupController = {
  topupBalance: async (req, res) => {
    try {
      const userId = req.userId;
      const { top_up_amount } = req.body;

      if (!Number.isInteger(top_up_amount) || top_up_amount <= 0) {
        return res.status(400).json({
          status: 102,
          message: "Parameter amount hanya boleh bilangan bulat positif",
          data: null,
        });
      }

      // Generate invoice_number
      const invoice_number = generateInvoiceNumberTopUp();

      const transactionId = await insertTopupTransaction(
        userId,
        top_up_amount,
        "TOPUP",
        invoice_number
      );

      // Get updated balance setelah Top Up
      const updatedBalance = await getBalanceByUserId(userId);

      if (transactionId) {
        res.status(200).json({
          status: 0,
          message: "Top Up Balance berhasil",
          data: { balance: updatedBalance },
        });
      } else {
        throw new Error("Gagal menambahkan transaksi top-up");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  },
};

module.exports = TopupController;
