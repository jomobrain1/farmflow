const express = require("express");
const {
  registerUsers,
  loginUsers,
} = require("../controllers/users.controllers");
const router = express.Router();

// Users registrattion
router.post("/register", registerUsers);
router.post("/login", loginUsers);
module.exports = router;
