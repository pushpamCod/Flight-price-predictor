import { useState, useCallback } from 'react';
import apiService from '../services/api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, LOADING_MESSAGES } from '../utils/constants';

/**
 * Custom hook for handling flight price predictions
 */
export const usePrediction = () => {
  const [state, setState] = useState({
    loading: false,
    prediction: null,
    error: null,
    history: []
  });

  // Predict flight price
  const predictPrice = useCallback(async (flightData) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const result = await apiService.getPredictionWithRetry(flightData);
      
      if (result.success) {
        const newPrediction = {
          ...result,
          timestamp: new Date().toISOString(),
          flightData
        };

        setState(prev => ({
          ...prev,
          loading: false,
          prediction: newPrediction,
          error: null,
          history: [newPrediction, ...prev.history.slice(0, 9)] // Keep last 10 predictions
        }));

        return { success: true, data: newPrediction };
      } else {
        throw new Error(result.error || ERROR_MESSAGES.PREDICTION_FAILED);
      }
    } catch (error) {
      const errorMessage = error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        prediction: null
      }));

      return { success: false, error: errorMessage };
    }
  }, []);

  // Clear prediction state
  const clearPrediction = useCallback(() => {
    setState(prev => ({
      ...prev,
      prediction: null,
      error: null
    }));
  }, []);

  // Clear error state
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  // Clear prediction history
  const clearHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      history: []
    }));
  }, []);

  // Get prediction by index from history
  const getPredictionFromHistory = useCallback((index) => {
    return state.history[index] || null;
  }, [state.history]);

  // Remove prediction from history
  const removePredictionFromHistory = useCallback((index) => {
    setState(prev => ({
      ...prev,
      history: prev.history.filter((_, i) => i !== index)
    }));
  }, []);

  return {
    // State
    loading: state.loading,
    prediction: state.prediction,
    error: state.error,
    history: state.history,
    
    // Actions
    predictPrice,
    clearPrediction,
    clearError,
    clearHistory,
    getPredictionFromHistory,
    removePredictionFromHistory
  };
};

/**
 * Custom hook for model information
 */
export const useModelInfo = () => {
  const [state, setState] = useState({
    loading: false,
    modelInfo: null,
    error: null
  });

  const fetchModelInfo = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiService.getModelInfo();
      
      setState(prev => ({
        ...prev,
        loading: false,
        modelInfo: result,
        error: null
      }));

      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        modelInfo: null
      }));

      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    loading: state.loading,
    modelInfo: state.modelInfo,
    error: state.error,
    fetchModelInfo
  };
};

/**
 * Custom hook for health check
 */
export const useHealthCheck = () => {
  const [state, setState] = useState({
    loading: false,
    healthy: null,
    error: null,
    lastCheck: null
  });

  const checkHealth = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiService.checkHealth();
      
      setState(prev => ({
        ...prev,
        loading: false,
        healthy: result.status === 'healthy',
        error: null,
        lastCheck: new Date().toISOString()
      }));

      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error.message || ERROR_MESSAGES.NETWORK_ERROR;
      
      setState(prev => ({
        ...prev,
        loading: false,
        healthy: false,
        error: errorMessage,
        lastCheck: new Date().toISOString()
      }));

      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    loading: state.loading,
    healthy: state.healthy,
    error: state.error,
    lastCheck: state.lastCheck,
    checkHealth
  };
};

export default usePrediction;