const express = require("express");
const router = express.Router();
const {getTaskList} = require("../controllers/taskControllers")

router.get("/tasks", getTaskList);

module.exports = router;