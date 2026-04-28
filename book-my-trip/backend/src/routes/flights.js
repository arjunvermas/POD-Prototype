const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: '1', airline: { name: 'IndiGo', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=50&h=50&fit=crop' }, flightNumber: '6E-123', departure: { time: '10:00 AM' }, arrival: { time: '12:00 PM' }, duration: '2h 00m', stops: 0, price: { economy: 5000 } },
      { id: '2', airline: { name: 'Air India', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=50&h=50&fit=crop' }, flightNumber: 'AI-456', departure: { time: '02:00 PM' }, arrival: { time: '04:30 PM' }, duration: '2h 30m', stops: 1, price: { economy: 4500 } }
    ]
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, data: { id: req.params.id, airline: { name: 'IndiGo' }, price: { economy: 5000 } } });
});

module.exports = router;
