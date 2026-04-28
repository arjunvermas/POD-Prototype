const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', (req, res) => res.status(200).json({ success: true, message: 'Logged out' }));

module.exports = router;
