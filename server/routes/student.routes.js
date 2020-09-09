const StudentController = require("../controllers/student.controller");

module.exports = app => {
    app.post("/api/students/new", StudentController.createNewStudent);
}