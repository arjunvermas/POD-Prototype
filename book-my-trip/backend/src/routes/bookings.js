const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/create', protect, (req, res) => {
  res.status(201).json({ success: true, data: { bookingId: 'BMT-' + Math.floor(Math.random()*10000), ...req.body } });
});

router.get('/my-bookings', protect, (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

router.get('/:id', protect, (req, res) => {
  res.status(200).json({ success: true, data: { bookingId: req.params.id, status: 'confirmed' } });
});

module.exports = router;
