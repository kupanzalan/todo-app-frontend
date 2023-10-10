let tasks = [{ taskId: 1, taskName: "Task 1", taskColor: "#55BCF6" }, 
  {taskId: 2, taskName: "Task 2", taskColor: "#FF5733" }, 
  {taskId: 3, taskName: "Task 3", taskColor: "#33FF55" }];

exports.getAllTasks = async (req, res) => {
  console.log(tasks);
  res.json(tasks);
};

exports.createTask = async (req, res) => {
};

exports.updateTask = async (req, res) => {
};

exports.deleteTask = async (req, res) => {
};