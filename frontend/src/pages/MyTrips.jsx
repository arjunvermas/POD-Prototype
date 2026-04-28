import React, { useState } from 'react';
import { 
  Plane, Hotel, Car, Package, Calendar, MapPin, 
  ChevronRight, ArrowRight, Clock, ShieldCheck, 
  XCircle, CheckCircle2, MoreHorizontal, Download, 
  MessageSquare, Info, History
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

const MyTrips = () => {
  const { bookings } = useBooking();
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  // Mock historical data for better visualization
  const mockHistory = [
    { 
      id: 'BT-HIST123', type: 'flight', 
      item: { airline: 'Air India', origin: 'Mumbai', destination: 'Delhi', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png' },
      date: '2024-01-15', status: 'completed', costs: { total: 4500 }
    },
    { 
      id: 'BT-HIST456', type: 'hotel', 
      item: { name: 'Ocean View Suites', location: 'Maldives', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000' },
      date: '2023-12-20', status: 'completed', costs: { total: 125000 }
    }
  ];

  const allBookings = [...bookings, ...mockHistory];
  const filteredBookings = allBookings.filter(b => b.status === activeTab);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'flight': return <Plane className="w-5 h-5" />;
      case 'hotel': return <Hotel className="w-5 h-5" />;
      case 'cab': return <Car className="w-5 h-5" />;
      case 'package': return <Package className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-primary bg-primary/5 border-primary/10';
      case 'completed': return 'text-green-600 bg-green-50 border-green-100';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 animate-fade-in">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">Your Travel Journey</h1>
            <p className="text-gray-500 font-medium">Manage all your past and upcoming experiences in one place.</p>
          </div>
          <div className="flex p-1 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
            {['upcoming', 'completed', 'cancelled'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8 animate-fade-in delay-100">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, idx) => (
              <div key={booking.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-2 h-full opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === 'upcoming' ? 'bg-primary' : 'bg-green-500'}`}></div>
                
                <div className="flex flex-col lg:flex-row gap-12">
                  {/* Icon & Category */}
                  <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-gray-50 rounded-[1.5rem] group-hover:bg-primary/5 transition-colors">
                    {getTypeIcon(booking.type)}
                  </div>

                  {/* Main Details */}
                  <div className="flex-grow space-y-8">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">ID: {booking.id}</span>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">
                          {booking.item.name || `${booking.item.airline} Journey`}
                        </h3>
                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mt-1">
                          {booking.item.location || `${booking.item.origin} to ${booking.item.destination}`}
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Booked on</span>
                        <div className="flex items-center font-bold text-gray-900 md:justify-end">
                          <Calendar className="w-4 h-4 mr-2 text-primary" />
                          {booking.date?.split('T')[0] || "2024-04-20"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center"><Clock className="w-5 h-5" /></div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Status</label>
                          <span className="text-sm font-black text-gray-900">Confirmed & Guaranteed</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-teal-50 text-teal-500 rounded-xl flex items-center justify-center"><Download className="w-5 h-5" /></div>
                        <button className="text-left hover:text-primary transition-colors">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Ticket</label>
                          <span className="text-sm font-black text-gray-900">E-Ticket Ready</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center"><MessageSquare className="w-5 h-5" /></div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Assistance</label>
                          <span className="text-sm font-black text-gray-900">24/7 Priority Support</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex-shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-50 pt-8 lg:pt-0 lg:pl-12 w-full lg:w-48 gap-8">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Paid Amount</span>
                      <span className="text-2xl font-black text-gray-900">₹{booking.costs?.total.toLocaleString()}</span>
                    </div>
                    <div className="flex lg:flex-col gap-4">
                      <button className="flex-grow py-4 bg-gray-50 hover:bg-gray-100 rounded-[1.25rem] font-bold text-xs uppercase tracking-widest transition-all">
                        Details
                      </button>
                      {activeTab === 'upcoming' ? (
                        <button className="flex-grow py-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all border border-red-100">
                          Cancel
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigate('/')}
                          className="flex-grow py-4 bg-primary text-white rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
                        >
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-40 glass rounded-[3rem]">
              <History className="w-20 h-20 text-gray-200 mx-auto mb-8" />
              <h3 className="text-2xl font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">No {activeTab} trips found</h3>
              <button 
                onClick={() => navigate('/')}
                className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
              >
                Plan your first trip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
