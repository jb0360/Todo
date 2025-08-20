const express = require("express");
const router = express.Router();
const {getTaskList,
    addTaskList,
    editTaskList} = require("../controllers/taskControllers")

router.get("/tasks", getTaskList);
router.post("/tasks", addTaskList);
router.put("/tasks/:id", editTaskList);

module.exports = router;