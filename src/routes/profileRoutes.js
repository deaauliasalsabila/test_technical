const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController.js");
const authController = require("../controller/loginController.js");

router.get("/", authController.verifyToken, profileController.getProfile);
router.put("/update", authController.verifyToken, profileController.update);
router.put("/image", profileController.uploadProfileImage);

module.exports = router;
