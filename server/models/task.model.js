
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},

    // who the tasks belong to
    studentId: {type: String, required: true}

}, {timestamps: true});

module.exports = Todo = mongoose.model("todo", todoSchema)