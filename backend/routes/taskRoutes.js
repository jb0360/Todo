const express = require("express");
const router = express.Router();
const {getTaskList,
    addTaskList} = require("../controllers/taskControllers")

router.get("/tasks", getTaskList);
router.post("/tasks", addTaskList);

module.exports = router;