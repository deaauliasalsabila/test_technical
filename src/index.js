require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/registerRoutes");
const authRoutes = require("./routes/loginRoutes");
const profileRoutes = require("./routes/profileRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const topUpRoutes = require("./routes/topUpRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const transactionHistoryRoutes = require("./routes/transactionHistoryRoutes");

// Middleware
const middlewareLogRequest = require("./middleware/logs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(middlewareLogRequest);
app.use(express.json());
app.use("/assets", express.static("public/images"));

app.use("/registration", usersRoutes);
app.use("/login", authRoutes);
app.use("/profile", profileRoutes);
app.use("/banner", bannerRoutes);
app.use("/services", servicesRoutes);
app.use("/balance", balanceRoutes);
app.use("/topup", topUpRoutes);
app.use("/transaction", transactionRoutes);
app.use("/transaction/history", transactionHistoryRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});
