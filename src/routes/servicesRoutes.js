const express = require("express");
const router = express.Router();
const servicesController = require("../controller/servicesController.js");
const { verifyToken } = require("../middleware/token.js");

router.get("/", verifyToken, servicesController.getServices);

module.exports = router;
