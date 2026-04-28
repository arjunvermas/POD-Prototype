const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

router.get('/popular', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: '1', name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80', startingPrice: 15000 },
      { id: '2', name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80', startingPrice: 20000 }
    ]
  });
});

module.exports = router;
