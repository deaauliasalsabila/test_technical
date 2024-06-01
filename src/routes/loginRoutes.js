const express = require("express");
const router = express.Router();
const authController = require("../controller/loginController.js");

router.post("/", authController.login);

router.get("/", authController.verifyToken, (req, res) => {
  res.json({
    status: 0,
    message: "Access granted to secret route",
    data: { userId: req.userId },
  });
});

module.exports = router;
