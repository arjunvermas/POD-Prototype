import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Star, MapPin, Wifi, Coffee, Car, Dumbbell, ShieldCheck, 
  Check, Info, ChevronLeft, ChevronRight, Camera, User, 
  Calendar, CreditCard 
} from 'lucide-react';
import { hotels } from '../data/hotels';
import { useBooking } from '../context/BookingContext';
import { findCheapest } from '../utils/priceHelper';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find(h => h.id === parseInt(id));
  const { setBookingData } = useBooking();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const location = useLocation();
  const [selectedProvider, setSelectedProvider] = useState(location.state?.selectedProvider || null);

  if (!hotel) return <div className="text-center py-20">Hotel not found</div>;

  const roomTypes = [
    { id: 1, name: "Deluxe Garden View", price: hotel.price, size: "350 sqft", bed: "1 King Bed", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600" },
    { id: 2, name: "Premium Ocean View", price: hotel.price * 1.5, size: "450 sqft", bed: "1 Super King Bed", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600" },
    { id: 3, name: "Luxury Suite with Balcony", price: hotel.price * 2.5, size: "750 sqft", bed: "1 King Bed + Lounge", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600" },
  ];

  const handleBook = (room) => {
    setBookingData({ type: 'hotel', item: hotel, room: room, selectedProvider: selectedProvider || findCheapest(hotel.prices).cheapest });
    navigate('/booking');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Gallery */}
      <section className="relative h-[500px] bg-black">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 p-2">
          <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-l-3xl">
            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-tr-3xl">
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
          <div className="relative group cursor-pointer overflow-hidden">
            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-br-3xl">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
        </div>
        <button className="absolute bottom-6 right-6 glass px-6 py-2.5 rounded-full flex items-center space-x-2 font-bold text-sm hover:bg-white transition-colors">
          <Camera className="w-4 h-4" />
          <span>Show all photos</span>
        </button>
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-6 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Info */}
          <div className="flex-grow space-y-12">
            <div>
              <div className="flex items-center space-x-2 text-primary font-bold text-sm mb-4 tracking-widest uppercase">
                {hotel.type} • {hotel.verified && "Verified Property"}
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{hotel.name}</h1>
              <div className="flex items-center text-gray-500 font-medium space-x-6">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-primary" />
                  {hotel.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-secondary text-secondary" />
                  <span className="text-gray-900 font-bold mr-1">{hotel.rating}</span>
                  ({hotel.reviews} reviews)
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-primary" />
                  <span className="text-gray-900 font-bold mr-1">{hotel.safetyScore}/100</span>
                  safety for women and minors
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">About this property</h2>
              <p className="text-gray-600 leading-8 text-lg">
                {hotel.description} Located in the more vibrant part of the city, this property offers a perfect blend of modern luxury and traditional hospitality. Each room is designed with the traveler's comfort in mind, featuring high-end amenities and stunning views.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                <div className="flex items-center space-x-4">
                  <Wifi className="w-6 h-6 text-primary" />
                  <span className="font-medium">Free WiFi</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Coffee className="w-6 h-6 text-primary" />
                  <span className="font-medium">Breakfast Included</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Car className="w-6 h-6 text-primary" />
                  <span className="font-medium">Free Parking</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Dumbbell className="w-6 h-6 text-primary" />
                  <span className="font-medium">Gym Access</span>
                </div>
                {hotel.familyFriendly && (
                  <div className="flex items-center space-x-4">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <span className="font-medium">Family Friendly</span>
                  </div>
                )}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Room Options */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Select your room</h2>
              <div className="space-y-6">
                {roomTypes.map(room => (
                  <div key={room.id} className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm flex flex-col md:flex-row gap-8 hover:shadow-xl transition-shadow">
                    <div className="md:w-64 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={room.image} className="w-full h-full object-cover" alt={room.name} />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center"><Info className="w-4 h-4 mr-1" /> {room.size}</span>
                          <span className="flex items-center"><Info className="w-4 h-4 mr-1" /> {room.bed}</span>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm text-green-600 font-bold">
                            <Check className="w-4 h-4 mr-2" /> Free Cancellation before 24h
                          </li>
                          <li className="flex items-center text-sm text-gray-600 font-medium">
                            <Check className="w-4 h-4 mr-2" /> Instant Confirmation
                          </li>
                        </ul>
                      </div>
                      <div className="mt-6 flex justify-between items-center border-t border-gray-50 pt-4">
                        <div>
                          <span className="text-2xl font-black">₹{room.price.toLocaleString()}</span>
                          <span className="text-gray-400 text-sm font-bold"> + taxes / night</span>
                        </div>
                        <button 
                          onClick={() => handleBook(room)}
                          className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <aside className="w-full lg:w-96">
            <div className="sticky top-28 glass rounded-[2.5rem] border border-white p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Starting from</span>
                  <div className="flex items-end space-x-1">
                    <span className="text-3xl font-black">₹{hotel.price.toLocaleString()}</span>
                    <span className="text-gray-400 font-bold mb-1">/night</span>
                  </div>
                </div>
                <div className="bg-primary/5 p-3 rounded-2xl flex flex-col items-center">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-black text-primary text-sm mt-1">{hotel.rating}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center space-x-4">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Dates</label>
                    <span className="text-sm font-bold">Apr 24 - Apr 27</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center space-x-4">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Guests</label>
                    <span className="text-sm font-bold">2 Adults, 1 Room</span>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>₹{hotel.price.toLocaleString()} x 3 nights</span>
                  <span className="text-gray-900 font-bold">₹{(hotel.price * 3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Service fee</span>
                  <span className="text-gray-900 font-bold">₹850</span>
                </div>
                <div className="flex justify-between text-gray-900 text-lg font-black pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{(hotel.price * 3 + 850).toLocaleString()}</span>
                </div>
              </div>

              {/* Live Comparison Widget */}
              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 mb-8 shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compare Prices</span>
                  <span className="text-[10px] font-black bg-green-500 text-white px-2 py-1 rounded-md animate-pulse">Lowest Price</span>
                </div>
                <div className="space-y-2">
                  {(() => {
                    const { sorted, cheapest } = findCheapest(hotel.prices);
                    const currentSelection = selectedProvider || cheapest;
                    return sorted.map((site, i) => {
                      const isSelected = currentSelection.platform === site.platform;
                      const isCheapest = i === 0;
                      return (
                        <div 
                          key={i} 
                          onClick={() => setSelectedProvider(site)}
                          className={`flex justify-between items-center p-2 rounded-xl transition-all cursor-pointer ${isSelected ? 'bg-white shadow-sm border-2 border-primary' : 'bg-gray-50 border border-gray-100 hover:border-primary/50 hover:bg-white'}`}
                        >
                          <span className={`text-xs font-bold ${isSelected ? 'text-primary-dark' : 'text-gray-500'}`}>{site.platform}</span>
                          <span className={`text-sm ${isSelected ? 'font-black text-primary-dark' : (isCheapest ? 'font-bold text-gray-900' : 'font-bold text-gray-400 line-through')}`}>
                            ₹{site.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    });
                  })()}
                </div>
                <div className="mt-3 text-center p-2 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest block">Total Savings</span>
                  <span className="text-sm font-black text-green-700">₹{findCheapest(hotel.prices).savingsAmount.toLocaleString()} ({findCheapest(hotel.prices).savingsPercent}%)</span>
                </div>
              </div>

              <button 
                onClick={() => handleBook(roomTypes[0])}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-5 rounded-2xl font-black text-lg transition-all hover:shadow-2xl hover:scale-[1.02] shadow-xl shadow-primary/20"
              >
                Book Now
              </button>
              
              <p className="text-center text-xs text-gray-400 font-bold mt-4 uppercase tracking-[0.2em]">
                No credit card required yet
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
