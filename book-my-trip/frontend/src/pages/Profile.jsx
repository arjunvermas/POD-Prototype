import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Camera, Save, 
  CreditCard, ShieldCheck, Bell, Languages, 
  ChevronRight, LogOut, Trash2, PlusCircle, Settings,
  Shield, Globe, Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({
    name: user?.name || 'Rahul Sharma',
    email: user?.email || 'rahul@example.com',
    phone: user?.phone || '+91 98765 43210',
    address: 'B-24, Sector 5, Gurgaon, Haryana, India'
  });

  const sidebarItems = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'payments', label: 'Saved Cards', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-80 space-y-8">
          <div className="glass rounded-[3rem] p-10 border border-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-primary opacity-10 blur-3xl rounded-full -mt-12"></div>
            
            <div className="relative text-center mb-10">
              <div className="relative inline-block group">
                <div className="w-32 h-32 rounded-[2.5rem] p-1 bg-white shadow-2xl relative z-10 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                  <img src={user?.avatar || "https://i.pravatar.cc/150?u=1"} className="w-full h-full object-cover rounded-[2rem]" alt="Profile" />
                </div>
                <button className="absolute bottom-0 right-0 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl z-20 hover:scale-110 active:scale-95 transition-all">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <h2 className="mt-8 text-2xl font-black text-gray-900 leading-tight">{formData.name}</h2>
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Member since Jun 2023</p>
            </div>

            <nav className="space-y-4">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-sm transition-all group ${
                    activeSection === item.id 
                      ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                      : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === item.id ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
              <div className="pt-8 border-t border-gray-100 mt-8">
                <button 
                  onClick={logout}
                  className="w-full flex items-center p-4 rounded-2xl font-black text-sm text-red-500 hover:bg-red-50 transition-all group"
                >
                  <LogOut className="w-5 h-5 mr-4 transition-transform group-hover:-translate-x-1" />
                  <span>Logout Account</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow space-y-12">
          {activeSection === 'personal' && (
            <div className="glass rounded-[3.5rem] p-12 border border-white shadow-2xl relative overflow-hidden animate-fade-in">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-3xl font-black text-gray-900 leading-tight">Personal Information</h3>
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Display Name</label>
                      <input 
                        className="w-full px-6 py-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Email Address</label>
                      <input 
                        disabled
                        className="w-full px-6 py-5 rounded-2xl bg-gray-100 border border-gray-100 text-gray-400 font-bold opacity-70 cursor-not-allowed"
                        value={formData.email}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Contact Number</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                        <input 
                          className="w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Home City</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                        <input 
                          className="w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900"
                          value="Gurgaon, India"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Postal Address</label>
                    <textarea 
                      className="w-full px-6 py-5 rounded-2xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900 h-32"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <hr className="border-gray-50" />

                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center"
                    >
                      <Save className="w-5 h-5 mr-3" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="glass rounded-[3.5rem] p-12 border border-white shadow-2xl relative overflow-hidden animate-fade-in">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-black text-gray-900">Payment Methods</h3>
                <button className="flex items-center text-primary font-black text-xs uppercase tracking-widest hover:underline">
                  <PlusCircle className="w-5 h-5 mr-2" /> Add New Card
                </button>
              </div>

              <div className="space-y-8">
                {[
                  { type: 'Visa', number: '**** **** **** 4242', exp: '12/26', color: 'bg-gradient-to-br from-indigo-600 to-indigo-900' },
                  { type: 'Mastercard', number: '**** **** **** 8888', exp: '08/25', color: 'bg-gradient-to-br from-gray-800 to-black' },
                ].map((card, i) => (
                  <div key={i} className={`${card.color} p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden group hover:scale-[1.01] transition-transform shadow-2xl`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <span className="font-black text-lg tracking-[0.2em]">{card.type}</span>
                      </div>
                      <p className="text-2xl font-black tracking-[0.4em] font-mono">{card.number}</p>
                      <div className="flex space-x-12">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block">Owner</span>
                          <span className="text-sm font-bold">{formData.name}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block">Expiry</span>
                          <span className="text-sm font-bold">{card.exp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-8 md:mt-0 relative z-10">
                      <button className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/40 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="glass rounded-[3.5rem] p-12 border border-white shadow-2xl relative overflow-hidden animate-fade-in">
              <h3 className="text-3xl font-black text-gray-900 mb-12">App Settings</h3>
              <div className="space-y-6">
                {[
                  { title: 'Email Notifications', desc: 'Get updates on your booking status', icon: Bell, active: true },
                  { title: 'App Language', desc: 'English (US)', icon: Globe, active: false },
                  { title: 'Currency', desc: 'Indian Rupee (INR)', icon: Briefcase, active: false },
                  { title: 'Marketing Emails', desc: 'Receive travel deals and offers', icon: Languages, active: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-8 rounded-[2rem] bg-white border border-gray-50 hover:shadow-xl transition-all group">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-400 font-medium">{item.desc}</p>
                      </div>
                    </div>
                    <div className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${item.active ? 'bg-primary' : 'bg-gray-200'}`}>
                      <div className={`w-6 h-6 bg-white rounded-full transition-transform shadow-sm ${item.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
