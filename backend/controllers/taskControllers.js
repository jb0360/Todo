const TaskModel = require("../models/taskModel")

const getTaskList = async (req, res) => {
    try {
        const todoData = await TaskModel.find();
        // console.log("data:", todoData);

        res.status(200).json(todoData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
}
const addTaskList = async (req, res) => {
    try {
        const { _id, taskTitle, priority, progress } = req.body;
        const newTask = new TaskModel({ id: _id, taskTitle, priority, progress });
        // console.log({_id, taskTitle, priority, progress});

        const savedTask = await newTask.save();
        //  console.log("savedTask: ", savedTask);
        res.status(200).json({
            message: "Added successfully.",
            task: savedTask
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

const editTaskList = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskTitle, priority, progress } = req.body;

        const task = await TaskModel.findById({_id: id});
        // console.log(id, task, taskTitle, priority, progress);
        if(!task){
            return res.status(404).json({message: "Task not found."});
        }
        if (taskTitle) task.taskTitle = taskTitle;
        if (priority) task.priority = priority;
        if (progress) task.progress = progress;

        await task.save();
        
        res.status(200).json({message: "Task edit successfully."});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

const deleteTaskList = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("id", id);        
        
        const deletedTask = await TaskModel.findByIdAndDelete({_id: id});
        if (!deletedTask) return res.status(404).json({ error: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
}

module.exports = {
    getTaskList,
    addTaskList,
    editTaskList,
    deleteTaskList
}