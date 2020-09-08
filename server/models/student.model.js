const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    yearInSchool: Number,
    school: String,
    phone: Number
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;