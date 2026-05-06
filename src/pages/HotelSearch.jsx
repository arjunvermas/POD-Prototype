import React, { useState, useEffect } from 'react';
import {
  Hotel, Star, MapPin, Search, LayoutGrid, List, Filter,
  Wifi, Coffee, Car, Dumbbell, ShieldCheck, CheckCircle2, Users
} from 'lucide-react';
import { findCheapest } from '../utils/priceHelper';
import { useNavigate } from 'react-router-dom';
import { hotels as hotelData } from '../data/hotels';

const HotelSearch = () => {
  const [viewType, setViewType] = useState('grid');
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [familyFriendlyOnly, setFamilyFriendlyOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    city: 'Goa',
    checkInDate: '2026-05-10',
    checkOutDate: '2026-05-11',
    adults: 1
  });
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    let result = hotels.filter(h => h.price <= priceRange);

    if (selectedRating > 0) {
      result = result.filter(h => parseFloat(h.rating) >= selectedRating);
    }

    if (selectedAmenities.length > 0) {
      result = result.filter(h =>
        selectedAmenities.every(a => h.amenities?.includes(a))
      );
    }

    if (familyFriendlyOnly) {
      result = result.filter(h => h.familyFriendly);
    }

    setFilteredHotels(result);
  }, [hotels, priceRange, selectedRating, selectedAmenities, familyFriendlyOnly]);

  useEffect(() => {
    setHotels(hotelData);
  }, []);

  const handleHotelSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = hotelData.filter(h => 
        (!searchParams.city || h.location.toLowerCase().includes(searchParams.city.toLowerCase()) || h.name.toLowerCase().includes(searchParams.city.toLowerCase()))
      );
      setHotels(result.length > 0 ? result : hotelData);
      setLoading(false);
    }, 500);
  };

  const amenitiesList = [
    { name: "WiFi", icon: Wifi },
    { name: "Pool", icon: Coffee },
    { name: "Gym", icon: Dumbbell },
    { name: "Parking", icon: Car },
    { name: "Breakfast", icon: Coffee }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <form onSubmit={handleHotelSearch} className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-4">
          <label className="block">
            <span className="text-sm font-bold text-gray-700">City</span>
            <input
              value={searchParams.city}
              onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
              placeholder="Goa"
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700">Check-in</span>
            <input
              type="date"
              value={searchParams.checkInDate}
              onChange={(e) => setSearchParams({ ...searchParams, checkInDate: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700">Check-out</span>
            <input
              type="date"
              value={searchParams.checkOutDate}
              onChange={(e) => setSearchParams({ ...searchParams, checkOutDate: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700">Guests</span>
            <input
              type="number"
              min="1"
              value={searchParams.adults}
              onChange={(e) => setSearchParams({ ...searchParams, adults: Math.max(1, Number(e.target.value)) })}
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-gray-500">Search live hotel offers through the API proxy.</span>
          <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark">
            {loading ? 'Searching...' : 'Search Hotels'}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </form>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 space-y-8">
          <div className="glass rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </h3>

            <div className="space-y-8">
              {/* Price Range */}
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-4">Price per night: ₹{priceRange.toLocaleString()}</label>
                <input 
                  type="range" 
                  min="1000" 
                  max="50000" 
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Star Rating */}
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-4">Guest Rating</label>
                <div className="space-y-2">
                  {[4, 3, 2].map(star => (
                    <button 
                      key={star}
                      onClick={() => setSelectedRating(selectedRating === star ? 0 : star)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${
                        selectedRating === star ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100'
                      }`}
                    >
                      <span className="flex items-center">
                        <Star className={`w-4 h-4 mr-1 ${selectedRating === star ? 'fill-primary' : 'text-gray-300'}`} />
                        {star}+ Rating
                      </span>
                      <CheckCircle2 className={`w-4 h-4 ${selectedRating === star ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-4">Amenities</label>
                <div className="space-y-3">
                  {amenitiesList.map(item => (
                    <label key={item.name} className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox"
                        className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                        checked={selectedAmenities.includes(item.name)}
                        onChange={(e) => {
                          if(e.target.checked) setSelectedAmenities([...selectedAmenities, item.name]);
                          else setSelectedAmenities(selectedAmenities.filter(a => a !== item.name));
                        }}
                      />
                      <item.icon className="w-4 h-4 ml-3 text-gray-400 group-hover:text-primary" />
                      <span className="ml-2 text-sm text-gray-600 font-medium">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-4">Trip Safety</label>
                <button
                  type="button"
                  onClick={() => setFamilyFriendlyOnly(!familyFriendlyOnly)}
                  className={`w-full flex items-center justify-between rounded-xl border p-3 text-sm transition-all ${
                    familyFriendlyOnly ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-600'
                  }`}
                >
                  <span className="flex items-center font-bold">
                    <Users className="mr-2 h-4 w-4" />
                    Family friendly
                  </span>
                  <CheckCircle2 className={`h-4 w-4 ${familyFriendlyOnly ? 'opacity-100' : 'opacity-0'}`} />
                </button>
                <p className="mt-3 text-xs leading-5 text-gray-400">
                  Safety score highlights suitability for women and minors.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recommended Hotels</h2>
              <p className="text-sm text-gray-500 font-medium">Showing {filteredHotels.length} properties</p>
            </div>
            <div className="flex items-center bg-gray-50 p-1 rounded-xl">
              <button 
                onClick={() => setViewType('grid')}
                className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewType('list')}
                className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={`grid gap-8 ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {filteredHotels.map(hotel => (
              <div 
                key={hotel.id} 
                className={`bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden ${
                  viewType === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
                onClick={() => navigate(`/hotels/${hotel.id}`)}
              >
                <div className={`relative overflow-hidden ${viewType === 'list' ? 'md:w-72' : 'h-60'}`}>
                  <img 
                    src={`${hotel.image}&sig=${hotel.id}`} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-secondary text-secondary" />
                    <span className="text-xs font-bold">{hotel.rating}</span>
                  </div>
                  {hotel.verified && (
                    <div className="absolute top-4 right-4 bg-primary text-white p-1.5 rounded-full shadow-lg">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-gray-800 shadow-sm">
                    Safety {hotel.safetyScore}/100
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{hotel.name}</h3>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mb-4 font-medium">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      {hotel.location}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.familyFriendly && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-1 rounded-md">Family Friendly</span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 px-2 py-1 rounded-md">Women & Minors {hotel.safetyScore}/100</span>
                      {hotel.amenities.slice(0, 3).map(a => (
                        <span key={a} className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{a}</span>
                      ))}
                    </div>
                    
                    {/* Hotel Comparison */}
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50 mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compare & Save</span>
                        <span className="text-[10px] font-black bg-green-500 text-white px-2 py-1 rounded-md animate-pulse">Lowest Price</span>
                      </div>
                      <div className="space-y-2">
                        {(() => {
                          const { sorted } = findCheapest(hotel.prices);
                          return sorted.map((site, i) => {
                            const isCheapest = i === 0;
                            return (
                              <div 
                                key={i} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/hotels/${hotel.id}`, { state: { selectedProvider: site } });
                                }}
                                className={`flex justify-between items-center p-2 rounded-xl transition-all cursor-pointer ${isCheapest ? 'bg-white shadow-sm border border-primary/20 hover:border-primary' : 'hover:bg-gray-100/50 hover:border hover:border-gray-300'}`}
                              >
                                <span className={`text-xs font-bold ${isCheapest ? 'text-primary-dark' : 'text-gray-500'}`}>{site.platform}</span>
                                <span className={`text-sm ${isCheapest ? 'font-black text-primary-dark' : 'font-bold text-gray-400 line-through'}`}>
                                  ₹{site.price.toLocaleString()}
                                </span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-[10px] font-bold text-green-600">Save {findCheapest(hotel.prices).savingsPercent}% vs highest price</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Starts from</span>
                      <span className="text-2xl font-black text-gray-900">₹{hotel.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 font-medium"> /night</span>
                    </div>
                    <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all text-sm">
                      View Deals
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HotelSearch;
