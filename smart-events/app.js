const express = require('express'); //Express framework for building the server and handling routes
const mongoose = require('mongoose');//Mongoose for MongoDB object modeling and database connection
const session = require('express-session');
const cors = require('cors'); //controls the cross-origin resource sharing/requests
const rateLimit = require('express-rate-limit');//basic Dos protection
const {errorHandler} = require('./middleware/errorHandler');//centralized error handling
const { requestLogger, logger } = require('./middleware/logger');
const csrf = require('csurf');
require('dotenv').config(); //load environment variables from .env file

// Guard: fail loudly at startup if critical environment variables are missing
if (!process.env.MONGO_URI) {
  console.error('FATAL: MONGO_URI is not set in .env');
  process.exit(1);
}
if (!process.env.SESSION_SECRET) {
  console.error('FATAL: SESSION_SECRET is not set in .env');
  process.exit(1);
}

//Import Models
require('./models/User');
require('./models/Event');
require('./models/Booking');
require('./models/Enquiry');

// Import routes
const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// View engine
app.set('view engine', 'ejs');


// Middleware
app.use(cors({origin: true, credentials: true})); //Enable CORS for frontend-backend communication, allowing requests from the specified origin and including credentials like cookies
app.use(rateLimit({ //rate limiting to protect against DoS attacks, limiting the number of requests from a single IP address within a specified time window
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
// CSRF protection — must come after session
const csrfProtection = csrf();
app.use(csrfProtection);

// Make the CSRF token available in all EJS views automatically
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(requestLogger); //Centralized logging, capturing request details and errors in a consistent format for monitoring and debugging

// Routes
app.use('/auth', authRoutes);
app.use('/', enquiryRoutes);
app.use('/', eventRoutes);
app.use('/', bookingRoutes);

// Test route
// app.get('/', (req, res) => {
//   res.send('Server is running!');
// });
app.use(errorHandler); //Centralized error handling
// Database connection + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch(err => console.log(err));