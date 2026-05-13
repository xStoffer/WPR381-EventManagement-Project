const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const { isLoggedIn, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllEvents);
router.get('/events/:id', getEventById);

// Admin only routes
router.get('/admin/events', isAdmin, getAdminEvents);
router.post('/admin/events/create', isAdmin, createEvent);
router.post('/admin/events/update/:id', isAdmin, updateEvent);
router.post('/admin/events/delete/:id', isAdmin, deleteEvent);

module.exports = router;