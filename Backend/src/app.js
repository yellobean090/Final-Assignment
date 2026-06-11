const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
const taskRoutes = require("./routes/taskRoutes");
const authenticateUser = require("./middleware/authMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.get(
  "/api/v1/protected",
  authenticateUser,
  (req, res) => {
    res.json({
      success: true,
      user: req.user
    });
  }
);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/auth", authRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
module.exports = app;