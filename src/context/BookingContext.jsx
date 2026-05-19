import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBookingState] = useState(() => {
    const saved = localStorage.getItem('currentBooking');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [bookings, setBookingsState] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const setBookingData = (data) => {
    setCurrentBookingState(data);
    if (data) localStorage.setItem('currentBooking', JSON.stringify(data));
    else localStorage.removeItem('currentBooking');
  };

  const confirmBooking = (details) => {
    const newBooking = {
      ...currentBooking,
      ...details,
      id: "BT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'upcoming',
      date: new Date().toISOString()
    };
    const newBookings = [...bookings, newBooking];
    setBookingsState(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings));
    
    setCurrentBookingState(null);
    localStorage.removeItem('currentBooking');
    
    return newBooking;
  };

  return (
    <BookingContext.Provider value={{ currentBooking, setBookingData, confirmBooking, bookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
