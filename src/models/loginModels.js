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
