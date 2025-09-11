import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import PredictPrices from './components/pages/PredictPrices';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

// ScrollToTop Component - Automatically scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 
                       flex items-center justify-center p-4">
          <div className="card-glass p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-white/80 mb-6">
              We're sorry, but something unexpected happened. Please refresh the page and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary bg-gradient-to-r from-blue-500 to-purple-600 
                       hover:from-blue-600 hover:to-purple-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 
                 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full 
                     animate-spin mb-4 mx-auto"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

// 404 Not Found Component
const NotFound = () => (
  <div className="min-h-screen pt-20">
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 -z-10"></div>
    
    <div className="container-max section-padding py-16 text-center">
      <div className="card-glass p-12 max-w-2xl mx-auto">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-white/80 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <a
            href="/"
            className="btn-primary bg-gradient-to-r from-blue-500 to-purple-600 
                     hover:from-blue-600 hover:to-purple-700 inline-block"
          >
            Go Home
          </a>
          <div>
            <a
              href="/predict"
              className="text-blue-300 hover:text-blue-200 transition-colors duration-300 underline"
            >
              Try Flight Prediction
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<PredictPrices />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;