const jwt = require("jsonwebtoken");
const profileModel = require("../models/profileModels");
const upload = require("../middleware/multer").single("file");

exports.getProfile = async (req, res) => {
  try {
    const user = await profileModel.findUserByEmail(req.email);

    if (!user) {
      return res.status(404).json({
        status: 107,
        message: "User not found",
        data: null,
      });
    }

    res.json({
      status: 0,
      message: "Sukses",
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await profileModel.findUserByEmail(req.email);

    if (!user) {
      return res.status(404).json({
        status: 107,
        message: "User not found",
        data: null,
      });
    }

    const { first_name, last_name } = req.body;

    await profileModel.updateUserProfile(req.email, first_name, last_name);

    const updatedUser = await profileModel.findUserByEmail(req.email);
    res.json({
      status: 0,
      message: "Update Profil berhasil",
      data: {
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        profile_image: updatedUser.profile_image,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

exports.uploadProfileImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        status: 102,
        message: err.message,
        data: null,
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;

      const user = await profileModel.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({
          status: 107,
          message: "User not found",
          data: null,
        });
      }

      const profile_image = `${req.protocol}://${req.get("host")}/assets/${
        req.file.filename
      }`;
      await profileModel.updateUserProfileImage(email, profile_image);

      const updatedUser = await profileModel.findUserByEmail(email);

      res.json({
        status: 0,
        message: "Update Profile Image berhasil",
        data: {
          email: updatedUser.email,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          profile_image: updatedUser.profile_image,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        data: null,
      });
    }
  });
};
