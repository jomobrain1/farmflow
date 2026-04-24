const express = require("express");
const {
  registerUsers,
  loginUsers,
  getCurrentUser,
  logoutUser,
} = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

// Users registrattion
router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.post("/logout", logoutUser);
router.get("/me", auth, getCurrentUser);
module.exports = router;
