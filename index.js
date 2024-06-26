const express = require('express');
const cors = require('cors');
const mongoDB = require('./db');
const createUserRoutes = require('./Routes/CreateUser');
const displayDataRoutes = require('./Routes/DisplayData');
const careerDataRoutes = require('./Routes/CareerData');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const apiUrl = "https://careerhunt.onrender.com";

// Connect to MongoDB
mongoDB();
const corsOptions = {
  origin: apiUrl
}
// Middleware
app.use(cors(corsOptions)); // Using cors middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api', createUserRoutes);
app.use('/api', displayDataRoutes);
app.use('/api', careerDataRoutes);

// Default route
app.get('/', (req, res) => {
  res.status(201).send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
