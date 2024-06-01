const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");
const transactionController = require("../controller/transactionController");

router.use(verifyToken.verifyToken);

router.post("/", (req, res) => {
  transactionController.createTransactionHandler(req, res);
});

module.exports = router;
