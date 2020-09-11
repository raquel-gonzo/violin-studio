const Student = require('../models/student.model');

module.exports.createNewStudent = (req, res) => {
    Student.create(req.body)
        .then(newStudent => res.json({ student: newStudent }))
        .catch( err => res.json({ message: "Error: ", error: err}));
        // res.cookie("mycookie", "mydata", { httpOnly: true }).json({
        //     message: "This response has a cookie"
        //   });          
}

module.exports.saveTasks = (req, res) => {
    // hard coding rachel's id for now
    Student.findOneAndUpdate({ _id: "5f59a583f087a6279eddc55e" }, req.body, {new: true})
        .then(student => res.json({ tasks: student.tasks }))
        .catch(err => res.json({ message: "Error: ", error: err }))
}

module.exports.findAllStudents = (req, res) => {
    Student.find()
        .then(allStudents => res.json({ students: allStudents}))
        .catch(err => res.json({ message: "Something went wrong", error: err}))
}