const Enquiry = require('mongoose').model('Enquiry');

const showContactPage = (req, res) => {
  res.render('contact', { 
    success: null, 
    error: null,
    user: req.session.user || null
  });
};

const submitEnquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await Enquiry.create({ name, email, subject, message });
    res.render('contact', { 
      success: 'Your enquiry has been submitted successfully!',
      error: null,
      user: req.session.user || null
    });
  } catch (err) {
    console.error(err);
    res.render('contact', { 
      success: null,
      error: 'Something went wrong. Please try again.',
      user: req.session.user || null
    });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.render('admin-enquiries', { 
      enquiries,
      user: req.session.user || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading enquiries');
  }
};

module.exports = { showContactPage, submitEnquiry, getAllEnquiries };