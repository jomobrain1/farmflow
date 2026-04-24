const express = require("express");
const { getUsersList } = require("../controllers/users.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getUsersList);

module.exports = router;
