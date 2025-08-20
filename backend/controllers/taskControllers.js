const TaskModel = require("../models/taskModel")

const getTaskList = async (req, res) =>{
    try {
        const todoData = await TaskModel.find();
        console.log("data:", todoData);

        res.status(200).json(todoData);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error"});
    }
}

module.exports = {
    getTaskList,
}