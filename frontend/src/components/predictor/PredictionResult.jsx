import React from 'react';
import { 
  Banknote, 
  Plane, 
  Clock, 
  Calendar, 
  Users, 
  MapPin, 
  TrendingUp,
  CheckCircle,
  Copy,
  Share2
} from 'lucide-react';

const PredictionResult = ({ result, onNewPrediction, className = '' }) => {
  const [copied, setCopied] = React.useState(false);

  if (!result) return null;

  // Extract data with proper fallbacks
  const predicted_price = result.predicted_price || result.price || result.prediction || 0;
  const formatted_price = result.formatted_price || `₹${predicted_price.toLocaleString()}`;
  
  // Create flight details from available data with extensive field variations
  const getRouteString = () => {
    const flightData = result.flightData || result;
    
    // Try multiple field name combinations for source/origin
    const source = flightData.source_city || flightData.source || flightData.from || flightData.origin || 
                  flightData.departure_city || flightData.start || flightData.Source;
    
    // Try multiple field name combinations for destination
    const destination = flightData.destination_city || flightData.destination || flightData.to || flightData.dest || 
                       flightData.arrival_city || flightData.end || flightData.Destination;
    
    if (source && destination && source !== 'N/A' && destination !== 'N/A') {
      return `${source} → ${destination}`;
    }
    
    // Fallback to result level route if available
    return result.route || 'Route not available';
  };

  const getAirline = () => {
    const flightData = result.flightData || result;
    return flightData.airline || flightData.carrier || flightData.Airline || 
           result.airline || 'Airline not specified';
  };

  const getClass = () => {
    const flightData = result.flightData || result;
    return flightData.class || flightData.travel_class || flightData.cabin_class || 
           flightData.Class || result.class || 'Economy';
  };

  const getDuration = () => {
    const flightData = result.flightData || result;
    return flightData.duration || flightData.flight_duration || flightData.Duration || 
           result.duration || 'Duration not available';
  };

  const getDeparture = () => {
    const flightData = result.flightData || result;
    return flightData.departure_time || flightData.dep_time || flightData.departure || 
           flightData.depart_time || flightData.Dep_Time || result.departure || 'Departure time not available';
  };

  const getArrival = () => {
    const flightData = result.flightData || result;
    return flightData.arrival_time || flightData.arrive_time || flightData.arrival || 
           flightData.Arrival_Time || result.arrival || 'Arrival time not available';
  };

  const getStops = () => {
    const flightData = result.flightData || result;
    const stops = flightData.total_stops || flightData.stops || flightData.Total_Stops || 
                 flightData.num_stops || result.stops;
    
    if (stops === 0) return 'Non-stop';
    if (stops === 1) return '1 stop';
    if (stops > 1) return `${stops} stops`;
    return 'Stops not specified';
  };

  const getDaysLeft = () => {
    const flightData = result.flightData || result;
    return flightData.days_left || flightData.days_to_departure || flightData.Days_Left || 
           result.days_left || 'Not specified';
  };

  const flight_details = {
    route: getRouteString(),
    airline: getAirline(),
    class: getClass(),
    duration: getDuration(),
    departure: getDeparture(),
    arrival: getArrival(),
    stops: getStops(),
    days_left: getDaysLeft()
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    const textToCopy = `Flight Price Prediction: ${formatted_price}\nRoute: ${flight_details.route}\nAirline: ${flight_details.airline}\nClass: ${flight_details.class}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle share
  const handleShare = async () => {
    const shareData = {
      title: 'Flight Price Prediction',
      text: `Predicted flight price: ${formatted_price} for ${flight_details.route}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  // Get price level indicator
  const getPriceLevel = (price) => {
    if (price < 5000) return { level: 'Low', color: 'text-green-500', bg: 'bg-green-50' };
    if (price < 10000) return { level: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-50' };
    return { level: 'High', color: 'text-red-500', bg: 'bg-red-50' };
  };

  const priceLevel = getPriceLevel(predicted_price);

  return (
    <div className={`animate-slide-up ${className}`}>
      {/* Success Header */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <CheckCircle className="w-8 h-8 text-green-500" />
        <h3 className="text-2xl font-bold text-white">Prediction Complete!</h3>
      </div>

      {/* Main Result Card */}
      <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-2xl p-8 text-white shadow-2xl">
        {/* Price Display */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Banknote className="w-8 h-8" />
            <span className="text-2xl font-semibold">Predicted Price</span>
          </div>
          <div className="text-6xl font-bold mb-2">{formatted_price}</div>
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${priceLevel.bg} ${priceLevel.color} text-sm font-medium`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {priceLevel.level} Price Range
          </div>
        </div>

        {/* Flight Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5 mr-1" />
              <span className="font-semibold">Route:</span>
            </div>
            <div className="text-lg">{flight_details.route}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Plane className="w-5 h-5 mr-1" />
              <span className="font-semibold">Airline:</span>
            </div>
            <div className="text-lg">{flight_details.airline}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 mr-1" />
              <span className="font-semibold">Class:</span>
            </div>
            <div className="text-lg">{flight_details.class}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 mr-1" />
              <span className="font-semibold">Duration:</span>
            </div>
            <div className="text-lg">{flight_details.duration}</div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-medium text-sm">Departure:</span>
            </div>
            <div>{flight_details.departure}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-medium text-sm">Arrival:</span>
            </div>
            <div>{flight_details.arrival}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="font-medium text-sm">Stops:</span>
            </div>
            <div>{flight_details.stops}</div>
          </div>
        </div>

        {/* Final Detail */}
        <div className="text-center mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="font-medium text-sm">Days Left:</span>
          </div>
          <div>{flight_details.days_left}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={onNewPrediction}
          className="flex-1 bg-white/10 backdrop-blur-sm text-white font-semibold py-3 px-6 
                   rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 
                   transform hover:scale-105"
        >
          Make New Prediction
        </button>

        <button
          onClick={handleCopy}
          disabled={copied}
          className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 
                   text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 
                   transform hover:scale-105 disabled:opacity-50"
        >
          <Copy className="w-5 h-5" />
          <span>{copied ? 'Copied!' : 'Copy Details'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 
                   text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 
                   transform hover:scale-105"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Powered By */}
      <div className="text-center mt-6 opacity-75">
        <div className="flex items-center justify-center space-x-2 text-white/80">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Powered by XGBoost Machine Learning Algorithm</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;