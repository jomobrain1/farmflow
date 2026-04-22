const express = require("express");
const { PORT } = require("./config/constants");
const app = express();
const usersRoutes = require("./routes/users.routes");
// Database connection

// Middlewares
app.use(express.json());
app.use("/api/v1/auth", usersRoutes);

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
