const db = require("../config/db");
const bcrypt = require("bcryptjs");
const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email and password are required",
      });
    }
    // User exists ?
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE name=? or EMAIL=?",
      [name, email],
    );
    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User exists please login",
      });
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user data to DB
    const sql = "INSERT INTO users (name, email,  password) VALUES (?, ?, ? )";
    await db.query(sql, [name, email, hashedPassword]);
    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user registarion error",
    });
  }
};

module.exports = { registerUsers };
