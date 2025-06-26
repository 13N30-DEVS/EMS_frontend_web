import { useState, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { apiService } from '../services/api';
import { ApiResponse } from '../types/api';
import { handleApiError } from '../utils/errorHandler';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  setData: (data: T) => void;
}

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
}

const handleSuccess = <T>(
  response: ApiResponse<T>,
  options: UseApiOptions,
  setState: (data: T) => void
) => {
  setState(response.data!);
  if (options.showSuccessToast && options.successMessage) {
    toast.success(options.successMessage);
  }
  if (options.onSuccess) {
    options.onSuccess(response.data);
  }
};

const handleError = (
  error: any,
  options: UseApiOptions,
  setStateError: (errorMessage: string) => void
) => {
  const errorMessage = error.message || 'An error occurred';
  setStateError(errorMessage);
  if (options.showErrorToast !== false) {
    handleApiError(error);
  }
  if (options.onError) {
    options.onError(error);
  }
};

export function useApi<T = any>(
  apiCall: (...args: any[]) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiCall(...args);

        if (response.success && response.data) {
          handleSuccess(response, options, data =>
            setState({ data, loading: false, error: null })
          );
          return response.data;
        }
        throw new Error(response.message || 'Request failed');
      } catch (error: any) {
        if (error.name === 'AbortError') {
          return null;
        }
        handleError(error, options, errorMessage =>
          setState(prev => ({ ...prev, loading: false, error: errorMessage }))
        );
        return null;
      } finally {
        abortControllerRef.current = null;
      }
    },
    [apiCall, options]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}

// Specific hooks for common API operations
export function useGet<T = any>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  return useApi<T>(() => apiService.get<T>(url), options);
}

export function usePost<T = any>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  return useApi<T>((data?: any) => apiService.post<T>(url, data), options);
}

export function usePut<T = any>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  return useApi<T>((data?: any) => apiService.put<T>(url, data), options);
}

export function useDelete<T = any>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  return useApi<T>(() => apiService.delete<T>(url), options);
}

export function useUpload<T = any>(
  url: string,
  options: UseApiOptions = {}
): UseApiReturn<T> & { uploadProgress: number } {
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const uploadApi = useCallback(
    (file: File) => apiService.upload<T>(url, file, setUploadProgress),
    [url]
  );

  const apiHook = useApi<T>(uploadApi, options);

  return {
    ...apiHook,
    uploadProgress,
  };
} 