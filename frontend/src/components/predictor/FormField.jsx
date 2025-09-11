import React from 'react';
import { 
  Plane, 
  MapPin, 
  Navigation, 
  Clock, 
  RotateCcw, 
  Users, 
  Timer, 
  Calendar,
  ChevronDown
} from 'lucide-react';

const FormField = ({ 
  type = 'select', 
  name, 
  label, 
  value, 
  onChange, 
  options = [], 
  required = false, 
  error = null,
  placeholder = '',
  min,
  max,
  step,
  disabled = false
}) => {
  // Icon mapping
  const getIcon = (fieldName) => {
    const iconMap = {
      airline: Plane,
      source_city: MapPin,
      destination_city: Navigation,
      departure_time: Clock,
      arrival_time: Clock,
      stops: RotateCcw,
      class: Users,
      duration: Timer,
      days_left: Calendar
    };
    return iconMap[fieldName] || MapPin;
  };

  const IconComponent = getIcon(name);

  const baseClasses = `
    w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 outline-none
    ${error 
      ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white hover:border-gray-400'}
  `;

  const selectClasses = `${baseClasses} cursor-pointer appearance-none`;

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <IconComponent className={`w-5 h-5 ${
            error ? 'text-red-400' : 'text-gray-400'
          }`} />
        </div>

        {/* Select Field */}
        {type === 'select' && (
          <>
            <select
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              className={selectClasses}
            >
              <option value="">
                {placeholder || `Select ${label.toLowerCase()}`}
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
            {/* Dropdown Arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className={`w-5 h-5 ${
                error ? 'text-red-400' : 'text-gray-400'
              }`} />
            </div>
          </>
        )}

        {/* Number Field */}
        {type === 'number' && (
          <input
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={baseClasses}
          />
        )}

        {/* Text Field */}
        {type === 'text' && (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            required={required}
            disabled={disabled}
            className={baseClasses}
          />
        )}

        {/* Range Field */}
        {type === 'range' && (
          <div className="space-y-2">
            <input
              type="range"
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                       slider:bg-blue-500 slider:rounded-lg"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{min}</span>
              <span className="font-medium text-blue-600">{value}</span>
              <span>{max}</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1 animate-slide-up">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          <span>{error}</span>
        </p>
      )}

      {/* Helper Text for specific fields */}
      {name === 'duration' && !error && (
        <p className="text-xs text-gray-500">
          Typical flight duration in hours (e.g., 2.5 for 2 hours 30 minutes)
        </p>
      )}
      
      {name === 'days_left' && !error && (
        <p className="text-xs text-gray-500">
          Number of days until departure
        </p>
      )}
    </div>
  );
};

// Specialized form field components
export const SelectField = (props) => <FormField type="select" {...props} />;
export const NumberField = (props) => <FormField type="number" {...props} />;
export const TextField = (props) => <FormField type="text" {...props} />;
export const RangeField = (props) => <FormField type="range" {...props} />;

export default FormField;