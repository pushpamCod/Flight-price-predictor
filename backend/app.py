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

# Configure CORS for React frontend
CORS(app, origins=['http://localhost:3000', 'https://your-frontend-domain.com'])

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
        # Get model components
        pipeline = model_data['pipeline']
        transform_type = model_data['transform_type']
        transform_params = model_data['transform_params']
        
        # Make prediction
        pred_transformed = pipeline.predict(flight_data)
        pred_original = inverse_transform_target(pred_transformed, transform_type, transform_params)
        
        # Convert to native Python float
        if isinstance(pred_original, np.ndarray):
            return float(pred_original[0])
        else:
            return float(pred_original)
    except Exception as e:
        raise ValueError(f"Prediction error: {str(e)}")

# Initialize sample data for dropdowns
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
    """Main page with prediction form"""
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
    """Get form options for frontend"""
    return jsonify({
        'success': True,
        'options': sample_data
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests"""
    try:
        # Get form data
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
        
        # Validate required fields
        required_fields = ['airline', 'source_city', 'destination_city', 'departure_time', 
                          'arrival_time', 'stops', 'class']
        
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({
                'success': False,
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        # Create DataFrame for prediction
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
        
        # Make prediction
        predicted_price = predict_flight_price(flight_data)
        
        # Ensure all numeric values are native Python types
        predicted_price = float(predicted_price)
        
        # Prepare response with type conversion
        result = {
            'success': True,
            'predicted_price': round(predicted_price, 2),
            'formatted_price': f"₹{predicted_price:,.0f}",
            'flight_details': {
                'airline': str(data.get('airline')),
                'route': f"{data.get('source_city')} → {data.get('destination_city')}",
                'departure': str(data.get('departure_time')),
                'arrival': str(data.get('arrival_time')),
                'stops': str(data.get('stops')),
                'class': str(data.get('class')),
                'duration': f"{float(data.get('duration', 2.5))} hours",
                'days_left': f"{int(data.get('days_left', 15))} days"
            },
            'timestamp': datetime.now().isoformat()
        }
        
        # Convert any remaining numpy types
        result = convert_numpy_types(result)
        
        return jsonify(result)
            
    except Exception as e:
        error_result = {
            'success': False,
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }
        
        # Log error for debugging
        print(f"Prediction error: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        
        return jsonify(error_result), 400

@app.route('/api/predict', methods=['POST'])
def api_predict():
    """API endpoint for predictions"""
    return predict()

@app.route('/health')
def health_check():
    """Health check endpoint"""
    model_status = "loaded" if model_data is not None else "not loaded"
    return jsonify({
        'status': 'healthy',
        'model_status': model_status,
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.route('/model-info')
def model_info():
    """Get model information"""
    if model_data is None:
        return jsonify({
            'success': False,
            'error': 'Model not loaded'
        }), 404
    
    performance = model_data.get('performance', {})
    
    # Convert numpy types to native Python types
    performance_converted = convert_numpy_types(performance)
    
    return jsonify({
        'success': True,
        'model_loaded': True,
        'transform_type': str(model_data.get('transform_type', '')),
        'best_params': convert_numpy_types(model_data.get('best_params', {})),
        'performance': {
            'r2_score': round(float(performance_converted.get('r2_score', 0)), 4),
            'rmse': round(float(performance_converted.get('rmse', 0)), 2),
            'mae': round(float(performance_converted.get('mae', 0)), 2)
        },
        'timestamp': datetime.now().isoformat()
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found',
        'message': 'The requested endpoint does not exist'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'error': 'Internal server error',
        'message': 'An unexpected error occurred'
    }), 500

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        'success': False,
        'error': 'Method not allowed',
        'message': 'The requested method is not allowed for this endpoint'
    }), 405

# Add request logging middleware
@app.before_request
def log_request_info():
    if request.endpoint != 'health_check':  # Skip logging for health checks
        print(f"📨 {request.method} {request.url}")
        if request.is_json and request.get_json():
            print(f"📄 Request data: {request.get_json()}")

@app.after_request
def after_request(response):
    # Add security headers
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response

if __name__ == '__main__':
    print("🚀 Starting Flask Flight Price Prediction API")
    
    # Initialize sample data
    initialize_sample_data()
    
    # Try to load the model
    if load_model():
        print("✅ Model loaded successfully")
        if model_data and 'performance' in model_data:
            perf = convert_numpy_types(model_data['performance'])
            r2_score = perf.get('r2_score', 'N/A')
            rmse = perf.get('rmse', 'N/A')
            if r2_score != 'N/A' and rmse != 'N/A':
                print(f"📊 Model Performance - R²: {float(r2_score):.4f}, RMSE: {float(rmse):.2f}")
            else:
                print(f"📊 Model Performance - R²: {r2_score}, RMSE: {rmse}")
    else:
        print("⚠️ Model not loaded. Please run the training script first to generate 'flight_price_pipeline.pkl'")
        print("ℹ️ API will still start but predictions will fail until model is loaded")
    
    print("\n🌐 API Endpoints:")
    print("📍 Health check: http://localhost:5000/health")
    print("📍 Predict: http://localhost:5000/api/predict")
    print("📍 Model info: http://localhost:5000/model-info")
    print("📍 Options: http://localhost:5000/api/options")
    print("\n🎯 Frontend should connect to: http://localhost:5000")
    
    # Run in development mode
    #app.run(debug=True, host='0.0.0.0', port=5000)
    if __name__ == '__main__':
        port = int(os.environ.get('PORT', 5000))
        app.run(host='0.0.0.0', port=port, debug=False)