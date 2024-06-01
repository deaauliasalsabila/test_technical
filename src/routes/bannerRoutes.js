const express = require("express");
const router = express.Router();
const bannerController = require("../controller/bannerController.js");

router.get("/", bannerController.getAllBanners);

module.exports = router;
