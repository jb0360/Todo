const mongoose = require("mongoose");

const taskSchemas = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
        required: true,
    },
    taskTitle:{
        type: String,
        required: true,
    },
    priority:{
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
        default: 'High'
    },
    progress:{
        type: String,
        enum: ["To Do", "In progress", "Done"],
        required: true,
        default: 'To Do'
    },
});

const TaskModel = mongoose.model("userTask", taskSchemas);
module.exports = TaskModel;