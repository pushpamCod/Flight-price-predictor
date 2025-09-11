import React from 'react';
import { Loader2, Plane } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  variant = 'default',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const messageClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  const variants = {
    default: {
      spinner: 'text-blue-500',
      message: 'text-gray-600'
    },
    white: {
      spinner: 'text-white',
      message: 'text-white'
    },
    primary: {
      spinner: 'text-blue-500',
      message: 'text-blue-600'
    },
    prediction: {
      spinner: 'text-purple-500',
      message: 'text-purple-600'
    }
  };

  const currentVariant = variants[variant] || variants.default;

  if (variant === 'prediction') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        {/* Animated plane */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse">
            <Plane className={`${sizeClasses[size]} ${currentVariant.spinner} transform rotate-45`} />
          </div>
          <Plane className={`${sizeClasses[size]} ${currentVariant.spinner} transform rotate-45 animate-bounce`} />
        </div>
        
        {message && (
          <div className={`${messageClasses[size]} ${currentVariant.message} font-medium text-center`}>
            {message}
          </div>
        )}
        
        {/* Progress dots */}
        <div className="flex space-x-1">
          <div className={`w-2 h-2 bg-purple-500 rounded-full animate-pulse`}></div>
          <div className={`w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-200`}></div>
          <div className={`w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-400`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} ${currentVariant.spinner} animate-spin`} />
      {message && (
        <div className={`${messageClasses[size]} ${currentVariant.message} font-medium text-center`}>
          {message}
        </div>
      )}
    </div>
  );
};

// Inline loading spinner for buttons
export const InlineSpinner = ({ size = 'small', className = '' }) => {
  return (
    <Loader2 className={`${sizeClasses[size]} text-current animate-spin ${className}`} />
  );
};

// Full screen loading overlay
export const FullScreenLoader = ({ message = 'Loading...', show = true }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm mx-4">
        <LoadingSpinner 
          size="large" 
          message={message} 
          variant="primary"
          className="py-4"
        />
      </div>
    </div>
  );
};

// Card loading skeleton
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-300 rounded-lg h-48 w-full mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 rounded h-4 w-3/4"></div>
        <div className="bg-gray-300 rounded h-4 w-1/2"></div>
        <div className="bg-gray-300 rounded h-4 w-2/3"></div>
      </div>
    </div>
  );
};

// Button loading state
export const ButtonLoading = ({ children, loading = false, ...props }) => {
  return (
    <button {...props} disabled={loading || props.disabled}>
      <div className="flex items-center justify-center space-x-2">
        {loading && <InlineSpinner />}
        <span>{children}</span>
      </div>
    </button>
  );
};

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8', 
  large: 'w-12 h-12',
  xlarge: 'w-16 h-16'
};

export default LoadingSpinner;