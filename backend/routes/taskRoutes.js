const express = require("express");
const router = express.Router();
const {getTaskList,
    addTaskList,
    editTaskList,
    deleteTaskList} = require("../controllers/taskControllers")

router.get("/tasks", getTaskList);
router.post("/tasks", addTaskList);
router.put("/tasks/:id", editTaskList);
router.delete("/tasks/:id", deleteTaskList);

module.exports = router;