import axios from 'axios';
import { API_ENDPOINTS, UI_CONFIG, ERROR_MESSAGES } from '../utils/constants';

// Smart API Base URL function
const getApiBaseUrl = () => {
  // If in development, use empty string (proxy will handle it)
  if (process.env.NODE_ENV === 'development') {
    return ''; // Empty string = relative URLs, proxy handles it
  }
  
  // If in production, use environment variable or fallback to your Render URL
  return process.env.REACT_APP_API_URL || 'https://flight-price-predictor-7pj6.onrender.com';
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

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
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
          // Clear auth token if exists
          localStorage.removeItem('authToken');
          break;
        case 403:
          error.message = 'Access forbidden.';
          break;
        case 404:
          error.message = 'Resource not found.';
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
      const response = await apiClient.post(API_ENDPOINTS.PREDICT, flightData);
      return response.data;
    } catch (error) {
      console.error('Prediction API error:', error);
      throw this.handleError(error, 'prediction');
    }
  }

  // Health check
  async checkHealth() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw this.handleError(error, 'health_check');
    }
  }

  // Get model information
  async getModelInfo() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.MODEL_INFO);
      return response.data;
    } catch (error) {
      console.error('Model info error:', error);
      throw this.handleError(error, 'model_info');
    }
  }

  // Generic request method
  async request(method, endpoint, data = null, options = {}) {
    try {
      const config = {
        method,
        url: endpoint,
        ...options
      };

      if (data) {
        config.data = data;
      }

      const response = await apiClient(config);
      return response.data;
    } catch (error) {
      console.error(`${method.toUpperCase()} ${endpoint} error:`, error);
      throw this.handleError(error, 'generic_request');
    }
  }

  // Error handling
  handleError(error, context) {
    const errorInfo = {
      context,
      message: error.message,
      status: error.response?.status,
      timestamp: new Date().toISOString()
    };

    // Log error details
    console.error('API Service Error:', errorInfo);

    // Return formatted error
    return {
      success: false,
      error: error.message,
      details: errorInfo,
      code: error.response?.status || 'NETWORK_ERROR'
    };
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

  // Upload file (if needed for future features)
  async uploadFile(file, endpoint = '/upload') {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('File upload error:', error);
      throw this.handleError(error, 'file_upload');
    }
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
      apiUrl: process.env.REACT_APP_API_URL,
      endpoints: API_ENDPOINTS
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
  getPredictionWithRetry
} = apiService;