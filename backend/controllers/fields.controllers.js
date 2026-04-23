const db = require("../config/db");
const sendResponse = require("../config/response");
const {
  INSERT_USER_SQL,
  INSERT_FIELD_SQL,
  GET_FIELDS_SQL,
  GET_SINGLE_FIELD_SQL,
  UPDATE_FIELD_SQL,
  DELETE_FIELD_SQL,
} = require("../config/sql");

// create field (admin)
const createField = async (req, res) => {
  try {
    const { name, crop_type, planting_date, current_stage, assigned_agent_id } =
      req.body;
    const user_id = req.user.id;
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
// Get all fields (admin)
const getAllFields = async (req, res) => {
  try {
    const [fields] = await db.query(GET_FIELDS_SQL);

    if (fields.length === 0) {
      return sendResponse(res, 404, false, "No fields found");
    }

    return res.json(fields);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error fetching fields");
  }
};

// update field
const updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, crop_type, planting_date, current_stage, assigned_agent_id } =
      req.body;

    const [fieldExists] = await db.query(GET_SINGLE_FIELD_SQL, [id]);
    console.log(fieldExists);

    if (fieldExists.length === 0) {
      return sendResponse(res, 404, false, "Field not found");
    }

    const existingField = fieldExists[0];

    const updatedName = name ?? existingField.name;
    const updatedCropType = crop_type ?? existingField.crop_type;
    const updatedPlantingDate = planting_date ?? existingField.planting_date;
    const updatedCurrentStage = current_stage ?? existingField.current_stage;
    const updatedAssignedAgentId =
      assigned_agent_id ?? existingField.assigned_agent_id;

    const [updatedField] = await db.query(UPDATE_FIELD_SQL, [
      updatedName,
      updatedCropType,
      updatedPlantingDate,
      updatedCurrentStage,
      updatedAssignedAgentId,
      id,
    ]);

    return sendResponse(
      res,
      200,
      true,
      "Field updated successfully!",
      updatedField,
    );
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error updating field");
  }
};

// delete field
const deleteField = async (req, res) => {
  try {
    const { id } = req.params;

    const [fieldExists] = await db.query(GET_SINGLE_FIELD_SQL, [id]);

    if (fieldExists.length === 0) {
      return sendResponse(res, 404, false, "Field not found");
    }

    const [deletedField] = await db.query(DELETE_FIELD_SQL, [id]);

    return res.status(200).json({
      success: true,
      message: "Field deleted successfully!",
      data: deletedField,
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error deleting field");
  }
};

module.exports = { createField, getAllFields, updateField, deleteField };
