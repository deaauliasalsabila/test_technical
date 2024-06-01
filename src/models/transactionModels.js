const dbPool = require("../config/database");

exports.createTransaction = async (
  userId,
  service_code,
  invoice_number,
  total_amount
) => {
  try {
    await dbPool.execute(
      "UPDATE balance SET balance = balance - ? WHERE user_id = ?",
      [total_amount, userId]
    );
    const [result] = await dbPool.execute(
      "INSERT INTO transaction (users_id, service_code, invoice_number, total_amount, transaction_type, created_on) VALUES (?, ?, ?, ?, ?, NOW())",
      [userId, service_code, invoice_number, total_amount, "PAYMENT"]
    );
    return true;
  } catch (error) {
    console.error("Transaksi Error:", error);
    return false;
  }
};
