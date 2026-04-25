const express = require("express");
const cors = require("cors");
const { PORT, FRONTEND_URL } = require("./config/constants");
const app = express();
const usersRoutes = require("./routes/users.routes");
const agentsRoutes = require("./routes/agents.routes");
const fieldsRoutes = require("./routes/fields.routes");
const cookieParser = require("cookie-parser");
// Database connection

// Middlewares
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", usersRoutes);
app.use("/api/v1/agents", agentsRoutes);
app.use("/api/v1/fields", fieldsRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "Farm-Flow API",
    version: "v1",
    status: "Active",
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log("App is running in port", PORT);
  });
}

module.exports = app;
