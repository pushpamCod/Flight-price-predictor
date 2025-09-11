// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com' 
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  PREDICT: '/api/predict',
  HEALTH: '/health',
  MODEL_INFO: '/model-info'
};

// Form Options (matching your Flask backend)
export const FORM_OPTIONS = {
  AIRLINES: [
    'IndiGo',
    'Air India', 
    'Jet Airways',
    'SpiceJet',
    'Multiple carriers',
    'GoAir',
    'Vistara'
  ],
  
  CITIES: [
    'Delhi',
    'Mumbai',
    'Bangalore', 
    'Kolkata',
    'Chennai',
    'Hyderabad'
  ],
  
  DEPARTURE_TIMES: [
    'Early Morning',
    'Morning',
    'Afternoon', 
    'Evening',
    'Night',
    'Late Night'
  ],
  
  ARRIVAL_TIMES: [
    'Early Morning',
    'Morning', 
    'Afternoon',
    'Evening',
    'Night',
    'Late Night'
  ],
  
  STOPS: [
    'Non-stop',
    '1 stop',
    '2 stops',
    '3 stops', 
    '4 stops'
  ],
  
  CLASSES: [
    'Economy',
    'Business'
  ]
};

// Form Field Labels
export const FIELD_LABELS = {
  airline: 'Airline',
  source_city: 'Source City',
  destination_city: 'Destination City', 
  departure_time: 'Departure Time',
  arrival_time: 'Arrival Time',
  stops: 'Stops',
  class: 'Class',
  duration: 'Duration (hours)',
  days_left: 'Days Left'
};

// Form Field Icons (using lucide-react icons)
export const FIELD_ICONS = {
  airline: 'Plane',
  source_city: 'MapPin',
  destination_city: 'Navigation',
  departure_time: 'Clock',
  arrival_time: 'Clock',
  stops: 'RotateCcw',
  class: 'Users',
  duration: 'Timer',
  days_left: 'Calendar'
};

// Default Form Values
export const DEFAULT_FORM_VALUES = {
  airline: '',
  source_city: '',
  destination_city: '',
  departure_time: '',
  arrival_time: '',
  stops: '',
  class: '',
  duration: 2.5,
  days_left: 15
};

// Validation Rules
export const VALIDATION_RULES = {
  duration: {
    min: 0.5,
    max: 24,
    step: 0.1
  },
  days_left: {
    min: 1,
    max: 365,
    step: 1
  }
};

// UI Constants
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  MAX_RETRIES: 3,
  TIMEOUT_DURATION: 10000
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', path: '/', label: 'Home' },
  { name: 'Predict Prices', path: '/predict', label: 'Predict Prices' },
  { name: 'About Us', path: '/about', label: 'About Us' },
  { name: 'Contact Us', path: '/contact', label: 'Contact Us' }
];

// Social Media Links
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    icon: 'Facebook',
    url: 'https://facebook.com/flightpredictor'
  },
  {
    name: 'Instagram', 
    icon: 'Instagram',
    url: 'https://instagram.com/flightpredictor'
  },
  {
    name: 'Twitter',
    icon: 'Twitter', 
    url: 'https://twitter.com/flightpredictor'
  },
  {
    name: 'LinkedIn',
    icon: 'Linkedin',
    url: 'https://linkedin.com/company/flightpredictor'
  },
  {
    name: 'Youtube',
    icon: 'Youtube',
    url: 'https://youtube.com/flightpredictor'
  }
];

// Contact Information
export const CONTACT_INFO = {
  email: 'info@flightprediction.com',
  phone: '+123-456-7890',
  address: '123 Flight Prediction Street, City, Country'
};

// Feature Information
export const FEATURES = [
  {
    title: 'AI-Powered Predictions',
    description: 'Our advanced machine learning algorithms analyze thousands of data points to provide accurate flight price predictions.',
    icon: 'Brain'
  },
  {
    title: 'Real-time Analysis', 
    description: 'Get instant price predictions based on current market conditions, seasonal trends, and historical data.',
    icon: 'Zap'
  },
  {
    title: 'Multiple Airlines',
    description: 'Compare prices across major airlines including IndiGo, Air India, SpiceJet, and more.',
    icon: 'Plane'
  },
  {
    title: 'Easy to Use',
    description: 'Simply enter your travel details and get instant price predictions with a user-friendly interface.',
    icon: 'MousePointer'
  }
];

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please fill in all required fields correctly.',
  PREDICTION_FAILED: 'Failed to get price prediction. Please try again.',
  MODEL_NOT_LOADED: 'Prediction model is not loaded. Please contact support.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
};

// Success Messages  
export const SUCCESS_MESSAGES = {
  PREDICTION_SUCCESS: 'Price prediction generated successfully!',
  FORM_SUBMITTED: 'Form submitted successfully!',
  DATA_LOADED: 'Data loaded successfully!'
};

// Loading Messages
export const LOADING_MESSAGES = {
  PREDICTING: 'Analyzing flight data...',
  LOADING: 'Loading...',
  PROCESSING: 'Processing your request...'
};

// App Metadata
export const APP_CONFIG = {
  name: 'Flight Price Predictor',
  description: 'Get instant flight price predictions powered by AI',
  version: '1.0.0',
  author: 'Flight Prediction Team'
};