const express = require("express");
const {
  createField,
  getAllFields,
  updateField,
  deleteField,
} = require("../controllers/fields.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/create", auth, createField);
router.get("/", getAllFields);
router.put("/update/:id", auth, updateField);
router.delete("/delete/:id", auth, deleteField);

module.exports = router;
