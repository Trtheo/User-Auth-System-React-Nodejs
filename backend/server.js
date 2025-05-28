require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Route imports
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const passwordRoutes = require('./routes/password');



// Middleware
app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/password', passwordRoutes); 




// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
