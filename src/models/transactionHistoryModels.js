const dbPool = require("../config/database");

const getTransactionHistory = async (user_id, offset = 0, limit = 3) => {
  try {
    const query = `
      SELECT
        users_id,
        invoice_number,
        transaction_type,
        description,
        total_amount,
        created_on
      FROM
        transaction_history
      WHERE
        users_id = ?
      ORDER BY
        created_on DESC
      LIMIT ?, ?
    `;
    const [rows] = await dbPool.query(query, [
      user_id,
      parseInt(offset),
      parseInt(limit),
    ]);
    return rows;
  } catch (error) {
    console.error("Get Transaksi History Error:", error);
    throw error;
  }
};

module.exports = { getTransactionHistory };
