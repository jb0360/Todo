const TaskModel = require("../models/taskModel")

const getTaskList = async (req, res) =>{
    try {
        const todoData = await TaskModel.find();
        // console.log("data:", todoData);

        res.status(200).json(todoData);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error"});
    }
}
const addTaskList = async (req, res) =>{
    try {
        const {_id, taskTitle, priority, progress} = req.body;
        const newTask = new TaskModel({id: _id, taskTitle, priority, progress});
        // console.log({_id, taskTitle, priority, progress});

        const savedTask = await newTask.save();
        //  console.log("savedTask: ", savedTask);
         res.status(200).json({
            message: "Added successfully.",
            task: savedTask
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error});
    }
}

module.exports = {
    getTaskList,
    addTaskList,
}