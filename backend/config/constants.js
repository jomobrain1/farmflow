require("dotenv").config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

module.exports = { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE };
