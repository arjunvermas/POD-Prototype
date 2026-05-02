import React, { useState } from 'react';
import { 
  Plus, Minus, MessageCircle, Phone, Mail, 
  MapPin, Send, HelpCircle, ShieldCheck, 
  Search, ChevronRight, Zap, Headphones
} from 'lucide-react';
import { faqs } from '../data/faqs';

const Support = () => {
  const [openFaq, setOpenFaq] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Booking', 'Cancellations', 'Payments', 'Account'];

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-primary-light font-black text-xs uppercase tracking-[0.2em] mb-10 border border-white/10">
            <Headphones className="w-4 h-4" />
            <span>Support Excellence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight animate-fade-in">
            How can we help you <br /><span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">explorer?</span>
          </h1>
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6 transition-colors group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Search for questions, keywords, or topics..."
              className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:bg-white focus:text-gray-900 transition-all font-bold text-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Cards */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass rounded-[3rem] p-10 border border-white shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Live Chat</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">Average response time is less than 2 minutes. Our experts are online 24/7.</p>
              <button className="flex items-center space-x-2 text-primary font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                <span>Start Chat</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="glass rounded-[3rem] p-10 border border-white shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="w-16 h-16 bg-secondary/10 rounded-[1.5rem] flex items-center justify-center mb-8 transform group-hover:-rotate-12 transition-transform">
                <Phone className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Call center</h3>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">International assistance for critical booking issues and cancellations.</p>
              <div className="space-y-2">
                <p className="font-black text-gray-900 text-lg">+1 (800) 123-4567</p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Toll Free Support</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-gray-400/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-10 rounded-full blur-xl -mr-16 -mt-16"></div>
              <h3 className="text-2xl font-black mb-10 flex items-center">
                <Zap className="w-6 h-6 mr-4 text-primary-light" />
                Quick Actions
              </h3>
              <div className="space-y-4">
                {['Track My Refund', 'Submit a Claim', 'Change Itinerary', 'E-Ticket Help'].map(action => (
                  <button key={action} className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group">
                    <span className="font-bold text-sm">{action}</span>
                    <Plus className="w-4 h-4 text-primary group-hover:rotate-90 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Area */}
          <div className="lg:col-span-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <h2 className="text-3xl font-black text-gray-900 leading-tight">Common Questions</h2>
              <div className="flex p-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto max-w-full print:hidden">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {filteredFaqs.map(faq => (
                <div 
                  key={faq.id}
                  className={`glass border transition-all rounded-[2.5rem] p-10 cursor-pointer group shadow-sm hover:shadow-xl ${
                    openFaq === faq.id ? 'border-primary ring-4 ring-primary/5 bg-white pb-12' : 'border-gray-50'
                  }`}
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                      <div className={`w-10 h-10 rounded-[1.25rem] flex items-center justify-center transition-all ${
                        openFaq === faq.id ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <h4 className={`text-lg font-black transition-colors ${openFaq === faq.id ? 'text-gray-900 font-[900]' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {faq.question}
                      </h4>
                    </div>
                    {openFaq === faq.id ? <Minus className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6 text-gray-300" />}
                  </div>
                  
                  {openFaq === faq.id && (
                    <div className="mt-10 pl-16 pr-8 animate-fade-in">
                      <p className="text-gray-500 font-medium leading-relaxed border-l-4 border-primary/20 pl-8 text-lg">
                        {faq.answer}
                      </p>
                      <div className="mt-10 flex space-x-12 pt-8 border-t border-gray-50">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Category</label>
                          <span className="text-sm font-black text-gray-900">{faq.category}</span>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Was this helpful?</label>
                          <div className="flex space-x-4">
                            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Yes, Thanks!</button>
                            <span className="text-gray-200">|</span>
                            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:underline">No, I still need help</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-20 glass rounded-[3rem] p-12 border border-white shadow-2xl relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark text-white">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="max-w-md">
                  <h3 className="text-3xl font-black mb-4">Still have questions?</h3>
                  <p className="text-primary-light font-bold">If you can't find the answer you're looking for, our support team is available to help you personally.</p>
                </div>
                <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  Contact Us Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
