const app = require('express')();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://kingyuvi88:J6fyR8PyRkPTjEkA@cluster0.k0vl13e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
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

// Start the HTTP server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));