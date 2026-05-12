const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
require('./models/User');
require('./models/Event');
require('./models/Booking');
require('./models/Enquiry');

const app = express();

// View engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Database connection + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch(err => console.log(err));