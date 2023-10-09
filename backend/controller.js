// controllers/taskController.js
// const Task = require('../models/Task');

let tasks = [{ taskId: 1, taskName: "Task 1", taskColor: "#55BCF6" }, 
  {taskId: 2, taskName: "Task 2", taskColor: "#FF5733" }, 
  {taskId: 3, taskName: "Task 3", taskColor: "#33FF55" }];

exports.getAllTasks = async (req, res) => {
  // Retrieve tasks from the database and send them as a JSON response.
  console.log(tasks);
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  // Create a new task based on the request data and save it to the database.
};

exports.updateTask = async (req, res) => {
  // Update an existing task in the database.
};

exports.deleteTask = async (req, res) => {
  // Delete a task from the database.
};