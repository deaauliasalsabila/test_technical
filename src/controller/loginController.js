const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginModel = require("../models/loginModels");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null,
    });
  }

  try {
    const user = await loginModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: 103,
        message: "Email atau password salah",
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: 103,
        message: "Email atau password salah",
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      status: 0,
      message: "Login Sukses",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      status: 104,
      message: "Token not provided",
      data: null,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });
    }

    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  });
};
