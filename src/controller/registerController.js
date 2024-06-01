const UsersModel = require("../models/registerModels");

exports.createNewUser = async (req, res) => {
  const { body } = req;

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!body.email || !body.first_name || !body.last_name || !body.password) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null,
    });
  }

  if (!isValidEmail(body.email)) {
    return res.status(400).json({
      status: 102,
      message: "Parameter email tidak sesuai format",
      data: null,
    });
  }

  if (body.password.length < 8) {
    return res.status(400).json({
      status: 103,
      message: "Password minimal 8 karakter",
      data: null,
    });
  }

  try {
    const existingUser = await UsersModel.findUserByEmail(body.email);
    if (existingUser) {
      return res.status(400).json({
        status: 104,
        message: "Email sudah ada",
        data: null,
      });
    }

    await UsersModel.createNewUser(body);
    return res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};
