import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  const setBookingData = (data) => {
    setCurrentBooking(data);
  };

  const confirmBooking = (details) => {
    const newBooking = {
      ...currentBooking,
      ...details,
      id: "BT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'upcoming',
      date: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);
    setCurrentBooking(null);
    return newBooking;
  };

  return (
    <BookingContext.Provider value={{ currentBooking, setBookingData, confirmBooking, bookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
