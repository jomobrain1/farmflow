const express = require("express");
const {
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getUsersList);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
