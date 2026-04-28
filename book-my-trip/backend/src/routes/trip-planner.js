const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/generate', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      itinerary: [
        { day: 1, activities: ['Arrival and check-in', 'Evening beach walk'] },
        { day: 2, activities: ['Local sightseeing', 'Dinner at popular restaurant'] }
      ]
    }
  });
});

router.post('/save', protect, (req, res) => {
  res.status(201).json({ success: true, message: 'Itinerary saved' });
});

module.exports = router;
