import React, { useState, useEffect } from 'react';
import { 
  Package, MapPin, Clock, Star, Filter, Search, 
  Plane, Hotel, Utensils, Camera, ChevronRight 
} from 'lucide-react';
import { packages } from '../data/packages';
import { useNavigate, useLocation } from 'react-router-dom';

const Packages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destFilter = queryParams.get('dest');

  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [selectedType, setSelectedType] = useState('All');
  const [budgetRange, setBudgetRange] = useState(50000);
  const [searchQuery, setSearchQuery] = useState(destFilter || '');

  useEffect(() => {
    let result = packages.filter(p => p.price <= budgetRange);
    
    if (selectedType !== 'All') {
      result = result.filter(p => p.type === selectedType);
    }
    
    if (searchQuery) {
      result = result.filter(p => 
        p.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredPackages(result);
  }, [selectedType, budgetRange, searchQuery]);

  const packageTypes = ['All', 'Romantic', 'Adventure', 'Family', 'Solo', 'Honeymoon'];

  return (
    <div className="pb-24">
      {/* Header Section */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 animate-fade-in">
              Curated <span className="text-primary">Travel Experiences</span>
            </h1>
            <p className="text-gray-600 font-medium">From mountain treks to beach escapes, find the perfect all-inclusive package for your next dream vacation.</p>
          </div>
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search destination or package..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 space-y-8">
          <div className="glass rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-8 flex items-center tracking-tight">
              <Filter className="w-4 h-4 mr-2 text-primary" /> Filter Results
            </h3>

            <div className="space-y-10">
              {/* Package Type */}
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block mb-6">Experience Type</label>
                <div className="space-y-3">
                  {packageTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all flex justify-between items-center ${
                        selectedType === type ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 hover:border-gray-200'
                      }`}
                    >
                      {type}
                      {selectedType === type && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Budget</label>
                  <span className="text-sm font-black text-primary">₹{budgetRange.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="5000"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-4 font-black uppercase tracking-[0.2em]">
                  <span>₹5k</span>
                  <span>₹100k</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {filteredPackages.map(pkg => (
              <div 
                key={pkg.id}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/packages/${pkg.id}`)}
              >
                <div className="h-64 relative overflow-hidden">
                  <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pkg.name} />
                  <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{pkg.type}</span>
                  </div>
                  <div className="absolute bottom-6 right-6 glass px-4 py-2 rounded-full flex items-center space-x-1.5">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="text-sm font-bold">{pkg.rating}</span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center text-primary font-bold text-xs mb-3 tracking-widest uppercase">
                    <MapPin className="w-3 h-3 mr-1.5" />
                    {pkg.destination}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight">{pkg.name}</h3>
                  
                  <div className="flex items-center text-gray-500 font-bold text-xs mb-8 space-x-6 tracking-widest uppercase">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" /> {pkg.duration}</span>
                    <span className="flex items-center"><Camera className="w-4 h-4 mr-2 text-gray-400" /> {pkg.includes.length} Highlights</span>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    {pkg.includes.includes("Flights") && <div className="p-3 bg-blue-50 rounded-xl text-blue-500"><Plane className="w-5 h-5" /></div>}
                    {pkg.includes.includes("Hotels") && <div className="p-3 bg-teal-50 rounded-xl text-teal-500"><Hotel className="w-5 h-5" /></div>}
                    {pkg.includes.includes("Meals") && <div className="p-3 bg-orange-50 rounded-xl text-orange-500"><Utensils className="w-5 h-5" /></div>}
                  </div>
                  
                  <div className="mb-8 p-3 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between">
                    <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Market Comparison</span>
                    <span className="text-[10px] font-bold text-gray-500 line-through">₹{(pkg.price + 5500).toLocaleString()}</span>
                    <span className="text-xs font-black text-green-600">Save ₹5,500</span>
                  </div>

                  <div className="pt-8 border-t border-gray-50 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-1">Per Person</span>
                      <span className="text-3xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</span>
                    </div>
                    <button className="bg-primary text-white p-4 rounded-2xl font-black transition-all hover:shadow-xl hover:scale-110 active:scale-95 shadow-lg shadow-primary/20">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-32 glass rounded-[3rem]">
              <Package className="w-20 h-20 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-gray-400 mb-2">No packages found</h3>
              <p className="text-gray-400 font-medium">Try broadening your search or adjusting filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Packages;
