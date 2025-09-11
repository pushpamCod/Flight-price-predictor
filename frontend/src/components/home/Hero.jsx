import React from 'react';
import { Plane, Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Modern Gradient Background with Mesh */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10">
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30"></div>
        
        {/* Modern floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        
        {/* Glassmorphism blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-max section-padding py-16">
        {/* Hero Section */}
        <section className="text-center relative min-h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-12 max-w-5xl mx-auto">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-white/80">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>AI-Powered Flight Predictions</span>
            </div>
            
            {/* Main Heading */}
            <div className="relative pb-4">
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 leading-relaxed">
                Welcome to
              </h1>
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 leading-relaxed mt-2 pb-2">
                Flighty
              </h1>
              
              {/* Floating plane icon */}
              <div className="absolute -top-8 right-0 animate-bounce">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10">
                  <Plane className="w-8 h-8 text-blue-300" />
                </div>
              </div>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl leading-relaxed font-light">
              Predict flight prices accurately with our advanced AI prediction tool. 
              <span className="text-white/90 font-medium"> Simply enter your travel details and get instant price forecasts.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mt-12">
              <a
                href="/predict"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 
                         bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold
                         rounded-2xl shadow-2xl shadow-blue-500/25 
                         hover:shadow-3xl hover:shadow-blue-500/40 hover:scale-105 
                         transition-all duration-500 border border-white/10 backdrop-blur-xl"
              >
                <span>Start Predicting</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
              </a>
              
              <a
                href="/about"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 
                         text-white text-lg font-medium rounded-2xl 
                         bg-white/5 backdrop-blur-xl border border-white/20
                         hover:bg-white/10 hover:border-white/30 hover:scale-105
                         transition-all duration-300"
              >
                <span>Learn More</span>
              </a>
            </div>
          </div>
        </section>

        {/* Modern Stats Section */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '10K+', label: 'Happy Travelers', gradient: 'from-blue-400 to-blue-600' },
            { number: '95%', label: 'Accuracy Rate', gradient: 'from-purple-400 to-purple-600' },
            { number: '24/7', label: 'Support Available', gradient: 'from-pink-400 to-pink-600' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative p-8 text-center rounded-3xl bg-white/10 backdrop-blur-xl 
                         border border-white/20 hover:border-white/30 
                         hover:scale-105 hover:bg-white/15
                         transition-all duration-500 shadow-xl"
            >
              {/* Background glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <h3 className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-3`}>
                  {stat.number}
                </h3>
                <p className="text-white/80 font-medium text-lg">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Hero;