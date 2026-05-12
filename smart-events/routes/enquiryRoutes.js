const express = require('express');
const router = express.Router();

const {
  showContactPage,
  submitEnquiry,
  getAllEnquiries
} = require('../controllers/enquiryController');

const {
  requireAdmin
} = require('../middleware/auth');

// Contact page
router.get('/contact', showContactPage);

// Submit enquiry
router.post('/contact', submitEnquiry);

// Admin enquiries page
router.get('/admin/enquiries', requireAdmin, getAllEnquiries);

module.exports = router;