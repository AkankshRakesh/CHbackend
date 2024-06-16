const express = require('express');
const cors = require('cors');
const mongoDB = require('./db');
const createUserRoutes = require('./Routes/CreateUser');
const displayDataRoutes = require('./Routes/DisplayData');
const careerDataRoutes = require('./Routes/CareerData');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoDB();

// Middleware
app.use(cors()); // Using cors middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api', createUserRoutes);
app.use('/api', displayDataRoutes);
app.use('/api', careerDataRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
