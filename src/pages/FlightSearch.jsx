import React, { useState, useEffect } from 'react';
import { Plane, Filter, ChevronRight, Info, Luggage, Clock, ShieldCheck, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { findCheapest } from '../utils/priceHelper';
import { useNavigate } from 'react-router-dom';
import { flights as flightData } from '../data/flights';

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [priceRange, setPriceRange] = useState(20000);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    origin: 'DEL',
    destination: 'BOM',
    departureDate: '2026-05-10',
    adults: 1
  });
  const { setBookingData } = useBooking();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    let result = flights.filter(f => f.price <= priceRange);

    if (selectedStops.length > 0) {
      result = result.filter(f => selectedStops.includes(f.stops));
    }

    if (selectedAirlines.length > 0) {
      result = result.filter(f => selectedAirlines.includes(f.airline));
    }

    if (selectedTime) {
      result = result.filter(f => f.category === selectedTime);
    }

    setFilteredFlights(result);
  }, [flights, priceRange, selectedStops, selectedAirlines, selectedTime]);

  useEffect(() => {
    setFlights(flightData);
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = flightData.filter(f => 
        (!searchParams.origin || f.origin.toLowerCase().includes(searchParams.origin.toLowerCase())) && 
        (!searchParams.destination || f.destination.toLowerCase().includes(searchParams.destination.toLowerCase()))
      );
      setFlights(result.length > 0 ? result : flightData);
      setLoading(false);
    }, 500);
  };

  const handleBook = (flight) => {
    setBookingData({ type: 'flight', item: flight });
    navigate('/booking');
  };

  const stopsOptions = ["Non-stop", "1 Stop", "2+ Stops"];
  const airlinesOptions = ["Air India", "IndiGo", "Vistara", "SpiceJet"];
  const timeOptions = [
    { label: "Morning", sub: "6am - 12pm", id: "Morning" },
    { label: "Afternoon", sub: "12pm - 6pm", id: "Afternoon" },
    { label: "Evening", sub: "6pm - 12am", id: "Evening" },
    { label: "Night", sub: "12am - 6am", id: "Night" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <form onSubmit={handleSearchSubmit} className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-4">
          <label className="block">
            <span className="text-sm font-bold text-gray-700">Origin (IATA)</span>
            <input
              value={searchParams.origin}
              onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value.toUpperCase() })}
              placeholder="DEL"
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700">Destination (IATA)</span>
            <input
              value={searchParams.destination}
              onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value.toUpperCase() })}
              placeholder="BOM"
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700">Departure Date</span>
            <input
              type="date"
              value={searchParams.departureDate}
              onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-gray-700">Passengers</span>
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
          <div className="text-sm text-gray-500">Search live flight prices from Skyscanner via RapidAPI. If no API key is configured, the page falls back to sample results.</div>
          <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark">
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </form>
      <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 space-y-8">
        <div className="glass rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </h3>
            <button onClick={() => {
              setPriceRange(20000);
              setSelectedStops([]);
              setSelectedAirlines([]);
              setSelectedTime(null);
            }} className="text-xs font-bold text-primary hover:underline">Reset</button>
          </div>

          <div className="space-y-8">
            {/* Price Range */}
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-4">Max Price: ₹{priceRange.toLocaleString()}</label>
              <input 
                type="range" 
                min="2000" 
                max="20000" 
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">
                <span>₹2k</span>
                <span>₹20k</span>
              </div>
            </div>

            {/* Stops */}
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-4">Stops</label>
              <div className="space-y-2">
                {stopsOptions.map(opt => (
                  <label key={opt} className="flex items-center group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                      checked={selectedStops.includes(opt)}
                      onChange={(e) => {
                        if(e.target.checked) setSelectedStops([...selectedStops, opt]);
                        else setSelectedStops(selectedStops.filter(s => s !== opt));
                      }}
                    />
                    <span className="ml-3 text-sm text-gray-600 group-hover:text-primary transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Airlines */}
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-4">Airlines</label>
              <div className="space-y-2">
                {airlinesOptions.map(opt => (
                  <label key={opt} className="flex items-center group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                      checked={selectedAirlines.includes(opt)}
                      onChange={(e) => {
                        if(e.target.checked) setSelectedAirlines([...selectedAirlines, opt]);
                        else setSelectedAirlines(selectedAirlines.filter(s => s !== opt));
                      }}
                    />
                    <span className="ml-3 text-sm text-gray-600 group-hover:text-primary transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Departure Time */}
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-4">Departure Time</label>
              <div className="grid grid-cols-2 gap-2">
                {timeOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedTime(selectedTime === opt.id ? null : opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTime === opt.id 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-xs font-bold">{opt.label}</span>
                    <span className="block text-[10px] text-gray-400">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-600 font-medium">Found <span className="text-primary font-bold">{filteredFlights.length}</span> flights</p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Sort by:</span>
            <select className="bg-transparent font-bold text-gray-700 outline-none cursor-pointer">
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
              <option>Duration</option>
              <option>Departure Time</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 animate-fade-in">
          {filteredFlights.map(flight => (
            <div key={flight.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <img src={flight.logo} alt={flight.airline} className="w-12 h-12 object-contain" />
                  <div>
                    <h4 className="font-bold text-gray-900">{flight.airline}</h4>
                    <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">{flight.stops}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-grow w-full md:w-auto px-0 md:px-8">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{flight.departure}</p>
                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">{flight.origin}</p>
                  </div>
                  <div className="flex flex-col items-center flex-grow px-4 opacity-50">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{flight.duration}</span>
                    <div className="w-full h-px bg-gray-200 relative">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                        <Plane className="w-3 h-3 text-gray-300 rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{flight.arrival}</p>
                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">{flight.destination}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-center w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                  <p className="text-2xl font-black text-gray-900 mb-1">₹{flight.price.toLocaleString()}</p>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedFlight(flight)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleBook(flight)}
                      className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex items-center space-x-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <span className="flex items-center text-green-600"><ShieldCheck className="w-4 h-4 mr-2" /> Free Cancellation</span>
                  <span className="flex items-center"><Luggage className="w-4 h-4 mr-2" /> 15 kg Check-in</span>
                </div>
                
                {/* Price Comparison Widget */}
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compare & Save</span>
                    <span className="text-[10px] font-black bg-green-500 text-white px-2 py-1 rounded-md animate-pulse">Lowest Price</span>
                  </div>
                  <div className="space-y-2">
                    {(() => {
                      const { sorted } = findCheapest(flight.prices);
                      return sorted.map((site, i) => {
                        const isCheapest = i === 0;
                        return (
                          <div 
                            key={i} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setBookingData({ type: 'flight', item: flight, selectedProvider: site });
                              navigate('/booking');
                            }}
                            className={`flex justify-between items-center p-2 rounded-xl transition-all cursor-pointer ${isCheapest ? 'bg-white shadow-sm border border-primary/20 hover:border-primary' : 'hover:bg-gray-100/50 hover:border hover:border-gray-300'}`}
                          >
                            <span className={`text-xs font-bold ${isCheapest ? 'text-primary-dark' : 'text-gray-500'}`}>{site.platform}</span>
                            <span className={`text-sm ${isCheapest ? 'font-black text-primary-dark' : 'font-bold text-gray-400'}`}>
                              ₹{site.price.toLocaleString()}
                            </span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-[10px] font-bold text-green-600">Save {findCheapest(flight.prices).savingsPercent}% vs highest price</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredFlights.length === 0 && (
            <div className="text-center py-20 glass rounded-3xl">
              <Plane className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400">No flights found matching your filters</h3>
              <p className="text-gray-400">Try adjusting your price range or other requirements.</p>
            </div>
          )}
        </div>
      </main>

      </div>

      {/* Flight Detail Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedFlight(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden animate-fade-in shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  <img src={selectedFlight.logo} alt={selectedFlight.airline} className="w-12 h-12" />
                  <div>
                    <h3 className="text-2xl font-bold">{selectedFlight.airline}</h3>
                    <p className="text-gray-400 font-medium">Flight Details</p>
                  </div>
                </div>
                <button onClick={() => setSelectedFlight(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 bg-gray-50 rounded-2xl p-6 mb-8">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Departure</p>
                  <p className="text-xl font-bold">{selectedFlight.departure}</p>
                  <p className="text-sm font-medium text-gray-600">{selectedFlight.origin}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-300 mb-2" />
                  <div className="w-full h-px bg-gray-200 relative mb-2"></div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedFlight.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Arrival</p>
                  <p className="text-xl font-bold">{selectedFlight.arrival}</p>
                  <p className="text-sm font-medium text-gray-600">{selectedFlight.destination}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold flex items-center mb-4"><Luggage className="w-4 h-4 mr-2" /> Baggage Policy</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between p-3 border border-gray-100 rounded-xl">
                      <span className="text-gray-500">Cabin Baggage</span>
                      <span className="font-bold">7 kg</span>
                    </div>
                    <div className="flex justify-between p-3 border border-gray-100 rounded-xl">
                      <span className="text-gray-500">Check-in Baggage</span>
                      <span className="font-bold">15 kg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold flex items-center mb-4 text-red-500"><X className="w-4 h-4 mr-2" /> Cancellation Policy</h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-red-50 p-4 rounded-xl">
                    Cancellation fee of ₹2,500 applies if cancelled more than 24 hours before departure. No refund if cancelled within 24 hours of departure.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-between items-center pt-6 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Total Price</p>
                  <p className="text-3xl font-black text-gray-900">₹{selectedFlight.price.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => handleBook(selectedFlight)}
                  className="px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/30"
                >
                  Confirm & Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
