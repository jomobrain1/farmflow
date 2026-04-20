const express = require("express");
const { PORT } = require("./config/constants");
const app = express();
// Database connection

// Middlewares
app.use(express.json());

// Start Server
app.listen(PORT, () => {
  console.log("App is running in port", PORT);
});
