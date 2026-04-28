const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: '1', model: 'Toyota Innova', type: 'SUV', capacity: 6, basePrice: 2000, pricePerKm: 15, isAvailable: true },
      { id: '2', model: 'Honda City', type: 'Sedan', capacity: 4, basePrice: 1500, pricePerKm: 12, isAvailable: true }
    ]
  });
});

router.get('/popular-routes', (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

module.exports = router;
