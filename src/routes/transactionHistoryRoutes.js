const express = require("express");
const router = express.Router();
const transactionHistoryController = require("../controller/transactionHistoryController");
const { verifyToken } = require("../middleware/token");

router.get(
  "/",
  verifyToken,
  transactionHistoryController.getTransactionHistory
);

module.exports = router;
