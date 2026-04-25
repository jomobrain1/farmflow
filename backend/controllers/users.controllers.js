const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  USER_EXISTS_SQL,
  INSERT_USER_SQL,
  USER_LOGIN_EXIST_SQL,
  USER_INFO_SQL,
  USERS_LIST_SQL,
  UPDATE_USER_SQL,
  DELETE_USER_SQL,
} = require("../config/sql");
const sendResponse = require("../config/response");
const { JWT_SECRET, JWT_EXPIRES } = require("../config/constants");
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
    await db.query(INSERT_USER_SQL, [name, email, hashedPassword]);
    return sendResponse(res, 201, false, "User Registered Successfully!");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "user registarion error");
  }
};

// Login controller
const loginUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [users] = await db.query(USER_LOGIN_EXIST_SQL, [name, email]);
    console.log(users[0]);

    if (users.length == 0) {
      return sendResponse(res, 400, false, "Invalid User Details");
    }

    const user = users[0];
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return sendResponse(res, 400, false, "Invalid Password");
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
      ),
    });

    return res.status(201).json({
      success: true,
      message: "Login Successful!",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "user login error");
  }
};

// get current user
const getCurrentUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [users] = await db.query(USER_INFO_SQL, [user_id]);

    if (users.length === 0) {
      return sendResponse(res, 404, false, "User not found");
    }

    return res.json(users[0]);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Server error");
  }
};

const getUsersList = async (req, res) => {
  try {
    const [users] = await db.query(USERS_LIST_SQL);
    return res.json(users);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error fetching users");
  }
};

const getUserById = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return sendResponse(res, 403, false, "Not authorized");
    }

    const { id } = req.params;
    const [users] = await db.query(USER_INFO_SQL, [id]);

    if (users.length === 0) {
      return sendResponse(res, 404, false, "User not found");
    }

    return res.json(users[0]);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error fetching user");
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return sendResponse(res, 403, false, "Not authorized");
    }

    const { id } = req.params;
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return sendResponse(res, 400, false, "Name, email and role are required");
    }

    await db.query(UPDATE_USER_SQL, [name, email, role, id]);
    return sendResponse(res, 200, true, "User updated successfully");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error updating user");
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return sendResponse(res, 403, false, "Not authorized");
    }

    const { id } = req.params;

    if (Number(id) === Number(req.user.id)) {
      return sendResponse(res, 400, false, "You cannot delete your own account");
    }

    await db.query(DELETE_USER_SQL, [id]);
    return sendResponse(res, 200, true, "User deleted successfully");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Error deleting user");
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });

    return sendResponse(res, 200, true, "Logout successful");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, false, "Logout error");
  }
};

module.exports = {
  registerUsers,
  loginUsers,
  getCurrentUser,
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
};
