import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Hotel, Car, Package, Compass, User, LogOut, Menu, X, Bell, Utensils } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Flights', icon: Plane, path: '/flights' },
    { name: 'Hotels', icon: Hotel, path: '/hotels' },
    { name: 'Cabs', icon: Car, path: '/cabs' },
    { name: 'Restaurants', icon: Utensils, path: '/restaurants' },
    { name: 'Packages', icon: Package, path: '/packages' },
    { name: 'Trip Planner', icon: Compass, path: '/trip-planner' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                BookMyTrip
              </span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  <link.icon className="w-4 h-4 mr-1.5" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary transition-colors hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/my-trips" className="text-sm font-medium text-gray-700 hover:text-primary">
                  My Trips
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                    <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full border-2 border-primary" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-xl shadow-xl border border-gray-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all transform origin-top-right">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="w-4 h-4 mr-2" /> Profile
                    </Link>
                    <button onClick={logout} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary">Login</Link>
                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-all shadow-md hover:shadow-lg">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-gray-100 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="w-5 h-5 mr-3" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
