import React from 'react';
import { Brain, Target, Users, Award, TrendingUp, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '10,000+', label: 'Predictions Made', icon: TrendingUp },
    { number: '95%', label: 'Accuracy Rate', icon: Target },
    { number: '50+', label: 'Airlines Covered', icon: Users },
    { number: '24/7', label: 'Service Uptime', icon: Zap }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Technology',
      description: 'Our machine learning algorithms are trained on millions of flight data points to provide the most accurate predictions possible.'
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'With over 95% accuracy rate, our predictions help you make informed decisions about your travel bookings.'
    },
    {
      icon: Users,
      title: 'User-Friendly Interface',
      description: 'Simple and intuitive design makes it easy for anyone to get flight price predictions in seconds.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
      </div>

      <div className="container-max section-padding py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 animate-slide-up">
            About Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            We're on a mission to revolutionize flight booking with AI-powered price predictions. 
            Our advanced machine learning technology helps travelers make smarter booking decisions 
            and save money on flights.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card-glass p-6 group hover:bg-white/20 transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Mission Text */}
          <div className="animate-slide-up animation-delay-400">
            <h2 className="font-display font-bold text-3xl text-white mb-6">Our Mission</h2>
            <div className="space-y-4 text-white/90">
              <p className="leading-relaxed">
                At Flight Price Predictor, we believe that everyone deserves access to fair and 
                transparent flight pricing. Our mission is to empower travelers with data-driven 
                insights that help them book flights at the best possible prices.
              </p>
              <p className="leading-relaxed">
                Using cutting-edge machine learning algorithms and vast datasets, we analyze 
                market trends, seasonal patterns, and airline pricing strategies to provide 
                accurate price predictions that you can trust.
              </p>
              <p className="leading-relaxed">
                Whether you're planning a business trip or a family vacation, our platform 
                gives you the confidence to book at the right time and save money on your travels.
              </p>
            </div>
          </div>

          {/* Mission Image/Visual */}
          <div className="animate-slide-up animation-delay-600">
            <div className="card-glass p-8 text-center">
              <Brain className="w-24 h-24 text-blue-400 mx-auto mb-6" />
              <h3 className="font-display font-bold text-2xl text-white mb-4">
                AI-Powered Intelligence
              </h3>
              <p className="text-white/80">
                Our advanced algorithms process millions of data points to deliver 
                accurate predictions you can rely on.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white mb-6 animate-slide-up">
              Why Choose Us
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto animate-slide-up animation-delay-200">
              We combine advanced technology with user-friendly design to deliver 
              the best flight price prediction experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 200 + 400}ms` }}
                >
                  <div className="feature-card text-center h-full group">
                    <IconComponent className="w-12 h-12 text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Section */}
        <div className="card-glass p-8 mb-20 animate-slide-up animation-delay-800">
          <div className="text-center mb-8">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Our Technology
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/90">
            <div>
              <h4 className="font-semibold text-lg text-white mb-3">Machine Learning Model</h4>
              <p className="mb-4">
                Our XGBoost-powered prediction engine analyzes historical flight data, 
                market trends, and seasonal patterns to provide accurate price forecasts.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Real-time data processing</li>
                <li>• Multi-factor analysis</li>
                <li>• Continuous model improvement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white mb-3">Data Sources</h4>
              <p className="mb-4">
                We aggregate data from multiple sources to ensure comprehensive 
                coverage of the Indian aviation market.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Major Indian airlines</li>
                <li>• Historical pricing data</li>
                <li>• Market trend analysis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slide-up animation-delay-1000">
          <div className="card-glass p-8 max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-2xl text-white mb-4">
              Ready to Save on Your Next Flight?
            </h3>
            <p className="text-white/90 mb-6">
              Try our flight price predictor and discover how much you can save 
              on your travel bookings.
            </p>
            <a
              href="/predict"
              className="btn-primary bg-gradient-to-r from-orange-400 to-orange-500 
                       hover:from-orange-500 hover:to-orange-600 inline-block"
            >
              Start Predicting Prices
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;