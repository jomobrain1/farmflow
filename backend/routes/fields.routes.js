const express = require("express");
const {
  createField,
  getAllFields,
  updateField,
  getFieldUpdates,
  deleteField,
} = require("../controllers/fields.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/create", auth, createField);
router.get("/", getAllFields);
router.get("/updates", auth, getFieldUpdates);
router.put("/update/:id", auth, updateField);
router.delete("/delete/:id", auth, deleteField);

module.exports = router;
