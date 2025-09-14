import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import { NAV_LINKS } from "../../utils/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect with more sensitivity
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".navbar-inner")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`navbar fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/20 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-max section-padding navbar-inner">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div
              className={`p-2 rounded-xl transition-all duration-500 ${
                scrolled
                  ? "bg-blue-500/90 text-white shadow-lg"
                  : "bg-white/20 text-white backdrop-blur-sm"
              } group-hover:scale-110 group-hover:rotate-12`}
            >
              <Plane className="w-6 h-6" />
            </div>
            <span
              className={`font-display font-bold text-xl transition-all duration-500 ${
                scrolled ? "text-white drop-shadow-lg" : "text-white"
              }`}
            >
              Flighty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-all duration-500 hover:scale-105 ${
                  isActiveLink(link.path)
                    ? scrolled
                      ? "text-white drop-shadow-lg"
                      : "text-white"
                    : scrolled
                    ? "text-white/90 hover:text-white drop-shadow-md"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {isActiveLink(link.path) && (
                  <div
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-500 ${
                      scrolled ? "bg-white shadow-lg" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm px-3 py-2 rounded-lg transition-all duration-500 hover:scale-105 ${
                  isActiveLink(link.path)
                    ? scrolled
                      ? "text-white bg-white/20 backdrop-blur-sm shadow-lg"
                      : "text-white bg-white/10 backdrop-blur-sm"
                    : scrolled
                    ? "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {isActiveLink(link.path) && (
                  <div
                    className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full ${
                      scrolled ? "bg-white shadow-lg" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/predict"
              className={`btn-primary transition-all duration-500 hover:scale-110 ${
                scrolled
                  ? "bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-700 shadow-xl backdrop-blur-sm"
                  : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 shadow-lg"
              }`}
            >
              Start Now
            </Link>
            <button
              className={`px-4 py-2 rounded-lg transition-all duration-500 hover:scale-110 ${
                scrolled
                  ? "border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg"
                  : "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Tablet Action Button */}
          <div className="hidden md:flex lg:hidden">
            <Link
              to="/predict"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 hover:scale-105 ${
                scrolled
                  ? "bg-blue-600/90 text-white hover:bg-blue-700/90 shadow-xl backdrop-blur-sm"
                  : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
              }`}
            >
              Start
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={`md:hidden p-2 rounded-lg transition-all duration-500 ${
              scrolled
                ? "text-white hover:bg-white/20 backdrop-blur-sm shadow-lg"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`py-4 space-y-1 transition-all duration-500 ${
              scrolled
                ? "bg-white/20 backdrop-blur-xl rounded-b-xl shadow-2xl border-t border-white/20 mt-2"
                : "bg-white/10 backdrop-blur-xl rounded-xl mt-2 border border-white/20 shadow-xl"
            }`}
          >
            {/* Navigation Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block mx-2 px-4 py-3 rounded-lg font-medium transition-all duration-500 ${
                  isActiveLink(link.path)
                    ? scrolled
                      ? "bg-white/30 text-white border-l-4 border-white backdrop-blur-sm shadow-lg"
                      : "bg-white/20 text-white border-l-4 border-white backdrop-blur-sm"
                    : scrolled
                    ? "text-white/90 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div
              className={`mx-6 my-3 border-t transition-all duration-500 ${
                scrolled ? "border-white/30" : "border-white/20"
              }`}
            />

            {/* Mobile Action Buttons */}
            <div className="px-2 space-y-2">
              <Link
                to="/predict"
                className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-all duration-500 ${
                  scrolled
                    ? "bg-blue-600/90 text-white hover:bg-blue-700/90 shadow-xl backdrop-blur-sm"
                    : "bg-white/90 text-blue-600 hover:bg-white shadow-xl backdrop-blur-sm"
                }`}
              >
                Start Predicting
              </Link>
              <button
                className={`block w-full py-3 px-4 rounded-lg font-medium transition-all duration-500 ${
                  scrolled
                    ? "border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm shadow-lg"
                    : "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                }`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;