const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: '1', name: 'Taj Mahal Palace', starRating: 5, pricePerNight: 15000, images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80'], amenities: ['WiFi', 'Pool'] },
      { id: '2', name: 'Oberoi Udaivilas', starRating: 5, pricePerNight: 20000, images: ['https://images.unsplash.com/photo-1542314831-c6a4d14d8373?w=500&q=80'], amenities: ['WiFi', 'Spa'] }
    ]
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, data: { id: req.params.id, name: 'Taj Mahal Palace', images: [], location: { city: 'Mumbai' } } });
});

router.get('/:id/rooms', (req, res) => {
  res.status(200).json({ success: true, data: [{ id: '101', name: 'Deluxe Room', pricePerNight: 15000, bedType: 'King' }] });
});

module.exports = router;
