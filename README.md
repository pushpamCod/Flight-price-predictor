<<<<<<< HEAD
# Flight Price Predictor - Full Stack Application

A modern, AI-powered flight price prediction application built with React and Flask. This application uses machine learning algorithms to predict flight prices based on various factors like airline, route, time, and other travel parameters.

## 🚀 Features

- **AI-Powered Predictions**: Uses XGBoost machine learning model for accurate price predictions
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Analysis**: Instant predictions based on user input
- **Multiple Airlines**: Supports major Indian airlines (IndiGo, Air India, SpiceJet, etc.)
- **Interactive Interface**: User-friendly form with validation and error handling
- **Mobile Responsive**: Works seamlessly on all devices

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS for modern, responsive design
- **Routing**: React Router for navigation
- **State Management**: Custom hooks for prediction state
- **API Integration**: Axios for backend communication

### Backend (Flask)
- **Framework**: Flask with CORS support
- **ML Model**: XGBoost algorithm for price prediction
- **Data Processing**: Pandas and NumPy for data handling
- **Model Serving**: Joblib for model serialization/loading

## 📁 Project Structure

```
flight-price-predictor/
├── backend/
│   ├── app.py                          # Flask main application
│   ├── flight_price_pipeline.pkl       # Trained ML model
│   ├── requirements.txt                # Python dependencies
│   └── README.md                       # Backend documentation
│
├── frontend/
│   ├── public/
│   │   ├── index.html                  # Main HTML template
│   │   └── manifest.json               # PWA manifest
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                 # Reusable components
│   │   │   ├── home/                   # Home page components
│   │   │   ├── predictor/              # Prediction components
│   │   │   └── pages/                  # Page components
│   │   │
│   │   ├── services/
│   │   │   └── api.js                  # API service layer
│   │   │
│   │   ├── hooks/
│   │   │   └── usePrediction.js        # Custom prediction hooks
│   │   │
│   │   ├── utils/
│   │   │   └── constants.js            # App constants
│   │   │
│   │   ├── App.jsx                     # Main app component
│   │   ├── index.js                    # React entry point
│   │   └── index.css                   # Global styles
│   │
│   ├── package.json                    # Node dependencies
│   ├── tailwind.config.js              # Tailwind configuration
│   └── postcss.config.js               # PostCSS configuration
│
├── .gitignore                          # Git ignore rules
├── README.md                           # Project documentation
└── docker-compose.yml                  # Docker setup (optional)
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Add your trained model**
   - Place your `flight_price_pipeline.pkl` file in the backend directory
   - Ensure the model is trained with XGBoost and includes transform parameters

5. **Start Flask server**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_ENV=development
```

### API Endpoints

- `GET /health` - Health check
- `POST /api/predict` - Flight price prediction
- `GET /model-info` - Model information
- `GET /api/options` - Form options

## 📊 Model Requirements

Your ML model (`flight_price_pipeline.pkl`) should include:

```python
{
    'pipeline': trained_pipeline,  # Scikit-learn pipeline
    'transform_type': 'log',       # Target transformation type
    'transform_params': {},        # Transformation parameters
    'performance': {               # Model performance metrics
        'r2_score': 0.95,
        'rmse': 1234.56,
        'mae': 987.65
    },
    'best_params': {}              # Model hyperparameters
}
```

### Expected Features
- `airline`: Airline name
- `source_city`: Departure city
- `destination_city`: Arrival city
- `departure_time`: Departure time slot
- `arrival_time`: Arrival time slot
- `stops`: Number of stops
- `class`: Travel class
- `duration`: Flight duration in hours
- `days_left`: Days until departure

## 🎨 UI Components

### Key Components

1. **PredictionForm**: Main form for flight details input
2. **PredictionResult**: Displays prediction results with details
3. **Hero**: Landing page hero section
4. **Features**: Features showcase section
5. **Navbar**: Navigation component
6. **Footer**: Footer with links and information

### Design Features
- **Gradient Backgrounds**: Modern gradient color schemes
- **Glass Morphism**: Frosted glass effect cards
- **Smooth Animations**: CSS animations and transitions
- **Responsive Design**: Mobile-first approach
- **Loading States**: Interactive loading indicators

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### API Testing
Use tools like Postman or curl:

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "airline": "IndiGo",
    "source_city": "Delhi",
    "destination_city": "Mumbai",
    "departure_time": "Morning",
    "arrival_time": "Afternoon",
    "stops": "non-stop",
    "class": "Economy",
    "duration": 2.5,
    "days_left": 15
  }'
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. **Build the app**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy build folder** to your hosting service

### Backend Deployment (Heroku/Railway)

1. **Add Procfile**
   ```
   web: gunicorn app:app
   ```

2. **Update CORS origins** in `app.py` with your frontend URL

3. **Deploy** to your hosting service

### Environment Variables for Production
- `FLASK_ENV=production`
- `API_BASE_URL=https://your-api-domain.com`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Flask-CORS is installed and configured
2. **Model Loading**: Verify `flight_price_pipeline.pkl` exists and is compatible
3. **Port Conflicts**: Change ports in configuration if 3000/5000 are occupied
4. **Build Errors**: Clear node_modules and reinstall dependencies

### Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure the backend is running before starting frontend
4. Check API endpoints are responding

## 🎯 Future Enhancements

- [ ] User authentication and saved predictions
- [ ] Historical price charts and trends
- [ ] Email notifications for price drops
- [ ] Multiple currency support
- [ ] Advanced filtering options
- [ ] Mobile app version
- [ ] Real-time price updates

---

Made with ❤️ by the Flight Price Predictor Team
=======
# Flight-price-predictor
AI-powered flight price prediction web application using React and Flask
>>>>>>> 54da4752e15ffdcd36b53d3ba09c44328aa3ff48
