const Student = require('../models/student.model');

module.exports.createNewStudent = (req, res) => {
    Student.create(req.body)
        .then(newStudent => res.json({ student: newStudent }))
        .catch( err => res.json({ message: "Error: ", error: err}));
}