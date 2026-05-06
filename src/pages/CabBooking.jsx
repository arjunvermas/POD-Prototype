import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, MapPin, Calendar, Clock, Search, ChevronRight, 
  Users, Briefcase, ShieldCheck, CheckCircle2, Star, Zap
} from 'lucide-react';
import { cabs, recentRoutes } from '../data/cabs';
import { useBooking } from '../context/BookingContext';
import { findCheapest } from '../utils/priceHelper';

const CabBooking = () => {
  const [activeTab, setActiveTab] = useState('airport');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedRideClass, setSelectedRideClass] = useState('all');
  const [formNotice, setFormNotice] = useState('');
  const { setBookingData } = useBooking();
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = (e) => {
    e.preventDefault();
    setPickup(current => current || locations[0]);
    setDrop(current => current || locations[3]);
    setDate(current => current || today);
    setTime(current => current || '10:00');
    setFormNotice(pickup && drop && date && time ? '' : 'Showing cab options with default route details. You can adjust them anytime.');
    setShowResults(true);
  };

  const getBookingDetails = () => ({
    pickup: pickup || locations[0],
    drop: drop || locations[3],
    date: date || today,
    time: time || '10:00',
    serviceType: activeTab
  });

  const handleBook = (cab, provider = null) => {
    setBookingData({ 
      type: 'cab', 
      item: cab, 
      details: getBookingDetails(),
      selectedProvider: provider || findCheapest(cab.prices).cheapest
    });
    navigate('/booking');
  };

  const handleRouteSelect = (route) => {
    setPickup(route.pickup || route.from);
    setDrop(route.drop || route.to);
    setDate(today);
    setTime('10:00');
    setSelectedRideClass('all');
    setFormNotice(`Showing rides for ${route.from} to ${route.to}.`);
    setShowResults(true);
  };

  const locations = [
    "Indira Gandhi International Airport (DEL)",
    "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    "Kempegowda International Airport (BLR)",
    "Gurgaon Cyber City",
    "South Mumbai",
    "Electronic City, Bangalore",
    "Hitech City, Hyderabad",
    "Salt Lake City, Kolkata"
  ];

  const rideFilters = [
    { id: 'all', label: 'All rides' },
    { id: 'fastest', label: 'Fastest' },
    { id: 'economy', label: 'Economy' },
    { id: 'premiere', label: 'Premiere' },
    { id: 'slowest', label: 'Slowest' }
  ];

  const displayedCabs = cabs.filter(cab => selectedRideClass === 'all' || cab.rideClass === selectedRideClass);

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 animate-fade-in">
            Reliable Rides <span className="text-primary-light">Every Time</span>
          </h1>
          <p className="text-indigo-100 text-lg mb-12 max-w-2xl mx-auto">
            Doorstep pickup, professional drivers, and zero surprises on pricing.
          </p>
          
          <div className="max-w-5xl mx-auto glass rounded-[2.5rem] p-4 shadow-2xl relative">
            <div className="flex space-x-2 mb-6 p-1 bg-white/10 w-fit rounded-2xl mx-auto">
              <button 
                onClick={() => setActiveTab('airport')}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'airport' ? 'bg-white text-indigo-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
              >
                Airport Transfer
              </button>
              <button 
                onClick={() => setActiveTab('local')}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'local' ? 'bg-white text-indigo-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
              >
                Local Rentals
              </button>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-1 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 group focus-within:bg-white focus-within:border-white transition-all">
                <MapPin className="w-5 h-5 text-primary group-focus-within:text-indigo-900" />
                <div className="flex-grow text-left">
                  <label className="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest group-focus-within:text-gray-400">Pickup</label>
                  <select 
                    className="w-full bg-transparent text-white group-focus-within:text-gray-900 focus:outline-none font-bold text-sm"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  >
                    <option value="" className="text-gray-400">Where from?</option>
                    {locations.map(loc => <option key={loc} value={loc} className="text-gray-900">{loc}</option>)}
                  </select>
                </div>
              </div>

              <div className="lg:col-span-1 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 group focus-within:bg-white focus-within:border-white transition-all">
                <MapPin className="w-5 h-5 text-secondary group-focus-within:text-indigo-900" />
                <div className="flex-grow text-left">
                  <label className="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest group-focus-within:text-gray-400">Drop</label>
                  <select 
                    className="w-full bg-transparent text-white group-focus-within:text-gray-900 focus:outline-none font-bold text-sm"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                  >
                    <option value="" className="text-gray-400">Where to?</option>
                    {locations.map(loc => <option key={loc} value={loc} className="text-gray-900">{loc}</option>)}
                  </select>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 group focus-within:bg-white focus-within:border-white transition-all">
                <Calendar className="w-5 h-5 text-white/50 group-focus-within:text-indigo-900" />
                <div className="flex-grow text-left">
                  <label className="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest group-focus-within:text-gray-400">Date</label>
                  <input 
                    type="date"
                    className="w-full bg-transparent text-white group-focus-within:text-gray-900 focus:outline-none font-bold text-sm"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 group focus-within:bg-white focus-within:border-white transition-all">
                <Clock className="w-5 h-5 text-white/50 group-focus-within:text-indigo-900" />
                <div className="flex-grow text-left">
                  <label className="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest group-focus-within:text-gray-400">Time</label>
                  <input 
                    type="time"
                    className="w-full bg-transparent text-white group-focus-within:text-gray-900 focus:outline-none font-bold text-sm"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="lg:col-span-1 bg-primary text-white h-full rounded-2xl font-black text-lg transition-all hover:bg-primary-dark hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 flex items-center justify-center"
              >
                <Search className="w-6 h-6" />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-indigo-100">
              <span>Compare Ola, Uber, and Rapido instantly.</span>
              <button
                type="button"
                onClick={() => {
                  setFormNotice('Showing all cab categories with sample route details.');
                  setShowResults(true);
                }}
                className="rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
              >
                Browse all cabs
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {showResults ? (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Options</h2>
                <p className="text-gray-500 font-medium font-sm">Best live-style fares across Ola, Uber, and Rapido</p>
                {formNotice && <p className="mt-2 text-sm font-bold text-primary">{formNotice}</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {rideFilters.map(filter => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setSelectedRideClass(filter.id)}
                  className={`rounded-2xl border px-5 py-3 text-sm font-bold transition-all ${
                    selectedRideClass === filter.id
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                      : 'border-gray-100 bg-white text-gray-600 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {displayedCabs.map(cab => {
                const cheapest = findCheapest(cab.prices).cheapest;
                return (
                <div key={cab.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                  <div className="h-48 relative overflow-hidden bg-gray-50 p-6">
                    <img src={cab.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={cab.model} />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {cab.type}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{cab.model}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400 font-bold uppercase tracking-widest">
                          <span className="flex items-center"><Users className="w-4 h-4 mr-1 text-primary" /> {cab.capacity}</span>
                          <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-primary" /> 2 Bags</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                          <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-yellow-700">
                            <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" /> {cab.rating}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                            <Zap className="mr-1 h-3 w-3" /> {cab.eta}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {cab.features.map(f => (
                        <li key={f} className="flex items-center text-sm text-gray-600 font-medium">
                          <CheckCircle2 className="w-4 h-4 mr-3 text-green-500" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Cab Comparison */}
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50 mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ola vs Uber vs Rapido</span>
                        <span className="text-[10px] font-black bg-green-500 text-white px-2 py-1 rounded-md animate-pulse">Best Price</span>
                      </div>
                      <div className="space-y-2">
                        {(() => {
                          const { sorted } = findCheapest(cab.prices);
                          return sorted.map((site, i) => {
                            const isCheapest = i === 0;
                            return (
                              <div 
                                key={i} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setBookingData({ 
                                    type: 'cab', 
                                    item: cab, 
                                    details: getBookingDetails(),
                                    selectedProvider: site
                                  });
                                  navigate('/booking');
                                }}
                                className={`flex justify-between items-center p-2 rounded-xl transition-all cursor-pointer ${isCheapest ? 'bg-white shadow-sm border border-primary/20 hover:border-primary' : 'hover:bg-gray-100/50 hover:border hover:border-gray-300'}`}
                              >
                                <span className={`text-xs font-bold ${isCheapest ? 'text-primary-dark' : 'text-gray-500'}`}>Book via {site.platform}</span>
                                <span className={`text-sm ${isCheapest ? 'font-black text-primary-dark' : 'font-bold text-gray-400 line-through'}`}>
                                  ₹{site.price.toLocaleString()}
                                </span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-[10px] font-bold text-green-600">Best: {cheapest.platform} saves {findCheapest(cab.prices).savingsPercent}% vs highest price</span>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-3 gap-2">
                      {findCheapest(cab.prices).sorted.map(site => (
                        <button
                          key={site.platform}
                          type="button"
                          onClick={() => handleBook(cab, site)}
                          className="rounded-xl border border-gray-100 px-2 py-2 text-[11px] font-black text-gray-600 transition-all hover:border-primary hover:bg-primary hover:text-white"
                        >
                          {site.platform}
                        </button>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Fare</div>
                        <span className="text-3xl font-black text-gray-900">₹{cheapest.price.toLocaleString()}</span>
                        <div className="text-xs font-bold text-primary mt-1">via {cheapest.platform}</div>
                      </div>
                      <button 
                        onClick={() => handleBook(cab, cheapest)}
                        className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold transition-all hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                      >
                        Book Best
                      </button>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-24">
            {/* Recently Booked Routes */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Routes</h2>
                <p className="text-gray-500">Fast and frequent routes booked by our travelers.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentRoutes.map(route => (
                  <div key={route.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group border-b-4 border-b-transparent hover:border-b-primary transition-all">
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Car className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-2xl font-black text-gray-900">₹{route.price}</span>
                    </div>
                    <div className="space-y-4 relative">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-bold text-gray-900">{route.from}</span>
                      </div>
                      <div className="absolute left-1 top-2 bottom-2 w-px border-l-2 border-dashed border-gray-200"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span className="text-sm font-bold text-gray-900">{route.to}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRouteSelect(route)}
                      className="w-full mt-8 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center group"
                    >
                      <span>Book Now</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Why choose us */}
            <section className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl -mr-48 -mt-48"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-extrabold mb-8 leading-tight">The Best Ride-Hailing Experience For Your Travels</h2>
                  <div className="space-y-8">
                    {[
                      { icon: ShieldCheck, title: "Verified Drivers", desc: "Every driver undergoes a comprehensive background check and training." },
                      { icon: Clock, title: "On-time Guarantee", desc: "If we're more than 15 minutes late, your next ride is on us." },
                      { icon: CheckCircle2, title: "Zero Surprises", desc: "No hidden charges. The fare you see is the fare you pay." },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-primary-light" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block">
                  <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000" className="rounded-[2.5rem] shadow-2xl rotate-3 scale-110" alt="Cab" />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default CabBooking;
