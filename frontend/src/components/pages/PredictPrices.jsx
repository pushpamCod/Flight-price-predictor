import React, { useState, useEffect } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import PredictionForm from '../predictor/PredictionForm';
import PredictionResult from '../predictor/PredictionResult';
import LoadingSpinner from '../common/LoadingSpinner';
import { usePrediction, useHealthCheck } from '../../hooks/usePrediction';

const PredictPrices = () => {
  const [showResult, setShowResult] = useState(false);
  const {
    loading,
    prediction,
    error,
    predictPrice,
    clearError,
    clearPrediction,
  } = usePrediction();

  const { healthy, checkHealth } = useHealthCheck();

  // Check backend health on component mount
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  // Handle prediction submission
  const handlePrediction = async (flightData) => {
    const result = await predictPrice(flightData);
    if (result.success) {
      setShowResult(true);
    }
  };

  // Handle new prediction
  const handleNewPrediction = () => {
    setShowResult(false);
    clearPrediction();
    clearError();
  };

  // Handle error dismiss
  const handleErrorDismiss = () => {
    clearError();
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 -z-10">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse animation-delay-400"></div>
      </div>

      <div className="container-max section-padding py-8">
        {/* Health Status Indicator */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm ${
              healthy === null
                ? 'bg-yellow-100 text-yellow-800'
                : healthy
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {healthy === null ? (
              <>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span>Checking service status...</span>
              </>
            ) : healthy ? (
              <>
                <Wifi className="w-4 h-4" />
                <span>Service Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span>Service Offline</span>
              </>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 animate-slide-up">
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-red-300 font-medium mb-1">Prediction Error</h4>
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
                <button
                  onClick={handleErrorDismiss}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <LoadingSpinner
              size="large"
              message="Analyzing flight data and predicting prices..."
              variant="prediction"
            />
          </div>
        )}

        {/* Main Content */}
        {!loading && (
          <>
            {!showResult ? (
              // Prediction Form
              <PredictionForm onSubmit={handlePrediction} loading={loading} />
            ) : (
              // Prediction Result
              <PredictionResult result={prediction} onNewPrediction={handleNewPrediction} />
            )}
          </>
        )}

        {/* Service Information */}
        <div className="mt-16 text-center">
          <div className="card-glass p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-display font-bold text-xl mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                  1
                </div>
                <p className="text-sm">
                  Enter your flight details including route, airline, and travel
                  preferences
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                  2
                </div>
                <p className="text-sm">
                  Our AI analyzes market trends, historical data, and multiple factors
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                  3
                </div>
                <p className="text-sm">
                  Get instant, accurate price predictions to help plan your travel
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-xs max-w-2xl mx-auto">
            Disclaimer: Flight price predictions are estimates based on historical
            data and machine learning algorithms. Actual prices may vary due to market
            conditions, availability, and airline pricing strategies. Always verify
            prices with official airline sources before booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictPrices;
