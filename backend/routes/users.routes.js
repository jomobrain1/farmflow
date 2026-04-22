const express = require("express");
const { registerUsers } = require("../controllers/users.controllers");
const router = express.Router();

// Users registrattion
router.post("/register", registerUsers);

module.exports = router;
