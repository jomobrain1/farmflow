const db = require("../config/db");
const sendResponse = require("../config/response");
const {
  INSERT_USER_SQL,
  INSERT_FIELD_SQL,
  GET_FIELDS_SQL,
  GET_SINGLE_FIELD_SQL,
  UPDATE_FIELD_SQL,
  INSERT_FIELD_UPDATE_SQL,
  GET_FIELD_UPDATES_SQL,
  DELETE_FIELD_SQL,
} = require("../config/sql");

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const getFieldStatus = (field) => {
  if (field.current_stage === "Harvested") {
    return "Completed";
  }

  const plantingDate = new Date(field.planting_date);
  const today = new Date();
  const ageInDays = Math.floor((today - plantingDate) / DAY_IN_MS);

  if (
    (field.current_stage === "Planted" && ageInDays > 14) ||
    (field.current_stage === "Growing" && ageInDays > 45)
  ) {
    return "At Risk";
  }

  return "Active";
};

const withComputedStatus = (field) => ({
  ...field,
  status: getFieldStatus(field),
});

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
    const [createdField] = await db.query(INSERT_FIELD_SQL, [
      name,
      crop_type,
      planting_date,
      current_stage || "Planted",
      assigned_agent_id || null,
      req.user.id,
    ]);

    const [newFieldRows] = await db.query(GET_SINGLE_FIELD_SQL, [
      createdField.insertId,
    ]);

    return sendResponse(
      res,
      201,
      true,
      "Field created successfully!",
      withComputedStatus(newFieldRows[0]),
    );
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

    return res.json(fields.map(withComputedStatus));
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error fetching fields");
  }
};

// update field
const updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      crop_type,
      planting_date,
      current_stage,
      assigned_agent_id,
      notes,
    } = req.body;

    const [fieldExists] = await db.query(GET_SINGLE_FIELD_SQL, [id]);
    console.log(fieldExists);

    if (fieldExists.length === 0) {
      return sendResponse(res, 404, false, "Field not found");
    }

    const existingField = fieldExists[0];
    const isAdmin = req.user.role === "admin";
    const isAssignedAgent =
      Number(existingField.assigned_agent_id) === Number(req.user.id);

    if (!isAdmin && !isAssignedAgent) {
      return sendResponse(
        res,
        403,
        false,
        "Not authorized to update this field",
      );
    }

    const updatedName = name ?? existingField.name;
    const updatedCropType = crop_type ?? existingField.crop_type;
    const updatedPlantingDate = planting_date ?? existingField.planting_date;
    const updatedCurrentStage = current_stage ?? existingField.current_stage;
    const updatedAssignedAgentId =
      assigned_agent_id ?? existingField.assigned_agent_id;

    await db.query(UPDATE_FIELD_SQL, [
      updatedName,
      updatedCropType,
      updatedPlantingDate,
      updatedCurrentStage,
      updatedAssignedAgentId,
      id,
    ]);

    if (req.user.role === "agent") {
      await db.query(INSERT_FIELD_UPDATE_SQL, [
        id,
        req.user.id,
        updatedCurrentStage,
        notes || null,
      ]);
    }

    const [updatedFieldRows] = await db.query(GET_SINGLE_FIELD_SQL, [id]);

    return sendResponse(
      res,
      200,
      true,
      "Field updated successfully!",
      withComputedStatus(updatedFieldRows[0]),
    );
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error updating field");
  }
};

const getFieldUpdates = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return sendResponse(res, 403, false, "Not authorized");
    }

    const [updates] = await db.query(GET_FIELD_UPDATES_SQL);
    return res.json(updates);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error fetching field updates");
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

module.exports = {
  createField,
  getAllFields,
  updateField,
  getFieldUpdates,
  deleteField,
};
