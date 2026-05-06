import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Car, Package, Search, Utensils } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

const SearchWidget = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const { searchParams, updateSearchParams } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/${activeTab}`);
  };

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'cabs', label: 'Cabs', icon: Car },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'packages', label: 'Packages', icon: Package },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto glass rounded-3xl shadow-2xl p-6 md:p-8 transform -translate-y-12 animate-fade-in">
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">From</label>
          <input
            type="text"
            placeholder="Origin City"
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            value={searchParams.origin}
            onChange={(e) => updateSearchParams({ origin: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">To</label>
          <input
            type="text"
            placeholder="Destination City"
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            value={searchParams.destination}
            onChange={(e) => updateSearchParams({ destination: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Travel Date</label>
          <input
            type="date"
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            value={searchParams.date}
            onChange={(e) => updateSearchParams({ date: e.target.value })}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="w-5 h-5" />
            <span>Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchWidget;
