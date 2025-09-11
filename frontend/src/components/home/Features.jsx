import React from 'react';
import { MapPin, Clock, Plane, Brain, Zap, MousePointer } from 'lucide-react';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Input Selection',
      subtitle: 'Select Source and Destination for Price Prediction',
      description: 'Choose from major Indian cities including Delhi, Mumbai, Bangalore, Chennai, Kolkata, and Hyderabad for accurate route-based predictions.',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2, 
      title: 'Time Selection',
      subtitle: 'Select Start and End Time for Price Prediction',
      description: 'Pick your preferred departure and arrival times from Early Morning to Late Night for time-sensitive pricing analysis.',
      icon: Clock,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Flight Company Selection', 
      subtitle: 'Predict Prices for Different Flight Companies',
      description: 'Compare predictions across airlines including IndiGo, Air India, SpiceJet, Jet Airways, Vistara, GoAir, and multiple carriers.',
      icon: Plane,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const additionalFeatures = [
    {
      title: 'AI-Powered Predictions',
      description: 'Our advanced machine learning algorithms analyze thousands of data points to provide accurate flight price predictions.',
      icon: Brain,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Real-time Analysis',
      description: 'Get instant price predictions based on current market conditions, seasonal trends, and historical data.',
      icon: Zap, 
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Easy to Use',
      description: 'Simply enter your travel details and get instant price predictions with a user-friendly interface.',
      icon: MousePointer,
      color: 'from-green-500 to-teal-500'
    }
  ];

  const FeatureCard = ({ feature, index, isMain = false }) => {
    const IconComponent = feature.icon;
    
    return (
      <div className={`group relative ${isMain ? 'lg:col-span-1' : ''}`}>
        {/* Background Image for Main Features */}
        {isMain && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-90"></div>
            {feature.id === 3 && (
              <div className="absolute inset-0 bg-black/50"></div>
            )}
          </div>
        )}

        <div className={`relative h-full p-8 rounded-2xl transition-all duration-500 transform 
                       group-hover:scale-105 group-hover:-translate-y-2 ${
          isMain 
            ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white min-h-[400px]' 
            : 'feature-card text-white min-h-[300px]'
        }`}>
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 
                         bg-gradient-to-br ${feature.color} shadow-lg group-hover:shadow-xl 
                         transition-all duration-300`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-2xl group-hover:text-yellow-300 
                         transition-colors duration-300">
              {feature.title}
            </h3>
            
            {feature.subtitle && (
              <h4 className="font-medium text-lg text-white/80">
                {feature.subtitle}
              </h4>
            )}
            
            <p className="text-white/90 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 
                         group-hover:opacity-10 transition-opacity duration-300 
                         from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-blue-900"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-200"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Main Features Grid */}

        {/* Additional Features Section */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            Flight Prediction
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Predict flight prices accurately based on source, destination, start time, 
            end time, flight company, hours, and class.
          </p>
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;