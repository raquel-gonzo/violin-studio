
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
}, {timestamps: true});

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task;