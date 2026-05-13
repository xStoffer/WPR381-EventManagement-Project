const express = require('express');
const router = express.Router();
const {
  bookTicket,
  getUserDashboard,
  getAdminDashboard,
  cancelBooking         
} = require('../controllers/bookingController');

const { isLoggedIn, isAdmin } = require('../middleware/auth');

// User dashboard
router.get('/dashboard', isLoggedIn, getUserDashboard);

// Book a ticket
router.post('/events/:id/book', isLoggedIn, bookTicket);

// Admin dashboard
router.get('/admin', isAdmin, getAdminDashboard);

// Cancel a booking
router.post('/bookings/:id/cancel', isLoggedIn, cancelBooking);

module.exports = router;