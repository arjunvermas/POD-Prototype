const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: '1', name: 'Romantic Goa Getaway', destination: 'Goa', duration: { days: 5, nights: 4 }, price: { perPerson: 25000 }, images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80'] },
      { id: '2', name: 'Adventure in Manali', destination: 'Manali', duration: { days: 4, nights: 3 }, price: { perPerson: 18000 }, images: ['https://images.unsplash.com/photo-1605640840428-c16bc75ba739?w=500&q=80'] }
    ]
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, data: { id: req.params.id, name: 'Romantic Goa Getaway', destination: 'Goa', itinerary: [] } });
});

module.exports = router;
