const Task = require('../models/Task');

exports.createTask = (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  if (!title) return res.status(400).json({ error: 'Title is required' });

  Task.createTask(userId, title, (err, taskId) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: taskId, title });
  });
};

exports.getTasks = (req, res) => {
  const userId = req.user.id;

  Task.getTasksByUser(userId, (err, tasks) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(tasks);
  });
};

exports.updateTask = (req, res) => {
  const { title } = req.body;
  const taskId = req.params.id;
  const userId = req.user.id;

  Task.updateTask(taskId, title, userId, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task updated successfully' });
  });
};

exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  Task.deleteTask(taskId, userId, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted successfully' });
  });
};
