const dbPool = require("../config/database");

exports.insertTopupTransaction = async (
  userId,
  topUpAmount,
  transactionType,
  invoice_number
) => {
  try {
    const [result] = await dbPool.query(
      "INSERT INTO topup_transactions (users_id, top_up_amount, transaction_type, invoice_number, transaction_date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())",
      [userId, topUpAmount, transactionType, invoice_number]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error inserting topup transaction:", error);
    throw error;
  }
};

exports.getBalanceByUserId = async (userId) => {
  const [balanceResult] = await dbPool.query(
    "SELECT balance FROM balance WHERE user_id = ?",
    [userId]
  );
  return balanceResult[0].balance;
};
