const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

router.post('/add', protect, (req, res) => {
  res.status(201).json({ success: true, message: 'Added to wishlist' });
});

router.delete('/:id', protect, (req, res) => {
  res.status(200).json({ success: true, message: 'Removed from wishlist' });
});

module.exports = router;
