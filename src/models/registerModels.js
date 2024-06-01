const dbPool = require("../config/database");
const bcrypt = require("bcryptjs");

exports.createNewUser = async (body) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const profileImage = body.profile_image || "default-profile.png";

  const SQLQuery = `INSERT INTO users (email, first_name, last_name, password, profile_image) 
                    VALUES (?, ?, ?, ?, ?)`;
  const values = [
    body.email,
    body.first_name,
    body.last_name,
    hashedPassword,
    profileImage,
  ];

  return dbPool.execute(SQLQuery, values);
};

exports.findUserByEmail = async (email) => {
  const SQLQuery = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await dbPool.execute(SQLQuery, [email]);
  return rows[0];
};
