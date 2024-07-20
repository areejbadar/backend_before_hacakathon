const express = require("express");
const route = express.Router();
const services = require("../controller/render");
const controller = require("../controller/controller");
const authenticate = require("../middleware/authenticate.js");
const authenticatestu = require("../middleware/authenticatestud.js");

// Render index page
route.get("/", (req, res) => {
  res.render(`index`);
});

// API Routes
// Add a new user
route.post("/api/users", controller.create);

// Find user details for login
route.post("/api/userf", controller.find);

// Get student details by subject and branch
route.get("/api/studdata/:subject/:branch", controller.findStudWithFeild);

// Get total number of classes
route.get("/api/classesddata/:subject/:branch", controller.totalnoofclasses);

// Check if a student is registered
route.post("/api/userstud", controller.findStud);

// Add a new student
route.post("/api/students", controller.stucreate);

// Record student absences
route.post("/api/absentstud", controller.AbsentDates);

// Update student or teacher data
route.put("/api/studdata/:id", controller.update);
route.put("/api/teacherdata/:id", controller.updateteacher);

// Get all dates for student absences
route.post("/api/alldates", controller.AllDates);

// After login: return user details
route.get("/aftertlogin", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// After student login: return student details
route.get("/afterslogin", authenticatestu, (req, res) => {
  res.send(req.rootUser);
});

// Store student grades
route.post("/gradepost", controller.gradeStore);

// Get student grades
route.get("/getgrade", controller.getgrades);

// Get login details of a student
route.get("/detailstloginusers/:email", controller.getstlogindetails);

// Get subjects a student is enrolled in
route.get("/checksubjects/:email", controller.getsubjectsenrolled);

// Forgot password: initiate reset
route.post("/forgotpassword", controller.forgotpassword);
route.get("/resetpassword/:id/:token", controller.resetpassword);

// Get student data for attendance
route.get("/api/getstuddata/:email", controller.findStudbyemail);

// Logout: clear cookie
route.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = route;

