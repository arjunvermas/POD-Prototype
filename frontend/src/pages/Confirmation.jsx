import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, Download, Plane, Hotel, Car, 
  Package, Calendar, MapPin, ArrowRight, Share2,
  Sparkles, Home, CreditCard
} from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-black mb-4">No booking information found</h2>
        <Link to="/" className="text-primary font-bold hover:underline">Return to Home</Link>
      </div>
    );
  }

  const { type, item, id, costs, details, room } = booking;

  const getIcon = () => {
    switch (type) {
      case 'flight': return <Plane className="w-10 h-10" />;
      case 'hotel': return <Hotel className="w-10 h-10" />;
      case 'cab': return <Car className="w-10 h-10" />;
      case 'package': return <Package className="w-10 h-10" />;
      default: return <Sparkles className="w-10 h-10" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'flight': return 'bg-blue-500';
      case 'hotel': return 'bg-teal-500';
      case 'cab': return 'bg-orange-500';
      case 'package': return 'bg-purple-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-24 px-4 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-24 h-24 bg-green-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-500/20 scale-110">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Booking Confirmed!</h1>
          <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
            Your adventure is officially on the calendar. We've sent the confirmation details to your email.
          </p>
        </div>

        {/* E-Ticket Card */}
        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-gray-200 overflow-hidden relative border border-gray-100 flex flex-col md:flex-row mb-12 animate-fade-in delay-100">
          <div className={`md:w-16 ${getColor()} flex items-center justify-center text-white py-8 md:py-0`}>
            <div className="md:-rotate-90 whitespace-nowrap uppercase font-black tracking-[0.5em] text-sm opacity-80">
              BOARDING PASS
            </div>
          </div>

          <div className="flex-grow p-10 md:p-16">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Booking ID</span>
                <span className="text-2xl font-black text-primary font-mono">{id}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Payment Status</span>
                  <span className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">Success</span>
                </div>
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-gray-100 ${getColor()}`}>
                  {getIcon()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Service Name</label>
                <p className="font-black text-gray-900 text-lg leading-tight uppercase">{item.name || item.airline || type}</p>
                {room && <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">{room.name}</p>}
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Date & Time</label>
                <div className="flex items-center font-bold text-gray-900 group cursor-default">
                  <Calendar className="w-4 h-4 mr-3 text-primary group-hover:scale-110 transition-transform" />
                  <span>{details?.date || "April 24, 2024"}</span>
                </div>
                <p className="text-xs font-bold text-gray-500 mt-2 ml-7 uppercase tracking-widest">{details?.time || item.departure || "Check-in 12:00 PM"}</p>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Location / Route</label>
                <div className="flex items-center font-bold text-gray-900 group cursor-default">
                  <MapPin className="w-4 h-4 mr-3 text-primary group-hover:scale-110 transition-transform" />
                  <span>{item.origin || item.location || details?.pickup || "Explore City"}</span>
                </div>
                {item.destination && (
                  <p className="text-xs font-bold text-gray-500 mt-2 ml-7 flex items-center uppercase tracking-widest">
                    <ArrowRight className="w-3 h-3 mr-2" /> {item.destination}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100">
                  <img src="https://i.pravatar.cc/150?u=1" className="w-full h-full rounded-xl object-cover" alt="User" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Rahul Sharma</h5>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest transition-colors">Primary Guest / Traveler</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">Total Amount Paid</span>
                <span className="text-3xl font-black text-gray-900">₹{costs.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in delay-200">
          <button className="bg-white border border-gray-100 p-6 rounded-[2rem] flex items-center justify-center space-x-3 font-black text-sm uppercase tracking-widest group hover:shadow-xl transition-all">
            <Download className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span>Download Ticket</span>
          </button>
          <button className="bg-white border border-gray-100 p-6 rounded-[2rem] flex items-center justify-center space-x-3 font-black text-sm uppercase tracking-widest group hover:shadow-xl transition-all">
            <Share2 className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
            <span>Share Details</span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white p-6 rounded-[2rem] flex items-center justify-center space-x-3 font-black text-sm uppercase tracking-widest group shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Go to Home</span>
          </button>
        </div>

        <p className="text-center mt-20 text-xs font-black text-gray-300 uppercase tracking-[0.3em] flex items-center justify-center">
          <Sparkles className="w-4 h-4 mr-3 text-secondary animate-pulse" />
          Powered by BookMyTrip Genius Engine
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
