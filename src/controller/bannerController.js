const bannerModel = require("../models/bannerModels");

exports.getAllBanners = async (req, res) => {
  try {
    const banner = await bannerModel.getAllBanners();
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server Error",
      data: null,
    });
  }
};
