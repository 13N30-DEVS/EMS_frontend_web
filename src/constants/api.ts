export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL ?? 'https://api.example.com',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT ?? '30000'),
  RETRY_ATTEMPTS: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS ?? '3'),
  RETRY_DELAY: parseInt(process.env.REACT_APP_API_RETRY_DELAY ?? '1000'),
};

export const APP_CONFIG = {
  NAME: process.env.REACT_APP_APP_NAME ?? 'React Boilerplate',
  VERSION: process.env.REACT_APP_VERSION ?? '1.0.0',
  DEBUG_MODE: process.env.REACT_APP_ENABLE_DEBUG_MODE === 'true',
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
};

export const AUTH_CONFIG = {
  TOKEN_KEY: process.env.REACT_APP_AUTH_TOKEN_KEY ?? 'authToken',
  REFRESH_TOKEN_KEY: process.env.REACT_APP_REFRESH_TOKEN_KEY ?? 'refreshToken',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
  // Add more endpoints as needed
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const; 