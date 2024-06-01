const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all routes

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://kingyuvi88:J6fyR8PyRkPTjEkA@cluster0.k0vl13e.mongodb.net/yourDatabaseName?retryWrites=true&w=majority")
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));

const User = require('./models/userModel');

// Define a route to handle POST requests to create a new user
app.post('/api/users', async (req, res) => {
  try {
    // Extract user data from request body
    const { email, password } = req.body;

    // Create a new user document
    const newUser = new User({ email, password });

    // Save the user document to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: err.message });
  }
});

// Define a route to handle GET requests to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Define a route to handle GET requests to fetch a specific user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Fetch user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the HTTP server
const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, () => console.log(`Server is running on port ${PORT}`));
