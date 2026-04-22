const USER_EXISTS_SQL = "SELECT * FROM users WHERE name = ? OR email = ?";
const INSERT_USER_SQL =
  "INSERT INTO users (name, email,  password) VALUES (?, ?, ? )";

const USER_LOGIN_EXIST_SQL = "SELECT * FROM users WHERE name=? OR email=?";

const USER_INFO_SQL = "SELECT id, name, email FROM users WHERE id = ?";

const INSERT_FIELD_SQL =
  "INSERT INTO fields (name, crop_type, planting_date, current_stage, assigned_agent_id, created_by) VALUES (?, ?, ?, ?, ?, ?)";
module.exports = {
  USER_EXISTS_SQL,
  INSERT_USER_SQL,
  USER_LOGIN_EXIST_SQL,
  USER_INFO_SQL,
  INSERT_FIELD_SQL,
};
