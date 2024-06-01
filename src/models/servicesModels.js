const dbPool = require("../config/database");

exports.getServices = async () => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM services");
    return rows;
  } catch (error) {
    throw error;
  }
};

exports.getServiceTarif = async (service_code) => {
  try {
    const [rows] = await dbPool.query(
      "SELECT service_name, service_tarif FROM services WHERE service_code = ?",
      [service_code]
    );
    return rows.length > 0 ? rows[0] : null; // Mengembalikan objek service jika ditemukan, atau null jika tidak ditemukan
  } catch (error) {
    throw error;
  }
};
