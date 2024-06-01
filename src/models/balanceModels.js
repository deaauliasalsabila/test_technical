const dbPool = require("../config/database");

exports.getUserBalance = async (userId) => {
  try {
    const [rows] = await dbPool.query(
      "SELECT balance FROM balance WHERE user_id = ?",
      [userId]
    );
    return rows[0]?.balance ?? 0;
  } catch (error) {
    throw error;
  }
};
