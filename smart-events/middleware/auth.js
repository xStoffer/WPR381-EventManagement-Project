// middleware/auth.js
// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  next();
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }

  next();
};

// Export middleware functions for use in routes
module.exports = {
  requireLogin,
  requireAdmin,
  isLoggedIn: requireLogin,
  isAdmin: requireAdmin
};