const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Show login/register page
const showAuthPage = (req, res) => {
  res.render('auth', { 
    error: null, 
    success: null,
    user: req.session.user || null
  });
};

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check passwords match
    if (password !== confirmPassword) {
      return res.render('auth', { 
        error: 'Passwords do not match',
        success: null,
        user: null
      });
    }

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth', { 
        error: errors.array().map(err => err.msg).join(', '),
        success: null,
        user: null
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('auth', { 
        error: 'An account with that email already exists',
        success: null,
        user: null
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // Set session
    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    res.redirect('/');

  } catch (err) {
    console.error(err);
    res.render('auth', { 
      error: 'Something went wrong. Please try again.',
      success: null,
      user: null
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('auth', { 
        error: 'Invalid email or password',
        success: null,
        user: null
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('auth', { 
        error: 'Invalid email or password',
        success: null,
        user: null
      });
    }

    // Set session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Redirect based on role
    if (user.role === 'admin') {
      res.redirect('/admin');
    } else {
      res.redirect('/');
    }

  } catch (err) {
    console.error(err);
    res.render('auth', { 
      error: 'Something went wrong. Please try again.',
      success: null,
      user: null
    });
  }
};

// Logout
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};

module.exports = { showAuthPage, register, login, logout };