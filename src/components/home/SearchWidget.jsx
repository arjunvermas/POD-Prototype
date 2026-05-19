import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Car, Package, Search, Utensils, MapPin } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  
  const { searchParams, updateSearchParams } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/${activeTab}`);
  };

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'cabs', label: 'Cabs', icon: Car },
  ];

  const cityLocations = [
    "Delhi (DEL)",
    "Bombay (BOM)",
    "Bangalore (BLR)",
    "Chennai (MAA)",
    "Kolkata (CCU)",
    "Hyderabad (HYD)",
    "Goa (GOI)",
    "Pune (PNQ)",
    "Ahmedabad (AMD)",
    "Jaipur (JAI)"
  ];

  const cabLocations = [
    "Indira Gandhi International Airport (DEL)",
    "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    "Kempegowda International Airport (BLR)",
    "Gurgaon Cyber City",
    "South Mumbai",
    "Electronic City, Bangalore",
    "Hitech City, Hyderabad",
    "Salt Lake City, Kolkata",
    "Baga Beach, Goa",
    "Connaught Place, Delhi",
    "Koramangala, Bangalore",
    "Panjim, Goa",
    "T. Nagar, Chennai",
    "Koregaon Park, Pune",
    "Ashram Road, Ahmedabad",
    "C-Scheme, Jaipur"
  ];

  const currentLocations = activeTab === 'cabs' ? cabLocations : cityLocations;

  const filteredOrigins = currentLocations.filter(loc => loc.toLowerCase().includes((searchParams.origin || '').toLowerCase()));
  const filteredDests = currentLocations.filter(loc => loc.toLowerCase().includes((searchParams.destination || '').toLowerCase()));

  return (
    <div className="w-full max-w-5xl mx-auto glass rounded-3xl shadow-2xl p-6 md:p-8 transform -translate-y-12 animate-fade-in">
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className={`grid grid-cols-1 md:grid-cols-2 ${(activeTab === 'hotels' || activeTab === 'cabs') ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} gap-6`}>
        {activeTab === 'hotels' ? (
          <>
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Where to?</label>
              <input
                type="text"
                placeholder="Destination City"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                value={searchParams.city || searchParams.destination || ''}
                onChange={(e) => updateSearchParams({ city: e.target.value, destination: e.target.value })}
                onFocus={() => setShowDestSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
              />
              {showDestSuggestions && filteredDests.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {filteredDests.map((loc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        updateSearchParams({ city: loc, destination: loc });
                        setShowDestSuggestions(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{loc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Check-in</label>
              <input
                type="date"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                value={searchParams.checkInDate || searchParams.date || ''}
                onChange={(e) => updateSearchParams({ checkInDate: e.target.value, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Check-out</label>
              <input
                type="date"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                value={searchParams.checkOutDate || searchParams.returnDate || ''}
                onChange={(e) => updateSearchParams({ checkOutDate: e.target.value, returnDate: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-5 h-5" />
                <span>Search Hotels</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">From</label>
              <input
                type="text"
                placeholder={activeTab === 'cabs' ? 'Origin Place' : 'Origin City'}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                value={searchParams.origin || ''}
                onChange={(e) => updateSearchParams({ origin: e.target.value })}
                onFocus={() => setShowOriginSuggestions(true)}
                onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
              />
              {showOriginSuggestions && filteredOrigins.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {filteredOrigins.map((loc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        updateSearchParams({ origin: loc });
                        setShowOriginSuggestions(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{loc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">To</label>
              <input
                type="text"
                placeholder={activeTab === 'cabs' ? 'Destination Place' : 'Destination City'}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                value={searchParams.destination || ''}
                onChange={(e) => updateSearchParams({ destination: e.target.value })}
                onFocus={() => setShowDestSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
              />
              {showDestSuggestions && filteredDests.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                  {filteredDests.map((loc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        updateSearchParams({ destination: loc });
                        setShowDestSuggestions(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{loc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Depart</label>
              <input
                type="date"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                value={searchParams.date || ''}
                onChange={(e) => updateSearchParams({ date: e.target.value })}
              />
            </div>
            {activeTab !== 'cabs' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Return</label>
                <input
                  type="date"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  value={searchParams.returnDate || ''}
                  onChange={(e) => updateSearchParams({ returnDate: e.target.value })}
                />
              </div>
            )}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-5 h-5" />
                <span>Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SearchWidget;
