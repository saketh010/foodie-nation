const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const port = process.env.PORT || 6001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Configuration
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodie-nation-client.qret23b.mongodb.net/foodie-nation-client?retryWrites=true&w=majority&appName=foodie-nation-client`)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// JWT Token-Based Authentication
app.post('/jwt', async (req, res) => {
  const user = req.body;
  try {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Error generating token' });
  }
});

// Routes
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');

app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send("Hello Server");
});

// Server Listening
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
