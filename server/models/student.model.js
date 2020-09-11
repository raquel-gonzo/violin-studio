const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [
            true,
            "First name is required"
        ]
    },
    lastName: {
        type: String,
        required: [
            true,
            "Last name is required"
        ]
    },
    yearInSchool: {
        type: String,
        required: [
            true,
            "Student's grade is required"
        ]
    },
    school: {
        type: String,
        required: [
            true,
            "School name is required"
        ]
    },
    phone: {
        type: Number,
        required: [
            true,
            "A phone number is required"
        ]
    },
    email: {
        type: String,
        required: [
            true, 
            "Email is required"
        ],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }          
    },
    password: {
        type: String,
        required: [
            true,
            "Password is required"
        ],
        minlength: [7, "Password must be at least 7 characters."]
    },
    tasks: {
        type: Array
    }
}, {timestamps: true });

const Student = mongoose.model("Student", StudentSchema);

StudentSchema.virtual('confirmPassword')
    .get( () => this.confirmPassword)
    .set( value => this.confirmPassword = value);

StudentSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        console.log("invalid");
        this.invalidate('confirmPassword', 'Passwords must match.')
    }
    console.log("pre validate hook called");
    next();
})

StudentSchema.pre('save', function(next) {
    console.log("pre save being called");
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        console.log("inside then block");
        console.log(hash);
        console.log(this.password);
        next();
    });
});

module.exports = Student;