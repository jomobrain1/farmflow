const USER_EXISTS_SQL = "SELECT * FROM users WHERE name = ? OR email = ?";
const INSERT_USER_SQL =
  "INSERT INTO users (name, email,  password) VALUES (?, ?, ? )";

const USER_LOGIN_EXIST_SQL = "SELECT * FROM users WHERE name=? OR email=?";
module.exports = {
  USER_EXISTS_SQL,
  INSERT_USER_SQL,
  USER_LOGIN_EXIST_SQL,
};
