import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactItems = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us an email and we\'ll get back to you within 24 hours.',
      contact: CONTACT_INFO.email,
      action: `mailto:${CONTACT_INFO.email}`
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Call us during business hours for immediate assistance.',
      contact: CONTACT_INFO.phone,
      action: `tel:${CONTACT_INFO.phone}`
    },
    {
      icon: MapPin,
      title: 'Office',
      description: 'Visit our office or send us mail to our physical address.',
      contact: CONTACT_INFO.address,
      action: `https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`
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
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 animate-slide-up">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Get in touch with us today! We're here to help you with any questions 
            about flight price predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="animate-slide-up animation-delay-400">
            <h2 className="font-display font-bold text-2xl text-white mb-8">
              Get In Touch
            </h2>
            
            <div className="space-y-6">
              {contactItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
                                    rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                      <p className="text-white/80 mb-3 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <a
                        href={item.action}
                        target={item.icon === MapPin ? '_blank' : '_self'}
                        rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                        className="text-blue-300 hover:text-blue-200 transition-colors duration-300 
                                 hover:underline"
                      >
                        {item.contact}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Business Hours */}
            <div className="mt-8 card-glass p-6">
              <h3 className="font-semibold text-white text-lg mb-4">Business Hours</h3>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up animation-delay-600">
            <div className="card-glass p-8">
              <h2 className="font-display font-bold text-2xl text-white mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/80">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Tell us more about how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r 
                             from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                             text-white font-semibold py-4 px-6 rounded-lg shadow-lg 
                             transition-all duration-300 transform hover:scale-105 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <LoadingSpinner size="small" variant="white" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 animate-slide-up animation-delay-800">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Here are some common questions about our flight price prediction service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-glass p-6">
              <h3 className="font-semibold text-white text-lg mb-3">
                How accurate are the predictions?
              </h3>
              <p className="text-white/80 text-sm">
                Our AI model achieves over 95% accuracy by analyzing historical data, 
                market trends, and multiple pricing factors.
              </p>
            </div>

            <div className="card-glass p-6">
              <h3 className="font-semibold text-white text-lg mb-3">
                Which airlines are covered?
              </h3>
              <p className="text-white/80 text-sm">
                We cover major Indian airlines including IndiGo, Air India, SpiceJet, 
                Vistara, GoAir, and more.
              </p>
            </div>

            <div className="card-glass p-6">
              <h3 className="font-semibold text-white text-lg mb-3">
                Is the service free to use?
              </h3>
              <p className="text-white/80 text-sm">
                Yes! Our flight price prediction service is completely free to use. 
                Simply enter your flight details and get instant predictions.
              </p>
            </div>

            <div className="card-glass p-6">
              <h3 className="font-semibold text-white text-lg mb-3">
                How often is the data updated?
              </h3>
              <p className="text-white/80 text-sm">
                Our machine learning model is continuously updated with the latest 
                market data to ensure accurate predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;