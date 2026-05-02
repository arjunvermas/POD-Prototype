import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, CreditCard, ShieldCheck, 
  MapPin, Clock, Calendar, CheckCircle, Info,
  ChevronRight, ArrowLeft, Tag, Lock, Users
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { findCheapest } from '../utils/priceHelper';

const Booking = () => {
  const { currentBooking, confirmBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequests: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    promoCode: ''
  });
  
  const [promoApplied, setPromoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentBooking) {
      navigate('/');
    }
  }, [currentBooking, navigate]);

  if (!currentBooking) return null;

  const { type, item, details, room } = currentBooking;

  const pricesObj = item.prices || (room && room.prices) || item.prices || {}; // Actually hotels have item.prices
  const cheapestData = findCheapest(pricesObj);
  const [selectedProvider, setSelectedProvider] = useState(
    currentBooking.selectedProvider || cheapestData?.cheapest
  );

  const calculateTotal = () => {
    let base = item.price;
    if (type === 'flight') base = selectedProvider ? selectedProvider.price : item.price;
    if (type === 'cab') base = selectedProvider ? selectedProvider.price : item.baseFare;
    if (type === 'hotel' && room) {
      const multiplier = room.price / item.price;
      base = selectedProvider ? selectedProvider.price * multiplier : room.price;
    }
    
    const taxes = base * 0.18;
    const fee = 499;
    const discount = promoApplied ? base * 0.1 : 0;
    
    return {
      subtotal: base,
      taxes,
      fee,
      discount,
      total: base + taxes + fee - discount
    };
  };

  const costs = calculateTotal();

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing and redirect
    setTimeout(() => {
      confirmBooking({ ...formData, costs });
      
      let redirectUrl = 'https://www.makemytrip.com/';
      const urlMap = {
        'MakeMyTrip': 'https://www.makemytrip.com/',
        'Goibibo': 'https://www.goibibo.com/',
        'Booking.com': 'https://www.booking.com/'
      };
      
      if (selectedProvider && selectedProvider.url) {
        redirectUrl = selectedProvider.url;
      } else if (selectedProvider && urlMap[selectedProvider.platform]) {
        redirectUrl = urlMap[selectedProvider.platform];
      } else if (cheapestData?.cheapest?.url) {
        redirectUrl = cheapestData.cheapest.url;
      }
      
      window.location.href = redirectUrl;
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-500 hover:text-primary font-bold text-sm mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to selection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Complete Your Booking</h1>
              <p className="text-gray-500 font-medium">Verify your details and choose a payment method to confirm.</p>
            </div>

            <form onSubmit={handleConfirm} className="space-y-12">
              {/* Traveler Details */}
              <section className="glass rounded-[3rem] p-10 border border-white shadow-xl">
                <h3 className="text-2xl font-black mb-10 flex items-center">
                  <User className="w-6 h-6 mr-4 text-primary" />
                  Traveler Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Special Requests</label>
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                      placeholder="e.g. Early check-in, dietary needs"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                    />
                  </div>
                </div>
              </section>

              {/* Payment Selection */}
              <section className="glass rounded-[3rem] p-10 border border-white shadow-xl">
                <h3 className="text-2xl font-black mb-10 flex items-center">
                  <CreditCard className="w-6 h-6 mr-4 text-primary" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  {['credit_card', 'upi', 'wallet'].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: method})}
                      className={`p-6 rounded-3xl border-2 transition-all text-left group ${
                        formData.paymentMethod === method 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-all ${
                        formData.paymentMethod === method ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                      }`}>
                        {method === 'credit_card' ? <CreditCard className="w-5 h-5" /> : method === 'upi' ? <CheckCircle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                      </div>
                      <span className="font-black text-sm uppercase tracking-widest block mb-1">
                        {method.split('_').join(' ')}
                      </span>
                      <span className="text-xs text-gray-400 font-bold">Secure Gateway</span>
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'credit_card' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000"
                          className="w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-2 focus:ring-primary outline-none transition-all font-mono font-bold"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-6 py-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-center" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">CVV</label>
                        <input type="password" placeholder="***" className="w-full px-6 py-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-center" />
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-6 rounded-[2rem] font-black text-2xl transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/30 flex items-center justify-center space-x-4 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-8 h-8" />
                    <span>Pay ₹{costs.total.toLocaleString()} & Confirm Booking</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Booking Summary Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Trip Summary */}
              <div className="glass rounded-[3rem] p-10 border border-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -mr-16 -mt-16"></div>
                <h3 className="text-2xl font-black mb-8 relative z-10">Trip Summary</h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex space-x-6 items-start pb-8 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-gray-50 p-1 flex-shrink-0">
                      <img src={item.logo || item.image} className="w-full h-full object-cover rounded-[1rem]" alt={item.name || item.airline} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] block mb-1">{type}</span>
                      <h4 className="font-bold text-gray-900 leading-tight">{item.name || `${item.airline} (${item.origin} → ${item.destination})`}</h4>
                      {room && <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">{room.name}</p>}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-6 group">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Calendar className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Check-in / Date</label>
                        <span className="text-sm font-black text-gray-900">{details?.date || "April 24, 2024"}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Clock className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Duration / Time</label>
                        <span className="text-sm font-black text-gray-900">{details?.time || item.duration || "4 Days / 3 Nights"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100 space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span className="text-gray-900">₹{costs.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest">
                      <span>Taxes & GST</span>
                      <span className="text-gray-900">₹{Math.floor(costs.taxes).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest">
                      <span>Booking Fee</span>
                      <span className="text-gray-900">₹{costs.fee}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between items-center text-sm font-bold text-green-500 uppercase tracking-widest">
                        <span>Discount</span>
                        <span>- ₹{costs.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-6 mt-4 border-t-2 border-dashed border-gray-100 flex justify-between items-end">
                      <span className="text-xl font-black uppercase tracking-[0.2em]">Total</span>
                      <span className="text-4xl font-black text-primary">₹{costs.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Comparison Widget */}
              {cheapestData?.sorted && cheapestData.sorted.length > 0 && (
                <div className="glass rounded-[2rem] p-8 border border-white shadow-xl bg-gradient-to-br from-white to-gray-50/80">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-black flex items-center">
                      <ShieldCheck className="w-5 h-5 mr-3 text-green-500" />
                      Live Comparison
                    </h4>
                    <span className="text-[10px] font-black bg-green-100 text-green-600 px-2 py-1 rounded-md border border-green-200">
                      Best Value
                    </span>
                  </div>
                  <div className="space-y-3">
                    {cheapestData.sorted.map((site, i) => {
                      const isSelected = selectedProvider?.platform === site.platform;
                      const isCheapest = i === 0;
                      return (
                        <div 
                          key={i} 
                          onClick={() => setSelectedProvider(site)}
                          className={`flex justify-between items-center p-3 rounded-xl transition-all cursor-pointer ${isSelected ? 'bg-white shadow-md border-2 border-primary' : 'bg-gray-50 border border-gray-100 hover:border-primary/50 hover:bg-white'}`}
                        >
                          <span className={`text-xs font-bold ${isSelected ? 'text-primary-dark' : 'text-gray-500'}`}>{site.platform}</span>
                          <span className={`text-sm ${isSelected ? 'font-black text-primary-dark' : (isCheapest ? 'font-bold text-gray-900' : 'font-bold text-gray-400 line-through')}`}>
                            ₹{type === 'hotel' && room ? (site.price * (room.price / item.price)).toLocaleString() : site.price.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {cheapestData.savingsAmount > 0 && (
                    <div className="mt-6 text-center p-3 bg-green-50 rounded-xl border border-green-100">
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest block mb-1">Total Savings</span>
                      <span className="text-xl font-black text-green-700">₹{cheapestData.savingsAmount.toLocaleString()} ({cheapestData.savingsPercent}%)</span>
                    </div>
                  )}
                </div>
              )}

              {/* Promo Code */}
              <div className="glass rounded-[2rem] p-8 border border-white shadow-xl">
                <h4 className="text-lg font-black mb-6 flex items-center">
                  <Tag className="w-5 h-5 mr-3 text-secondary" />
                  Promo Code
                </h4>
                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    placeholder="Enter code"
                    className="flex-grow px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-primary outline-none text-sm font-bold uppercase transition-all"
                    value={formData.promoCode}
                    onChange={(e) => setFormData({...formData, promoCode: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      if (formData.promoCode.length > 3) setPromoApplied(true);
                    }}
                    className="px-6 py-3 bg-secondary text-white rounded-xl font-black text-sm shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-green-500 font-bold mt-4 flex items-center uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3 mr-1" /> Code Applied Successfully!
                  </p>
                )}
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center space-x-8 opacity-40">
                <ShieldCheck className="w-10 h-10" />
                <Lock className="w-10 h-10" />
                <div className="w-10 h-10 bg-gray-900 rounded-lg"></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Booking;
