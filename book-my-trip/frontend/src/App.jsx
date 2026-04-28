import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Pages
import Home from './pages/Home';
import FlightSearch from './pages/FlightSearch';
import HotelSearch from './pages/HotelSearch';
import HotelDetail from './pages/HotelDetail';
import CabBooking from './pages/CabBooking';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import TripPlanner from './pages/TripPlanner';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import MyTrips from './pages/MyTrips';
import Profile from './pages/Profile';
import Support from './pages/Support';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
        <BookingProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flights" element={<FlightSearch />} />
                <Route path="/hotels" element={<HotelSearch />} />
                <Route path="/hotels/:id" element={<HotelDetail />} />
                <Route path="/cabs" element={<CabBooking />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:id" element={<PackageDetail />} />
                <Route path="/trip-planner" element={<TripPlanner />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/support" element={<Support />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BookingProvider>
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
