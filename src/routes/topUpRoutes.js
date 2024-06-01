const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/token");
const topUpController = require("../controller/topUpController");

router.use(verifyToken.verifyToken);

router.post("/", (req, res) => {
  topUpController.topupBalance(req, res);
});

module.exports = router;
