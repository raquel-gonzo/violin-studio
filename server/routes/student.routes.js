const StudentController = require("../controllers/student.controller");
const Student = require("../models/student.model");

module.exports = app => {
    app.get("/api/students/", StudentController.findAllStudents);
    app.post("/api/students/new", StudentController.createNewStudent);
}