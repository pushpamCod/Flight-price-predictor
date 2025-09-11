import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import FormField from './FormField';
import { 
  FORM_OPTIONS, 
  DEFAULT_FORM_VALUES, 
  VALIDATION_RULES,
  FIELD_LABELS 
} from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

const PredictionForm = ({ onSubmit, loading = false, className = '' }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    const requiredFields = [
      'airline',
      'source_city', 
      'destination_city',
      'departure_time',
      'arrival_time',
      'stops',
      'class'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${FIELD_LABELS[field]} is required`;
      }
    });

    // Same city validation
    if (formData.source_city && formData.destination_city) {
      if (formData.source_city === formData.destination_city) {
        newErrors.destination_city = 'Destination must be different from source';
      }
    }

    // Duration validation
    if (formData.duration) {
      const duration = parseFloat(formData.duration);
      if (isNaN(duration) || duration < VALIDATION_RULES.duration.min || duration > VALIDATION_RULES.duration.max) {
        newErrors.duration = `Duration must be between ${VALIDATION_RULES.duration.min} and ${VALIDATION_RULES.duration.max} hours`;
      }
    }

    // Days left validation
    if (formData.days_left) {
      const daysLeft = parseInt(formData.days_left);
      if (isNaN(daysLeft) || daysLeft < VALIDATION_RULES.days_left.min || daysLeft > VALIDATION_RULES.days_left.max) {
        newErrors.days_left = `Days left must be between ${VALIDATION_RULES.days_left.min} and ${VALIDATION_RULES.days_left.max}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData(DEFAULT_FORM_VALUES);
    setErrors({});
    setTouched({});
  };

  return (
    <div className={`animate-slide-up ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          Flight Price Predictor
        </h2>
        <p className="text-xl text-white/90">
          Get instant flight price predictions powered by AI
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card-glass p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Airline */}
          <FormField
            name="airline"
            label={FIELD_LABELS.airline}
            value={formData.airline}
            onChange={handleChange}
            options={FORM_OPTIONS.AIRLINES}
            required
            error={touched.airline ? errors.airline : null}
          />

          {/* Source City */}
          <FormField
            name="source_city"
            label={FIELD_LABELS.source_city}
            value={formData.source_city}
            onChange={handleChange}
            options={FORM_OPTIONS.CITIES}
            required
            error={touched.source_city ? errors.source_city : null}
          />

          {/* Destination City */}
          <FormField
            name="destination_city"
            label={FIELD_LABELS.destination_city}
            value={formData.destination_city}
            onChange={handleChange}
            options={FORM_OPTIONS.CITIES}
            required
            error={touched.destination_city ? errors.destination_city : null}
          />

          {/* Departure Time */}
          <FormField
            name="departure_time"
            label={FIELD_LABELS.departure_time}
            value={formData.departure_time}
            onChange={handleChange}
            options={FORM_OPTIONS.DEPARTURE_TIMES}
            required
            error={touched.departure_time ? errors.departure_time : null}
          />

          {/* Arrival Time */}
          <FormField
            name="arrival_time"
            label={FIELD_LABELS.arrival_time}
            value={formData.arrival_time}
            onChange={handleChange}
            options={FORM_OPTIONS.ARRIVAL_TIMES}
            required
            error={touched.arrival_time ? errors.arrival_time : null}
          />

          {/* Stops */}
          <FormField
            name="stops"
            label={FIELD_LABELS.stops}
            value={formData.stops}
            onChange={handleChange}
            options={FORM_OPTIONS.STOPS}
            required
            error={touched.stops ? errors.stops : null}
          />

          {/* Class */}
          <FormField
            name="class"
            label={FIELD_LABELS.class}
            value={formData.class}
            onChange={handleChange}
            options={FORM_OPTIONS.CLASSES}
            required
            error={touched.class ? errors.class : null}
          />

          {/* Duration */}
          <FormField
            type="number"
            name="duration"
            label={FIELD_LABELS.duration}
            value={formData.duration}
            onChange={handleChange}
            min={VALIDATION_RULES.duration.min}
            max={VALIDATION_RULES.duration.max}
            step={VALIDATION_RULES.duration.step}
            placeholder="2.5"
            error={touched.duration ? errors.duration : null}
          />

          {/* Days Left */}
          <FormField
            type="number"
            name="days_left"
            label={FIELD_LABELS.days_left}
            value={formData.days_left}
            onChange={handleChange}
            min={VALIDATION_RULES.days_left.min}
            max={VALIDATION_RULES.days_left.max}
            step={VALIDATION_RULES.days_left.step}
            placeholder="15"
            error={touched.days_left ? errors.days_left : null}
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 
                     to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold 
                     py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform 
                     hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <LoadingSpinner 
                size="small" 
                message="Predicting..." 
                variant="prediction"
                className="text-white"
              />
            ) : (
              <>
                <Search className="w-6 h-6" />
                <span className="text-lg">Predict Flight Price</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm 
                     text-white font-semibold py-4 px-8 rounded-lg border border-white/20 
                     hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reset Form</span>
          </button>
        </div>

        {/* Form Summary */}
        {Object.values(formData).some(value => value) && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white font-medium mb-2">Quick Summary:</h4>
            <div className="text-sm text-white/80 space-y-1">
              {formData.airline && <div>Airline: {formData.airline}</div>}
              {formData.source_city && formData.destination_city && (
                <div>Route: {formData.source_city} → {formData.destination_city}</div>
              )}
              {formData.class && <div>Class: {formData.class}</div>}
              {formData.duration && <div>Duration: {formData.duration} hours</div>}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PredictionForm;