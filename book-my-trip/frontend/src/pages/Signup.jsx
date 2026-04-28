import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, 
  ChevronRight, Sparkles, MapPin, Globe, Compass,
  CheckCircle2, ShieldCheck, Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', password: '', confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: `https://i.pravatar.cc/150?u=${formData.email}`
    };
    login(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Visual Area */}
      <div className="hidden lg:flex lg:col-span-4 bg-primary relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black opacity-5 rounded-full blur-[100px] -ml-64 -mb-64"></div>
        
        <Link to="/" className="text-2xl font-black text-white relative z-10 flex items-center">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-md">
            <Compass className="w-6 h-6" />
          </div>
          BookMyTrip
        </Link>

        <div className="relative z-10 animate-fade-in">
          <h2 className="text-5xl font-black text-white mb-10 leading-none">The world is <br />calling <span className="text-secondary">you.</span></h2>
          <div className="space-y-6">
            {[
              { icon: CheckCircle2, text: "Personalized itineraries based on your DNA" },
              { icon: Heart, text: "Exclusive access to members-only resorts" },
              { icon: ShieldCheck, text: "24/7 priority concierge globally" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4 text-white/90 font-medium">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/20">
          <p className="text-xs font-black text-white uppercase tracking-[0.3em] mb-4 flex items-center">
            <Globe className="w-4 h-4 mr-3 text-secondary animate-pulse" />
            Join our global network
          </p>
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-primary overflow-hidden group hover:z-20 transition-all cursor-pointer">
                <img src={`https://i.pravatar.cc/100?u=${i+50}`} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-primary bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-black text-white">
              +5k
            </div>
          </div>
        </div>
      </div>

      {/* Main Signup Form Section */}
      <div className="lg:col-span-8 flex items-center justify-center p-8 md:p-24 relative overflow-hidden bg-gray-50/30">
        <div className="w-full max-w-2xl">
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Create your account</h1>
            <p className="text-gray-400 font-medium text-lg">Start your 14-day premium trial today. No card required.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white border border-gray-100 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900 placeholder:text-gray-200"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Travel Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="adventure@awaits.com"
                    className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white border border-gray-100 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900 placeholder:text-gray-200"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 00000 00000"
                    className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white border border-gray-100 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900 placeholder:text-gray-200"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Preferred City</label>
                <div className="relative group">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="e.g. New Delhi"
                    className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white border border-gray-100 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900 placeholder:text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white border border-gray-100 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900 tracking-widest placeholder:text-gray-200"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Join the Club</label>
                <div className="flex items-center space-x-3 p-1 bg-gray-100 rounded-3xl border border-gray-100 h-[66px] px-3">
                  <button 
                    type="button"
                    className="flex-grow bg-white h-full rounded-2xl flex items-center justify-center space-x-2 shadow-sm text-xs font-black uppercase tracking-widest text-primary"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Free Account</span>
                  </button>
                  <button 
                    type="button"
                    className="flex-grow h-full rounded-2xl flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-widest text-gray-400 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Business</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button 
                type="submit"
                className="w-full bg-gray-900 text-white py-6 rounded-[2.5rem] font-black text-lg uppercase tracking-[0.3em] shadow-2xl shadow-gray-200 hover:bg-primary transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center group"
              >
                <span>Initiate Adventure</span>
                <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                <p className="text-sm text-gray-400 font-medium">
                  Already have an account? <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">Authenticate</Link>
                </p>
                <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] max-w-[240px] text-center md:text-right leading-relaxed">
                  By clicking initiate, you agree to our <a href="#" className="underline">Traveler Terms</a> & <a href="#" className="underline">Privacy Ops</a>.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
