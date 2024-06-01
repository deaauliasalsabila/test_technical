const express = require("express");
const router = express.Router();
const UserController = require("../controller/registerController.js");

router.post("/", UserController.createNewUser);

module.exports = router;
