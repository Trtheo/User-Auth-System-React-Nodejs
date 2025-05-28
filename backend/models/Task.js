const db = require('../db');

const createTask = (userId, title, callback) => {
  const query = `INSERT INTO tasks (title, user_id) VALUES (?, ?)`;
  db.run(query, [title, userId], function (err) {
    callback(err, this?.lastID);
  });
};

const getTasksByUser = (userId, callback) => {
  const query = `SELECT * FROM tasks WHERE user_id = ?`;
  db.all(query, [userId], callback);
};

const updateTask = (taskId, title, userId, callback) => {
  const query = `UPDATE tasks SET title = ? WHERE id = ? AND user_id = ?`;
  db.run(query, [title, taskId, userId], callback);
};

const deleteTask = (taskId, userId, callback) => {
  const query = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
  db.run(query, [taskId, userId], callback);
};

module.exports = {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
};
