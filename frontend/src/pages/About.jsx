import React from 'react';
import { 
  Heart, Target, Users, Smile, Award, Globe, 
  MapPin, ShieldCheck, Zap, Sparkles, ChevronRight
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Happy Travelers", value: "2M+", icon: Smile },
    { label: "Destinations", value: "500+", icon: Globe },
    { label: "Hotels Partnered", value: "1.2M", icon: MapPin },
    { label: "Awards Won", value: "24", icon: Award },
  ];

  const team = [
    { name: "Vikram Malhotra", role: "CEO & Founder", photo: "https://i.pravatar.cc/150?u=12" },
    { name: "Ananya Iyer", role: "Chief Content Officer", photo: "https://i.pravatar.cc/150?u=22" },
    { name: "Zayn Malik", role: "Head of Operations", photo: "https://i.pravatar.cc/150?u=32" },
    { name: "Sanya Gupta", role: "Lead UI/UX Designer", photo: "https://i.pravatar.cc/150?u=42" },
  ];

  return (
    <div className="bg-white min-h-screen pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center py-20 px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/abouthero/2000/1000" 
            alt="About Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-md text-primary-light px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span>Defining The Future Of Travel</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight">
              We make travel <br /><span className="text-primary-light">seamless.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed max-w-2xl">
              BookMyTrip was founded on a simple idea: that exploring the world should be as easy as dreaming about it.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-12 md:p-20 grid grid-cols-2 lg:grid-cols-4 gap-12 border border-gray-100">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-4xl font-black text-gray-900 mb-2">{stat.value}</h4>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="relative rounded-[4rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
            <img src="https://picsum.photos/seed/team/1000/600" alt="Team Working" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-12 -right-12 glass p-8 rounded-[2rem] shadow-2xl max-w-[280px] animate-bounce-slow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-black text-xs uppercase tracking-widest">Industry Winner</span>
            </div>
            <p className="text-sm font-bold text-gray-700 italic">"The most intuitive travel platform of 2024."</p>
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">Helping you explore <br />since 2012.</h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              What started as a small team of travel enthusiasts in a garage has grown into India's leading travel technology ecosystem. We've spent over a decade perfecting our algorithms, building global partnerships, and listening to our travelers to create a platform that doesn't just book trips—it creates stories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-900 font-black uppercase tracking-widest text-xs">
                <Target className="w-4 h-4 text-primary" />
                <span>Our Mission</span>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">To become the world's most trusted companion for every traveler's journey, from planning to landing.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-900 font-black uppercase tracking-widest text-xs">
                <Heart className="w-4 h-4 text-secondary" />
                <span>Our Core Value</span>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">Travelers first. Every decision we make starts with one question: "How does this benefit the explorer?"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-gray-900 mb-6">Meet The Visionaries</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">The humans behind the tech, working tirelessly to make your travel dreams a reality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative mb-8 rounded-[2.5rem] overflow-hidden shadow-xl aspect-square">
                  <img src={member.photo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={member.name} />
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <h4 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors">{member.name}</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="bg-gray-900 rounded-[4rem] p-16 md:p-24 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary opacity-10 rounded-full blur-[100px] -mr-96 -mt-96 animate-pulse"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to start your <br /><span className="text-primary-light italic">own story?</span></h2>
            <p className="text-gray-400 font-medium text-lg mb-12">Join millions of travelers who have already explored the world with BookMyTrip.</p>
            <button className="bg-primary text-white px-12 py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all flex items-center mx-auto space-x-4 group">
              <span>Plan A Trip Now</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
