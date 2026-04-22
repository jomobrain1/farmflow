const express = require("express");
const {
  createField,
  getAllFields,
} = require("../controllers/fields.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/create", auth, createField);
router.get("/", getAllFields);
module.exports = router;
