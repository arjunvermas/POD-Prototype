import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, ChevronRight, 
  Sparkles, ShieldCheck, MailIcon, Globe, Map
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/users';

const Login = () => {
  const [formData, setFormData] = useState({ email: 'test@test.com', password: 'password123' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      login(user);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white selection:bg-primary/20">
      {/* Left Visual Section */}
      <div className="hidden lg:flex lg:col-span-7 bg-gray-900 relative overflow-hidden items-center justify-center p-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507608616173-5409d20ad630?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-60" 
            alt="Travel background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-transparent to-black/80"></div>
        </div>

        <div className="relative z-10 w-full animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white font-black text-xs uppercase tracking-[0.3em] mb-12 border border-white/10">
            <Sparkles className="w-4 h-4 text-primary-light" />
            <span>Premium Experience Awaits</span>
          </div>
          <h1 className="text-7xl font-black text-white mb-12 leading-none">
            Unlock <br />Your <span className="text-primary-light">World.</span>
          </h1>
          <div className="grid grid-cols-2 gap-12 max-w-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary-light" />
              </div>
              <h4 className="text-lg font-black text-white">Global Exclusive</h4>
              <p className="text-gray-400 font-medium text-sm">Access to premium destinations that others don't see.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary-light" />
              </div>
              <h4 className="text-lg font-black text-white">Total Security</h4>
              <p className="text-gray-400 font-medium text-sm">Every booking is protected by our global insurance partners.</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 flex items-center space-x-4 opacity-50">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-900 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-white text-xs font-black uppercase tracking-widest">Join 2M+ explorers</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-16">
            <Link to="/" className="text-2xl font-black text-gray-900 mb-8 block group">
              <span className="text-primary group-hover:text-primary-dark transition-colors">BookMy</span>Trip
            </Link>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Welcome Back</h2>
            <p className="text-gray-400 font-medium font-sm">Log in to manage your journeys and exclusive deals.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full pl-16 pr-6 py-5 rounded-3xl bg-gray-50 border border-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Password</label>
                <button type="button" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full pl-16 pr-16 py-5 rounded-3xl bg-gray-50 border border-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-gray-900 tracking-widest"
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

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center border border-red-100 flex items-center justify-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 hover:bg-primary transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center group"
            >
              <span>Authenticate Account</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <p className="text-center mt-12 text-sm text-gray-400 font-medium">
            Don't have an account? <Link to="/signup" className="text-primary font-black hover:underline ml-1">Create Explorer ID</Link>
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-6">
          <ShieldCheck className="w-5 h-5 text-gray-200" />
          <Lock className="w-5 h-5 text-gray-200" />
          <Map className="w-5 h-5 text-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Login;
