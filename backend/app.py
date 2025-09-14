from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
import json
from datetime import datetime
import traceback

app = Flask(__name__)

# Configure CORS - UPDATED WITH YOUR ACTUAL DOMAINS
CORS(app, origins=[
    'http://localhost:3000',  # Local development
    'https://your-vercel-app.vercel.app',  # Replace with your actual Vercel URL
    'https://*.vercel.app',  # Allow all Vercel subdomains
    'https://flight-price-predictor-7pj6.onrender.com'  # Your backend URL (for testing)
], 
supports_credentials=True,
methods=['GET', 'POST', 'OPTIONS'],
allow_headers=['Content-Type', 'Authorization']
)

# Global variables for model and data
model_data = None
sample_data = None

def load_model():
    """Load the trained model pipeline"""
    global model_data
    try:
        if os.path.exists('flight_price_pipeline.pkl'):
            model_data = joblib.load('flight_price_pipeline.pkl')
            print("✅ Model loaded successfully")
            return True
        else:
            print("❌ Model file 'flight_price_pipeline.pkl' not found")
            return False
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return False

def inverse_transform_target(y_transformed, transform_type, transform_params):
    """Inverse transform target variable back to original scale"""
    if transform_type == 'log':
        shift = transform_params.get('shift', 0)
        return np.exp(y_transformed) + shift if shift < 0 else np.exp(y_transformed)
    elif transform_type == 'sqrt':
        return np.power(y_transformed, 2)
    elif transform_type == 'quantile_normal':
        transformer = transform_params['transformer']
        return transformer.inverse_transform(y_transformed.reshape(-1, 1)).flatten()
    else:
        return y_transformed

def convert_numpy_types(obj):
    """Convert numpy types to native Python types for JSON serialization"""
    if isinstance(obj, np.integer):
        return int(obj)
    elif isinstance(obj, np.floating):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, dict):
        return {key: convert_numpy_types(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy_types(item) for item in obj]
    return obj

def predict_flight_price(flight_data):
    """Make prediction using the loaded model"""
    global model_data
    
    if model_data is None:
        raise ValueError("Model not loaded")
    
    try:
        pipeline = model_data['pipeline']
        transform_type = model_data['transform_type']
        transform_params = model_data['transform_params']
        
        pred_transformed = pipeline.predict(flight_data)
        pred_original = inverse_transform_target(pred_transformed, transform_type, transform_params)
        
        if isinstance(pred_original, np.ndarray):
            return float(pred_original[0])
        else:
            return float(pred_original)
    except Exception as e:
        raise ValueError(f"Prediction error: {str(e)}")

def initialize_sample_data():
    """Initialize sample data for form dropdowns"""
    global sample_data
    sample_data = {
        'airlines': ['IndiGo', 'Air India', 'Jet Airways', 'SpiceJet', 'Multiple carriers', 'GoAir', 'Vistara'],
        'cities': ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad'],
        'times': ['Early Morning', 'Morning', 'Afternoon', 'Evening', 'Night', 'Late Night'],
        'stops': ['Non-stop', '1 stop', '2 stops', '3 stops', '4 stops'],
        'classes': ['Economy', 'Business']
    }

@app.route('/')
def home():
    return jsonify({
        'message': 'Flight Price Predictor API',
        'version': '1.0.0',
        'endpoints': {
            'predict': '/api/predict',
            'health': '/health',
            'model_info': '/model-info',
            'options': '/api/options'
        }
    })

@app.route('/api/options')
def get_options():
    return jsonify({'success': True, 'options': sample_data})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
        
        required_fields = ['airline', 'source_city', 'destination_city', 'departure_time', 
                           'arrival_time', 'stops', 'class']
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({'success': False, 'error': f'Missing fields: {", ".join(missing_fields)}'}), 400
        
        flight_data = pd.DataFrame({
            'airline': [data.get('airline')],
            'source_city': [data.get('source_city')],
            'destination_city': [data.get('destination_city')],
            'departure_time': [data.get('departure_time')],
            'arrival_time': [data.get('arrival_time')],
            'stops': [data.get('stops')],
            'class': [data.get('class')],
            'duration': [float(data.get('duration', 2.5))],
            'days_left': [int(data.get('days_left', 15))]
        })
        
        predicted_price = predict_flight_price(flight_data)
        predicted_price = float(predicted_price)
        
        result = {
            'success': True,
            'predicted_price': round(predicted_price, 2),
            'formatted_price': f"₹{predicted_price:,.0f}",
            'timestamp': datetime.now().isoformat()
        }
        return jsonify(convert_numpy_types(result))
    except Exception as e:
        return jsonify({'success': False, 'error': str(e), 'timestamp': datetime.now().isoformat()}), 400

@app.route('/api/predict', methods=['POST'])
def api_predict():
    return predict()

@app.route('/health')
def health_check():
    model_status = "loaded" if model_data is not None else "not loaded"
    return jsonify({
        'status': 'healthy', 
        'model_status': model_status, 
        'timestamp': datetime.now().isoformat(),
        'message': 'Flight Price Predictor API is running'
    })

@app.route('/model-info')
def model_info():
    if model_data is None:
        return jsonify({'success': False, 'error': 'Model not loaded'}), 404
    performance = convert_numpy_types(model_data.get('performance', {}))
    return jsonify({
        'success': True,
        'model_loaded': True,
        'transform_type': str(model_data.get('transform_type', '')),
        'best_params': convert_numpy_types(model_data.get('best_params', {})),
        'performance': performance,
        'timestamp': datetime.now().isoformat()
    })

# --- Initialize things at import time (important for Render cold starts) ---
initialize_sample_data()
load_model()

# ✅ Do NOT run app.run() here → Render handles it
if __name__ == "__main__":
    # Local dev only
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port, debug=True)