import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { API_CONFIG, HTTP_STATUS, AUTH_CONFIG } from '../constants/api';
import { ApiResponse, RequestConfig } from '../types/api';
import {
  handleApiError,
  handleNetworkError,
  isRetryableError,
} from '../utils/errorHandler';

class ApiService {
  private readonly instance: AxiosInstance;
  private retryCount = 0;

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      config => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => {
        return Promise.reject(new Error(error));
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Request successful
        return response;
      },
      async error => {
        const originalRequest = error.config;

        // Handle retry logic for retryable errors
        if (
          isRetryableError(error) &&
          this.retryCount < API_CONFIG.RETRY_ATTEMPTS
        ) {
          this.retryCount++;

          // Exponential backoff
          const delay =
            API_CONFIG.RETRY_DELAY * Math.pow(2, this.retryCount - 1);

          // Retrying request with exponential backoff

          await new Promise(resolve => setTimeout(resolve, delay));

          return this.instance(originalRequest);
        }

        // Reset retry count
        this.retryCount = 0;

        // Handle specific error cases
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          // Clear auth token and redirect to login
          this.clearAuthToken();
          window.location.href = '/login';
        }

        return Promise.reject(new Error(error));
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }

  private clearAuthToken(): void {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
  }

  private async makeRequest<T>(
    method: string,
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method,
        url,
        data,
        headers: config?.headers,
        timeout: config?.timeout,
        withCredentials: config?.withCredentials,
      };

      const response = await this.instance(axiosConfig);

      return {
        data: response.data,
        message: response.data?.message,
        success: true,
        status: response.status,
      };
    } catch (error: any) {
      if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
        handleNetworkError(error);
      } else {
        handleApiError(error);
      }

      throw error;
    }
  }

  // HTTP Methods
  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('GET', url, undefined, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('POST', url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('PUT', url, data, config);
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('PATCH', url, data, config);
  }

  async delete<T>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('DELETE', url, undefined, config);
  }

  // File upload method
  async upload<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await this.instance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      });

      return {
        data: response.data,
        message: response.data?.message,
        success: true,
        status: response.status,
      };
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  }

  // Download file method
  async download(url: string, filename?: string): Promise<void> {
    try {
      const response = await this.instance.get(url, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename ?? 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export the class for testing purposes
export default ApiService;
