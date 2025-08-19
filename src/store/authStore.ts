import { toast } from 'react-toastify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { API_ENDPOINTS, AUTH_CONFIG } from '../constants/api';
import { apiService } from '../services/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiService.post<{ user: User; token: string }>(
            API_ENDPOINTS.AUTH.LOGIN,
            {
              emailId: credentials.email,
              password: credentials.password,
            }
          );

          if (response.success && response.data) {
            const { user, token } = response.data;

            // Store token in localStorage using environment variable
            localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);

            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            toast.success('Login successful!');
            return true;
          }

          set({ isLoading: false, error: 'Login failed' });
          return false;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message ?? 'Login failed',
          });
          return false;
        }
      },

      register: async (data: RegisterData): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiService.post<{ user: User; token: string }>(
            API_ENDPOINTS.AUTH.REGISTER,
            data
          );

          if (response.success && response.data) {
            const { user, token } = response.data;

            // Store token in localStorage using environment variable
            localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);

            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            toast.success('Registration successful!');
            return true;
          }

          set({ isLoading: false, error: 'Registration failed' });
          return false;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message ?? 'Registration failed',
          });
          return false;
        }
      },

      logout: () => {
        // Clear token from localStorage using environment variable
        localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
        localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);

        // Call logout API (optional)
        apiService.post(API_ENDPOINTS.AUTH.LOGOUT).catch(() => {
          // Ignore logout API errors
        });

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });

        toast.info('Logged out successfully');
      },

      updateProfile: async (data: Partial<User>): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiService.put<{ user: User }>(
            API_ENDPOINTS.USER.UPDATE,
            data
          );

          if (response.success && response.data) {
            const { user } = response.data;

            set({
              user,
              isLoading: false,
              error: null,
            });

            toast.success('Profile updated successfully!');
            return true;
          }

          set({ isLoading: false, error: 'Profile update failed' });
          return false;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message ?? 'Profile update failed',
          });
          return false;
        }
      },

      fetchProfile: async (): Promise<void> => {
        try {
          set({ isLoading: true, error: null });

          const response = await apiService.get<{ user: User }>(
            API_ENDPOINTS.USER.PROFILE
          );

          if (response.success && response.data) {
            const { user } = response.data;

            set({
              user,
              isLoading: false,
              error: null,
            });
          } else {
            set({ isLoading: false, error: 'Failed to fetch profile' });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message ?? 'Failed to fetch profile',
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
