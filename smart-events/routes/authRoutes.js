const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const { showAuthPage, register, login, logout } = require('../controllers/authController');

//register and login routes with validation using express-validator, 
//ensuring that the input data meets the specified criteria before processing the request in the controller functions
router.get('/login', showAuthPage);
router.post('/register', 
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    register
);
router.post('/login',
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    login
);
router.get('/logout', logout);

module.exports = router;