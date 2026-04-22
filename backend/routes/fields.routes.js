const express = require("express");
const { createField } = require("../controllers/fields.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/create", auth, createField);
module.exports = router;
