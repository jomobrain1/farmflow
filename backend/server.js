const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/constants");
const app = express();
const usersRoutes = require("./routes/users.routes");
const fieldsRoutes = require("./routes/fields.routes");
const cookieParser = require("cookie-parser");
// Database connection

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", usersRoutes);
app.use("/api/v1/fields", fieldsRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "Farm-Flow API",
    version: "v1",
    status: "Active",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log("App is running in port", PORT);
});
