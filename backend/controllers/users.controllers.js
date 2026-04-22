const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { USER_EXISTS_SQL, INSER_USER_SQL } = require("../config/sql");
const sendResponse = require("../config/response");
const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendResponse(res, 400, false, "Name, Email and Password required");
    }
    // User exists ?
    const [exists] = await db.query(USER_EXISTS_SQL, [name, email]);
    if (exists.length > 0) {
      return sendResponse(res, 400, false, "User exists please login");
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user data to DB
    await db.query(INSER_USER_SQL, [name, email, hashedPassword]);
    return sendResponse(res, 201, false, "User Registered Successfully!");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 201, false, "user registarion error");
  }
};

module.exports = { registerUsers };
