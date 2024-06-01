const dbPool = require("../config/database");

exports.findUserByEmail = async (email) => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

exports.updateUserProfile = async (
  email,
  firstName,
  lastName,
  profileImage
) => {
  try {
    const fieldsToUpdate = [];
    const values = [];

    if (firstName) {
      fieldsToUpdate.push("first_name = ?");
      values.push(firstName);
    }

    if (lastName) {
      fieldsToUpdate.push("last_name = ?");
      values.push(lastName);
    }

    if (profileImage) {
      const allowedExtensions = [".jpeg", ".jpg", ".png"];
      const extension = profileImage
        .substring(profileImage.lastIndexOf("."))
        .toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        throw new Error(
          "Invalid image format. Only JPEG and PNG files are allowed."
        );
      }
      fieldsToUpdate.push("profile_image = ?");
      values.push(profileImage);
    }

    if (fieldsToUpdate.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(email);

    const query = `UPDATE users SET ${fieldsToUpdate.join(
      ", "
    )} WHERE email = ?`;
    await dbPool.query(query, values);
  } catch (error) {
    throw error;
  }
};

exports.updateUserProfileImage = async (email, profileImage) => {
  try {
    const query = "UPDATE users SET profile_image = ? WHERE email = ?";
    await dbPool.query(query, [profileImage, email]);
  } catch (error) {
    throw error;
  }
};
