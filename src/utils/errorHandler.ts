import { toast } from 'react-toastify';
import { HTTP_STATUS } from '../constants/api';

export class AppError extends Error {
  public status: number;
  public code?: string;
  public details?: any;

  constructor(message: string, status: number = 500, code?: string, details?: any) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const getErrorMessage = (error: any): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

export const getErrorStatus = (error: any): number => {
  if (error instanceof AppError) {
    return error.status;
  }

  if (error?.response?.status) {
    return error.response.status;
  }

  return HTTP_STATUS.INTERNAL_SERVER_ERROR;
};

export const handleApiError = (error: any, customMessage?: string): void => {
  const message = customMessage ?? getErrorMessage(error);
  const status = getErrorStatus(error);

  // Log error for debugging
  console.error('API Error:', {
    message,
    status,
    error,
    timestamp: new Date().toISOString(),
  });

  // Show appropriate toast notification
  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
      toast.error('Session expired. Please login again.');
      // Redirect to login page
      window.location.href = '/login';
      break;
    case HTTP_STATUS.FORBIDDEN:
      toast.error('You do not have permission to perform this action.');
      break;
    case HTTP_STATUS.NOT_FOUND:
      toast.error('The requested resource was not found.');
      break;
    case HTTP_STATUS.BAD_REQUEST:
      toast.error(message);
      break;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      toast.error('Server error. Please try again later.');
      break;
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      toast.error('Service temporarily unavailable. Please try again later.');
      break;
    default:
      toast.error(message);
  }
};

export const handleNetworkError = (error: any): void => {
  if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
    toast.error('Network error. Please check your internet connection.');
  } else if (error.code === 'ECONNABORTED') {
    toast.error('Request timeout. Please try again.');
  } else {
    handleApiError(error);
  }
};

export const isRetryableError = (error: any): boolean => {
  const status = getErrorStatus(error);
  return (
    status >= 500 ||
    status === HTTP_STATUS.BAD_GATEWAY ||
    status === HTTP_STATUS.SERVICE_UNAVAILABLE ||
    error.code === 'NETWORK_ERROR' ||
    error.code === 'ERR_NETWORK' ||
    error.code === 'ECONNABORTED'
  );
}; 