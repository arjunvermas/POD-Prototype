import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, Hotel, Car, Package, Compass, FileText, 
  Tag, Headset, Bell, ArrowRight, Star, Quote, Search, Utensils
} from 'lucide-react';
import SearchWidget from '../components/home/SearchWidget';
import { destinations } from '../data/destinations';
import { reviews } from '../data/reviews';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Plane, title: "Flight Booking", desc: "Global reach with 500+ airlines", color: "bg-blue-50 text-blue-600" },
    { icon: Hotel, title: "Hotel Booking", desc: "Best prices on 1M+ properties", color: "bg-teal-50 text-teal-600" },
    { icon: Car, title: "Cab Booking", desc: "Safe and reliable airport transfers", color: "bg-orange-50 text-orange-600" },
    { icon: Utensils, title: "Restaurants", desc: "Menus, safety scores, and delivery deals", color: "bg-emerald-50 text-emerald-600", path: "/restaurants" },
    { icon: Package, title: "Travel Packages", desc: "Curated experiences just for you", color: "bg-purple-50 text-purple-600" },
    { icon: Compass, title: "AI Trip Planner", desc: "Plan your trip in seconds with AI", color: "bg-pink-50 text-pink-600" },
    { icon: FileText, title: "Itinerary Generator", desc: "Export detailed travel plans", color: "bg-yellow-50 text-yellow-600" },
    { icon: Tag, title: "Transparent Pricing", desc: "No hidden charges, guaranteed", color: "bg-green-50 text-green-600" },
    { icon: Headset, title: "24/7 Support", desc: "Always here when you need us", color: "bg-red-50 text-red-600" },
    { icon: Bell, title: "Real-Time Alerts", desc: "Instant updates on your bookings", color: "bg-indigo-50 text-indigo-600" },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
          src="https://picsum.photos/seed/travelhero/2000/1000" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Hero" 
        />
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Discover Your Next <span className="text-primary-light">Great Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            From sunrise beach escapes to mountain retreats, we provide everything you need to make your journey unforgettable.
          </p>
        </div>
      </section>

      {/* Search Widget */}
      <section className="px-4">
        <SearchWidget />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need In One Place</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We offer a comprehensive suite of travel services designed to give you peace of mind throughout your journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => feature.path && navigate(feature.path)}
              className={`p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group ${
                feature.path ? 'cursor-pointer' : ''
              }`}
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-gray-50 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
              <p className="text-gray-600">Explore the world's most sought-after travel locations.</p>
            </div>
            <button 
              onClick={() => navigate('/packages')}
              className="flex items-center space-x-2 text-primary font-bold hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide -mx-4 h-[420px] px-4 items-center">
            {destinations.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => navigate(`/packages?dest=${dest.name}`)}
                className="flex-shrink-0 w-72 h-[380px] relative rounded-3xl overflow-hidden cursor-pointer group shadow-lg hover:-translate-y-2 transition-all duration-500"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                  <h4 className="text-2xl font-bold mb-1">{dest.name}</h4>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-1">{dest.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Starts from</span>
                    <span className="text-xl font-bold">₹{dest.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600">Booking your dream trip is as easy as 1-2-3-4.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Search", desc: "Choose your destination and preferred services.", icon: Search },
            { step: "02", title: "Compare", desc: "Browse through hundreds of options at best prices.", icon: Compass },
            { step: "03", title: "Book", desc: "Confirm your details and book with secure payment.", icon: Bell },
            { step: "04", title: "Enjoy", desc: "Pack your bags and start your dream vacation.", icon: Star },
          ].map((item, idx) => (
            <div key={idx} className="text-center relative">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <item.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              {idx < 3 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 border-t-2 border-dashed border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-gray-600">Real stories from people who explored the world with us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed italic">"{review.text}"</p>
                <div className="flex items-center space-x-4 border-t border-gray-50 pt-6">
                  <img src={review.photo} alt={review.name} className="w-12 h-12 rounded-full border-2 border-primary/20" />
                  <div>
                    <h5 className="font-bold text-gray-900">{review.name}</h5>
                    <div className="flex space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
