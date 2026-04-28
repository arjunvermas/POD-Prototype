import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, MapPin, Star, CheckCircle2, ChevronLeft, 
  Plane, Hotel, Utensils, Camera, Calendar, ShieldCheck,
  ChevronRight, Info, Music, Coffee, Users
} from 'lucide-react';
import { packages } from '../data/packages';
import { hotels } from '../data/hotels';
import { useBooking } from '../context/BookingContext';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = packages.find(p => p.id === parseInt(id));
  const { setBookingData } = useBooking();

  if (!pkg) return <div className="text-center py-20">Package not found</div>;

  const handleBook = () => {
    setBookingData({ type: 'package', item: pkg });
    navigate('/booking');
  };

  const itinerary = [
    { day: 1, title: "Arrival & Leisure", tasks: ["Airport Pickup", "Check-in at Hotel", "Welcome Drinks", "Evening Beach Walk"] },
    { day: 2, title: "Cultural Sightseeing", tasks: ["Local Museum Visit", "Art Gallery Tour", "Authentic Lunch", "Traditional Music Evening"] },
    { day: 3, title: "Adventure & Thrill", tasks: ["Nature Trekking", "Photography Session", "Sunset Point", "Gala Dinner"] },
    { day: 4, title: "Local Explorer", tasks: ["Main Market Tour", "Souvenir Shopping", "Street Food Trail"] },
    { day: 5, title: "Departure", tasks: ["Breakfast", "Check-out", "Airport Transfer"] },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <img src={pkg.image} className="absolute inset-0 w-full h-full object-cover" alt={pkg.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white transition-colors z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full mt-24">
          <div className="max-w-3xl">
            <span className="bg-primary/20 backdrop-blur-md text-primary-light px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block border border-primary/30">
              {pkg.type} Experience
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              {pkg.name}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/80 font-bold uppercase tracking-widest text-sm">
              <span className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" /> {pkg.destination}</span>
              <span className="flex items-center"><Clock className="w-5 h-5 mr-2 text-primary" /> {pkg.duration}</span>
              <span className="flex items-center"><Star className="w-5 h-5 mr-2 text-secondary fill-secondary" /> {pkg.rating} ({Math.floor(Math.random()*500)+100} Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-grow space-y-16">
            {/* Overview */}
            <div className="glass rounded-[3rem] p-10 border border-white">
              <h2 className="text-3xl font-black mb-8">Trip Overview</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Embark on an unforgettable journey to {pkg.destination}. This carefully curated {pkg.duration} package offers the perfect blend of relaxation, exploration, and luxury. Whether you're seeking adventure or a serene getaway, we ensure every detail is handled so you can focus on making memories.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Plane, label: "Flights", desc: "Round trip incl." },
                  { icon: Hotel, label: "Hotels", desc: "4-Star properties" },
                  { icon: Utensils, label: "Meals", desc: "Breakfast & Dinner" },
                  { icon: Camera, label: "Tours", desc: "Photography incl." },
                ].map((inc, i) => (
                  <div key={i} className="text-center p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                    <inc.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h4 className="font-bold text-gray-900 mb-1">{inc.label}</h4>
                    <p className="text-xs text-gray-500 font-medium">{inc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="text-3xl font-black mb-10">Detailed Itinerary</h2>
              <div className="space-y-6">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="relative pl-12 group">
                    {idx !== itinerary.length - 1 && (
                      <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-gray-100 group-hover:bg-primary/20 transition-colors"></div>
                    )}
                    <div className="absolute left-0 top-1 w-12 h-12 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <span className="font-black">D{day.day}</span>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                      <h4 className="text-xl font-bold mb-6">{day.title}</h4>
                      <ul className="space-y-4">
                        {day.tasks.map((task, i) => (
                          <li key={i} className="flex items-center text-gray-600 font-medium">
                            <CheckCircle2 className="w-5 h-5 mr-4 text-green-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50/50 rounded-[2.5rem] p-10 border border-green-100">
                <h3 className="text-2xl font-bold text-green-900 mb-8 flex items-center">
                  <span className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <CheckCircle2 className="w-6 h-6" />
                  </span>
                  What's Included
                </h3>
                <ul className="space-y-4">
                  {["Domestic Return Airfare", "Accommodation in 4-Star Hotels", "All Transfers by Private Car", "Breakfast and Dinner", "Entrance Fees to Monuments", "Local English Speaking Guide"].map(i => (
                    <li key={i} className="flex items-start text-sm text-green-800 font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-3 flex-shrink-0"></div>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50/50 rounded-[2.5rem] p-10 border border-red-100">
                <h3 className="text-2xl font-bold text-red-900 mb-8 flex items-center">
                  <span className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <Info className="w-6 h-6" />
                  </span>
                  Notable Exclusions
                </h3>
                <ul className="space-y-4">
                  {["International Airfare", "Personal Expenses & Tips", "Travel Insurance", "Lunches not mentioned", "Optional Tours and Activities", "Visa Processing Fees"].map(i => (
                    <li key={i} className="flex items-start text-sm text-red-800 font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-3 flex-shrink-0"></div>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky Booking Card */}
          <aside className="w-full lg:w-96">
            <div className="sticky top-28 glass rounded-[3rem] border border-white p-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">Starting from</span>
                    <span className="text-4xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-xs font-bold block mt-1 tracking-widest uppercase">Per Person</span>
                  </div>
                  <div className="bg-secondary/10 px-4 py-2 rounded-2xl border border-secondary/20">
                    <span className="text-secondary font-black text-lg">Save 20%</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-white/50 rounded-2xl border border-gray-100 flex items-center space-x-4">
                    <Calendar className="w-6 h-6 text-gray-400" />
                    <div className="flex-grow">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Primary Date</label>
                      <span className="text-sm font-bold">April 25, 2024</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/50 rounded-2xl border border-gray-100 flex items-center space-x-4">
                    <Users className="w-6 h-6 text-gray-400" />
                    <div className="flex-grow">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Travelers</label>
                      <span className="text-sm font-bold">2 Adults, 0 Children</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-10 text-sm">
                  <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                    <span>Base Fare (2x)</span>
                    <span className="text-gray-900 text-base">₹{(pkg.price * 2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                    <span>Taxes & Fees</span>
                    <span className="text-gray-900 text-base">₹2,499</span>
                  </div>
                  <div className="flex justify-between items-end pt-6 border-t border-gray-100">
                    <span className="text-lg font-black uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black text-primary">₹{(pkg.price * 2 + 2499).toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleBook}
                  className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-5 rounded-2xl font-black text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/30 flex items-center justify-center group"
                >
                  <span>Book This Package</span>
                  <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="mt-8 flex items-center justify-center space-x-6">
                  <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 mr-2 text-green-500" /> Secure Payment
                  </div>
                  <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Clock className="w-4 h-4 mr-2 text-primary" /> Free Support
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};


export default PackageDetail;
