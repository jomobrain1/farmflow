const express = require("express");
const {
  registerUsers,
  loginUsers,
  getCurrentUser,
} = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

// Users registrattion
router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.get("/me", auth, getCurrentUser);
module.exports = router;
