const Student = require('../models/student.model');

module.exports.createNewStudent = (req, res) => {
    Student.create(req.body)
        .then(newStudent => res.json({ student: newStudent }))
        .catch( err => res.json({ message: "Error: ", error: err}));
}

module.exports.findAllStudents = (req, res) => {
    Student.find()
        .then(allStudents => res.json({ students: allStudents}))
        .catch(err => res.json({ message: "Something went wrong", error: err}))
}