const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    yearInSchool: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }          
    },
    password: {
        type: String,
        required: true,
    },
    tasks: {
        type: Array
    }
}, {timestamps: true });

module.exports = Student = mongoose.model("Student", StudentSchema);

module.exports = Student;