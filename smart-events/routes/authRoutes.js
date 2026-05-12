const express = require('express');
const router = express.Router();
const { showAuthPage, register, login, logout } = require('../controllers/authController');

router.get('/login', showAuthPage);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;