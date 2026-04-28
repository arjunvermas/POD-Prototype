const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // Wait, let me just add basic stuff
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
// Add other routes here later

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/cabs', require('./routes/cabs'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/trip-planner', require('./routes/trip-planner'));

// Root route
app.get('/', (req, res) => {
  res.send('Book My Trip API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
