const USER_EXISTS_SQL = "SELECT * FROM users WHERE name = ? OR email = ?";
const INSER_USER_SQL =
  "INSERT INTO users (name, email,  password) VALUES (?, ?, ? )";
module.exports = {
  USER_EXISTS_SQL,
  INSER_USER_SQL,
};
