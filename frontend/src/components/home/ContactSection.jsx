import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constants';

const ContactSection = () => {
  const contactItems = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
      contact: CONTACT_INFO.email,
      action: `mailto:${CONTACT_INFO.email}`
    },
    {
      icon: Phone, 
      title: 'Phone',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
      contact: CONTACT_INFO.phone,
      action: `tel:${CONTACT_INFO.phone}`
    },
    {
      icon: MapPin,
      title: 'Office', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.',
      contact: CONTACT_INFO.address,
      action: `https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-950"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-white/80 text-lg mb-4 animate-fade-in">
            Get in touch with us today!
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 animate-slide-up">
            Contact Us
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactItems.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <div 
                key={index}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="feature-card text-center h-full group-hover:bg-white/20 
                              transition-all duration-300 transform group-hover:scale-105">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl 
                                mb-6 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg 
                                group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-2xl text-white mb-4 
                               group-hover:text-yellow-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <a
                    href={item.action}
                    target={item.icon === MapPin ? '_blank' : '_self'}
                    rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                    className="inline-block font-semibold text-white bg-white/10 backdrop-blur-sm 
                             px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 
                             hover:scale-105 transition-all duration-300"
                  >
                    {item.contact}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16 animate-slide-up animation-delay-600">
          <div className="feature-card inline-block">
            <h3 className="font-display font-bold text-2xl text-white mb-4">
              Ready to Predict Flight Prices?
            </h3>
            <p className="text-white/90 mb-6 max-w-md">
              Start using our AI-powered flight price predictor and make informed travel decisions.
            </p>
            <a
              href="/predict"
              className="btn-primary bg-gradient-to-r from-orange-400 to-orange-500 
                       hover:from-orange-500 hover:to-orange-600"
            >
              Start Predicting Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;