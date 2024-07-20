const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const connectDB = require("./server/database/connection");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// const bodyparser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(cors());
mongoose.set("strictQuery", true);
dotenv.config({ path: "./server/database/.env" });
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

// Connect to MongoDB
connectDB();

// Load routes
app.use("/", require("./server/routes/router"));

// Start server
app.listen(PORT, () => {
  console.log(`Attendance Backend is running at http://localhost:${PORT}`);
});
