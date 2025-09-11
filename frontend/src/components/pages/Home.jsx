import React from 'react';
import Hero from '../home/Hero';
import Features from '../home/Features';
import ContactSection from '../home/ContactSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <ContactSection />
    </div>
  );
};

export default Home;