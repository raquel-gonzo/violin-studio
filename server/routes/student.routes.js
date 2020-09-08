const StudentController = require("../controllers/student.controller");
const StudentController = require("../models/student.model");

module.exports = app => {
    app.post("/api/students/new", StudentController.createNewStudent);
}