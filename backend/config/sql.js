const USER_EXISTS_SQL = "SELECT * FROM users WHERE name = ? OR email = ?";
const INSERT_USER_SQL =
  "INSERT INTO users (name, email,  password) VALUES (?, ?, ? )";

const USER_LOGIN_EXIST_SQL = "SELECT * FROM users WHERE name=? OR email=?";

const USER_INFO_SQL = "SELECT id, name, email, role FROM users WHERE id = ?";
const USERS_LIST_SQL =
  "SELECT id, name, email, role, created_at FROM users ORDER BY name ASC";
const UPDATE_USER_SQL =
  "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
const DELETE_USER_SQL = "DELETE FROM users WHERE id = ?";

const INSERT_FIELD_SQL =
  "INSERT INTO fields (name, crop_type, planting_date, current_stage, assigned_agent_id, created_by) VALUES (?, ?, ?, ?, ?, ?)";

const GET_FIELDS_SQL = `
  SELECT
    fields.*,
    users.name AS assigned_agent_name
  FROM fields
  LEFT JOIN users ON fields.assigned_agent_id = users.id
  ORDER BY fields.id DESC
`;

const GET_RECENT_FIELDS_SQL = `
  SELECT
    fields.*,
    users.name AS assigned_agent_name
  FROM fields
  LEFT JOIN users ON fields.assigned_agent_id = users.id
  ORDER BY fields.id DESC
  LIMIT 6
`;

const GET_SINGLE_FIELD_SQL = `
  SELECT
    fields.*,
    users.name AS assigned_agent_name
  FROM fields
  LEFT JOIN users ON fields.assigned_agent_id = users.id
  WHERE fields.id = ?
`;

const UPDATE_FIELD_SQL = `
  UPDATE fields
  SET name = ?, crop_type = ?, planting_date = ?, current_stage = ?, assigned_agent_id = ?
  WHERE id = ?
`;

const INSERT_FIELD_UPDATE_SQL = `
  INSERT INTO field_updates (field_id, agent_id, stage, notes)
  VALUES (?, ?, ?, ?)
`;

const GET_FIELD_UPDATES_SQL = `
  SELECT
    field_updates.id,
    field_updates.field_id,
    fields.name AS field_name,
    field_updates.agent_id,
    users.name AS agent_name,
    field_updates.stage,
    field_updates.notes,
    field_updates.created_at
  FROM field_updates
  INNER JOIN fields ON field_updates.field_id = fields.id
  INNER JOIN users ON field_updates.agent_id = users.id
  ORDER BY field_updates.created_at DESC
`;

const DELETE_FIELD_SQL = `
  DELETE FROM fields WHERE id = ?
`;
module.exports = {
  USER_EXISTS_SQL,
  INSERT_USER_SQL,
  USER_LOGIN_EXIST_SQL,
  USER_INFO_SQL,
  USERS_LIST_SQL,
  UPDATE_USER_SQL,
  DELETE_USER_SQL,
  INSERT_FIELD_SQL,
  GET_FIELDS_SQL,
  GET_RECENT_FIELDS_SQL,
  GET_SINGLE_FIELD_SQL,
  UPDATE_FIELD_SQL,
  INSERT_FIELD_UPDATE_SQL,
  GET_FIELD_UPDATES_SQL,
  DELETE_FIELD_SQL,
};
