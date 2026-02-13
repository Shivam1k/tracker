const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/apps", require("./routes/apps"));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "API OK" });
});

module.exports = app;