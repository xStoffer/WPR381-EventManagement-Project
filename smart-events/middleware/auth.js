const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }

  next();
};


module.exports = {
  requireLogin,
  requireAdmin,
  isLoggedIn: requireLogin,
  isAdmin: requireAdmin
};