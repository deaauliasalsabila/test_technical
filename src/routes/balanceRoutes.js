const express = require("express");
const router = express.Router();
const balanceController = require("../controller/balanceController");
const { verifyToken } = require("../middleware/token");

router.get("/", verifyToken, balanceController.getBalance);

module.exports = router;
