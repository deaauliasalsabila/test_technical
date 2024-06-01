const dbPool = require("../config/database");

exports.getAllBanners = async () => {
  const SQLQuery = `SELECT banner_name, banner_image, description FROM banners`;
  const [rows] = await dbPool.execute(SQLQuery);
  return rows;
};
