const db = require("../config/db");
const sendResponse = require("../config/response");
const { INSERT_USER_SQL, INSERT_FIELD_SQL } = require("../config/sql");

const createField = async (req, res) => {
  try {
    const { name, crop_type, planting_date, current_stage, assigned_agent_id } =
      req.body;
    const user_id = req.user;
    console.log(user_id);

    // Check the fields iF exist
    if (!name || !crop_type || !planting_date) {
      return sendResponse(
        res,
        400,
        false,
        "Field name, crop type, and planting date are needed",
      );
    }

    // Inseart new field into DB
    const field = await db.query(INSERT_FIELD_SQL, [
      name,
      crop_type,
      planting_date,
      current_stage || "Planted",
      assigned_agent_id || null,
      req.user.id,
    ]);

    return res.status(201).json({
      success: true,
      message: "Field created successfully!",
      data: field,
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error creating field");
  }
};

module.exports = { createField };
