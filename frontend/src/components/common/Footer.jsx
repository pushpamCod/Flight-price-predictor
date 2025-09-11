import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Mail, Send, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '../../utils/constants';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const getSocialIcon = (iconName) => {
    const icons = {
      Facebook,
      Instagram,
      Twitter,
      Linkedin,
      Youtube
    };
    return icons[iconName] || Facebook;
  };

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      {/* Main Footer Content */}
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group w-fit">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                <Plane className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl">
                teleport<sup className="text-sm">HQ</sup>
              </span>
            </Link>

            {/* Description */}
            <p className="text-gray-300 max-w-md">
              Subscribe to our newsletter for the latest updates on new features and 
              product releases.
            </p>

            {/* Newsletter Signup */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                           placeholder-gray-400 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="btn-secondary flex items-center justify-center space-x-2 whitespace-nowrap
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribed ? (
                  <>
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe to Newsletter</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-300 
                             hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition-colors duration-300 
                           hover:translate-x-1 transform inline-block"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors duration-300 
                           hover:translate-x-1 transform inline-block"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors duration-300 
                           hover:translate-x-1 transform inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-300 hover:text-white transition-colors duration-300 
                           hover:translate-x-1 transform inline-block"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/predict"
                  className="text-gray-300 hover:text-white transition-colors duration-300 
                           hover:translate-x-1 transform inline-block"
                >
                  Flight Prediction
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-300 hover:text-white transition-colors duration-300 
                           hover:translate-x-1 transform inline-block"
                >
                  Support
                </Link>
              </li>
            </ul>

            {/* Follow Us */}
            <div className="pt-4">
              <h4 className="font-semibold text-base mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const IconComponent = getSocialIcon(social.icon);
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-300 hover:text-white 
                               transition-all duration-300 hover:scale-110"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-max section-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-300 text-sm">
              © 2022 Flight Prediction. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                /privacy-policy
              </Link>
              <Link
                to="/terms-of-use"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                /terms-of-use
              </Link>
              <Link
                to="/cookie-policy"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                /cookie-policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-950/50 border-t border-white/5">
        <div className="container-max section-padding py-4">
          <p className="text-gray-400 text-xs text-center">
            Disclaimer: The flight prediction results are for informational purposes only and should not be 
            considered as financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;