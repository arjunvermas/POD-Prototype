import React, { useState } from 'react';
import { 
  Compass, Sparkles, MapPin, Calendar, Users, 
  Wallet, Bike, Music, Coffee, ShoppingBag, 
  Palmtree, Zap, Loader2, Save, Send, ChevronRight 
} from 'lucide-react';

const TripPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [formData, setFormData] = useState({
    destination: '',
    duration: '3',
    travelers: '2',
    budget: 'Medium',
    interests: [],
    pace: 'Moderate'
  });

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);
    
    // Simulate AI generation
    setTimeout(() => {
      setItinerary({
        destination: formData.destination || "Goa",
        days: Array.from({ length: parseInt(formData.duration) }).map((_, i) => ({
          day: i + 1,
          theme: ["Coastal Exploration", "Heritage Walk", "Adventure Day", "Relaxation Mode"][i % 4],
          activities: [
            { time: "09:00 AM", task: "Sunrise Beach Session & Breakfast", cost: "₹800", icon: Palmtree },
            { time: "12:00 PM", task: "Local Market & Cultural Tour", cost: "₹1,200", icon: ShoppingBag },
            { time: "04:00 PM", task: "Evening Activity based on Interests", cost: "₹2,500", icon: Zap },
            { time: "08:00 PM", task: "Fine Dining Experience", cost: "₹3,500", icon: Coffee },
          ]
        })),
        suggestions: [
          "Rent a scooter for better local mobility",
          "Carry light cotton clothes and sunscreen",
          "Try the local seafood at 'Ocean Grill'",
          "Carry some cash for local market shopping"
        ]
      });
      setLoading(false);
    }, 2500);
  };

  const interestOptions = [
    { label: "Adventure", icon: Bike },
    { label: "Culture", icon: Music },
    { label: "Food", icon: Coffee },
    { label: "Shopping", icon: ShoppingBag },
    { label: "Relaxation", icon: Palmtree },
    { label: "Nightlife", icon: Zap },
  ];

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-20 animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black text-xs uppercase tracking-[0.2em] mb-6 border border-primary/20">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Advanced AI</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
          Your Personal <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Travel Genius</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
          Tell us about your dream trip and let our AI curate the most efficient, beautiful and cost-effective itinerary tailored just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Section */}
        <div className="lg:col-span-4 glass rounded-[3rem] p-10 border border-white shadow-2xl">
          <form onSubmit={handleGenerate} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Where to?"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Duration (Days)</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                  <input 
                    type="number" 
                    min="1" max="15"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Travelers</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                  <input 
                    type="number" 
                    min="1" max="10"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary outline-none transition-all font-bold"
                    value={formData.travelers}
                    onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Interests</label>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map(opt => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleInterestToggle(opt.label)}
                    className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all text-left ${
                      formData.interests.includes(opt.label)
                        ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30'
                        : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                    }`}
                  >
                    <opt.icon className={`w-5 h-5 ${formData.interests.includes(opt.label) ? 'text-white' : 'text-primary'}`} />
                    <span className="text-sm font-bold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block ml-1">Budget Level</label>
              <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
                {['Low', 'Medium', 'High'].map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData({...formData, budget: b})}
                    className={`flex-grow py-3 rounded-xl text-sm font-black transition-all ${
                      formData.budget === b 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-5 rounded-2xl font-black text-lg transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Compass className="w-6 h-6 mr-3" />
                  Generate Itinerary
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-8 min-h-[600px] flex flex-col items-center justify-center">
          {!itinerary && !loading && (
            <div className="text-center space-y-8 py-20 px-8">
              <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 rotate-12">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Ready to play?</h3>
                <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                  Fill in the details and our AI will instantly build a custom travel plan just for you.
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center space-y-10 w-full max-w-md">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900">Crafting your itinerary...</h3>
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">Researching local hotspots & costs</p>
                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
          )}

          {itinerary && (
            <div className="w-full space-y-12 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Tailored Trip to {itinerary.destination}</h2>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Based on your {formData.interests.join(', ') || 'personal'} interests</p>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-6 py-3 border border-gray-100 rounded-[1.25rem] font-bold text-sm hover:bg-white hover:shadow-xl transition-all">
                    <Save className="w-4 h-4 text-primary" />
                    <span>Save Plan</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-[1.25rem] font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all group">
                    <span>Book Trip</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {itinerary.days.map(day => (
                  <div key={day.day} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center font-black text-primary">
                        D{day.day}
                      </div>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{day.theme}</span>
                    </div>
                    <div className="space-y-8">
                      {day.activities.map((act, i) => (
                        <div key={i} className="flex space-x-6 relative group">
                          {i !== day.activities.length - 1 && (
                            <div className="absolute left-[11px] top-8 bottom-0 w-px border-l border-dashed border-gray-100 group-hover:border-primary/50 transition-colors"></div>
                          )}
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1 group-hover:bg-primary transition-colors">
                            <act.icon className="w-3 h-3 text-primary group-hover:text-white" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{act.task}</h4>
                              <span className="text-xs font-black text-primary ml-4">{act.cost}</span>
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{act.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <h3 className="text-2xl font-black mb-8 flex items-center">
                  <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="w-5 h-5 text-primary-light" />
                  </span>
                  AI Expert Suggestions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {itinerary.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-default">
                      <Send className="w-4 h-4 text-primary-light mt-1 flex-shrink-0" />
                      <p className="text-sm font-medium text-gray-300 leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
