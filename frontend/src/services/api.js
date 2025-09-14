import axios from 'axios';

// API Endpoints - Updated for deployment
const API_ENDPOINTS = {
  PREDICT: '/api/predict',
  HEALTH: '/api/health',
  MODEL_INFO: '/api/model-info',
  OPTIONS: '/api/options'
};

// Configuration constants
const UI_CONFIG = {
  TIMEOUT_DURATION: 30000, // 30 seconds
  MAX_RETRIES: 3
};

const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  VALIDATION_ERROR: 'Invalid data provided. Please check your inputs.',
  PREDICTION_FAILED: 'Failed to predict flight price. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
};

// Smart API Base URL function
const getApiBaseUrl = () => {
  // In development, use empty string (proxy handles it)
  if (process.env.NODE_ENV === 'development') {
    return ''; // Proxy will handle it
  }
  
  // In production on Vercel, use relative URLs (Vercel proxy handles it)
  // The vercel.json rewrites will proxy /api/* to your Render backend
  return '';
};

const API_BASE_URL = getApiBaseUrl();

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: UI_CONFIG.TIMEOUT_DURATION,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullUrl: `${config.baseURL}${config.url}`,
        data: config.data
      });
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data
      });
    }
    
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      error.message = ERROR_MESSAGES.TIMEOUT_ERROR;
    } else if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          error.message = data?.error || ERROR_MESSAGES.VALIDATION_ERROR;
          break;
        case 401:
          error.message = 'Unauthorized. Please login again.';
          break;
        case 403:
          error.message = 'Access forbidden.';
          break;
        case 404:
          error.message = 'API endpoint not found.';
          break;
        case 500:
          error.message = data?.error || ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          error.message = data?.error || ERROR_MESSAGES.SERVER_ERROR;
      }
    } else if (error.request) {
      // Network error
      error.message = ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      // Something else happened
      error.message = ERROR_MESSAGES.UNKNOWN_ERROR;
    }
    
    return Promise.reject(error);
  }
);

// API Service Class
class ApiService {
  // Flight price prediction
  async predictFlightPrice(flightData) {
    try {
      console.log('Making prediction request with data:', flightData);
      const response = await apiClient.post(API_ENDPOINTS.PREDICT, flightData);
      console.log('Prediction response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Prediction API error:', error);
      throw error; // Let the interceptor handle the error formatting
    }
  }

  // Health check
  async checkHealth() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  // Get model information
  async getModelInfo() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.MODEL_INFO);
      return response.data;
    } catch (error) {
      console.error('Model info error:', error);
      throw error;
    }
  }

  // Get dropdown options
  async getOptions() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.OPTIONS);
      return response.data;
    } catch (error) {
      console.error('Options API error:', error);
      throw error;
    }
  }

  // Retry mechanism for failed requests
  async retryRequest(requestFn, maxRetries = UI_CONFIG.MAX_RETRIES) {
    let lastError;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        const result = await requestFn();
        return result;
      } catch (error) {
        lastError = error;
        
        // Don't retry on client errors (4xx)
        if (error.response?.status >= 400 && error.response?.status < 500) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        if (i < maxRetries) {
          const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s...
          await new Promise(resolve => setTimeout(resolve, delay));
          console.log(`Retrying request (attempt ${i + 2}/${maxRetries + 1})...`);
        }
      }
    }
    
    throw lastError;
  }

  // Validate flight data before sending to API
  validateFlightData(flightData) {
    const required = [
      'airline', 
      'source_city', 
      'destination_city', 
      'departure_time', 
      'arrival_time', 
      'stops', 
      'class'
    ];

    const missing = required.filter(field => !flightData[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    // Validate numeric fields
    if (flightData.duration && (isNaN(flightData.duration) || flightData.duration <= 0)) {
      throw new Error('Duration must be a positive number');
    }

    if (flightData.days_left && (isNaN(flightData.days_left) || flightData.days_left < 1)) {
      throw new Error('Days left must be a positive number');
    }

    return true;
  }

  // Format flight data for API
  formatFlightData(flightData) {
    return {
      airline: flightData.airline,
      source_city: flightData.source_city,
      destination_city: flightData.destination_city,
      departure_time: flightData.departure_time,
      arrival_time: flightData.arrival_time,
      stops: flightData.stops,
      class: flightData.class,
      duration: parseFloat(flightData.duration) || 2.5,
      days_left: parseInt(flightData.days_left) || 15
    };
  }

  // Get formatted prediction with retry
  async getPredictionWithRetry(flightData) {
    // Validate data first
    this.validateFlightData(flightData);
    
    // Format data
    const formattedData = this.formatFlightData(flightData);
    
    // Make request with retry
    return this.retryRequest(() => this.predictFlightPrice(formattedData));
  }

  // Debug method to check current API configuration
  getApiConfig() {
    return {
      baseURL: API_BASE_URL,
      environment: process.env.NODE_ENV,
      endpoints: API_ENDPOINTS,
      fullEndpoints: Object.keys(API_ENDPOINTS).reduce((acc, key) => {
        acc[key] = `${API_BASE_URL}${API_ENDPOINTS[key]}`;
        return acc;
      }, {})
    };
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  predictFlightPrice,
  checkHealth,
  getModelInfo,
  getPredictionWithRetry,
  getOptions
} = apiService;