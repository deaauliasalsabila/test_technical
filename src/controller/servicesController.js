const servicesModel = require("../models/servicesModels");

exports.getServices = async (req, res) => {
  try {
    const services = await servicesModel.getServices();
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};
