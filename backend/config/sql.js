const USER_EXISTS_SQL = "SELECT * FROM users WHERE name = ? OR email = ?";
const INSERT_USER_SQL =
  "INSERT INTO users (name, email,  password) VALUES (?, ?, ? )";

const USER_LOGIN_EXIST_SQL = "SELECT * FROM users WHERE name=? OR email=?";

const USER_INFO_SQL = "SELECT id, name, email FROM users WHERE id = ?";

const INSERT_FIELD_SQL =
  "INSERT INTO fields (name, crop_type, planting_date, current_stage, assigned_agent_id, created_by) VALUES (?, ?, ?, ?, ?, ?)";

const GET_FIELDS_SQL = "SELECT * FROM fields";

const GET_SINGLE_FIELD_SQL = `
  SELECT * FROM fields WHERE id = ?
`;

const UPDATE_FIELD_SQL = `
  UPDATE fields
  SET name = ?, crop_type = ?, planting_date = ?, current_stage = ?, assigned_agent_id = ?
  WHERE id = ?
`;

const DELETE_FIELD_SQL = `
  DELETE FROM fields WHERE id = ?
`;
module.exports = {
  USER_EXISTS_SQL,
  INSERT_USER_SQL,
  USER_LOGIN_EXIST_SQL,
  USER_INFO_SQL,
  INSERT_FIELD_SQL,
  GET_FIELDS_SQL,
  GET_SINGLE_FIELD_SQL,
  UPDATE_FIELD_SQL,
  DELETE_FIELD_SQL,
};
