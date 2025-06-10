# React Frontend Boilerplate

A production-ready React application built with TypeScript, Material-UI, Zustand, and Axios.

## 🚀 Features

- **React 18** with TypeScript for type safety
- **Material-UI (MUI)** for beautiful, responsive UI components
- **Zustand** for lightweight state management
- **Axios** for HTTP requests with automatic retry logic
- **React-Toastify** for user-friendly notifications
- **Comprehensive error handling** with custom error boundaries
- **Authentication system** with persistent login state
- **Responsive layout** with navigation drawer
- **Production-ready** with proper error handling and loading states

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit the .env file with your actual values
   nano .env
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🔧 Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
REACT_APP_API_BASE_URL=https://your-api-url.com

# Application Configuration
REACT_APP_APP_NAME=Your App Name
REACT_APP_VERSION=1.0.0

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG_MODE=true

# Authentication
REACT_APP_AUTH_TOKEN_KEY=authToken
REACT_APP_REFRESH_TOKEN_KEY=refreshToken

# API Timeouts
REACT_APP_API_TIMEOUT=30000
REACT_APP_API_RETRY_ATTEMPTS=3
REACT_APP_API_RETRY_DELAY=1000
```

### Environment Variables Explained

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_BASE_URL` | Your API server URL | `https://api.example.com` | ✅ Yes |
| `REACT_APP_APP_NAME` | Application name | `React Boilerplate` | ❌ No |
| `REACT_APP_ENABLE_DEBUG_MODE` | Enable debug logging | `true` | ❌ No |
| `REACT_APP_AUTH_TOKEN_KEY` | LocalStorage key for auth token | `authToken` | ❌ No |
| `REACT_APP_API_TIMEOUT` | API request timeout (ms) | `30000` | ❌ No |
| `REACT_APP_API_RETRY_ATTEMPTS` | Number of retry attempts | `3` | ❌ No |

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Common/         # Common components (Loading, ErrorBoundary)
│   └── Layout/         # Layout components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── services/           # API services
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔧 Configuration

### API Configuration

The application automatically uses environment variables for configuration. Update your `.env` file to match your API endpoints:

```env
REACT_APP_API_BASE_URL=https://your-api-url.com
```

The API configuration is automatically loaded from environment variables in `src/constants/api.ts`.

## 📚 Usage Examples

### Making API Calls

```typescript
import { useGet, usePost } from '../hooks/useApi';

// GET request
const { data, loading, error, execute } = useGet('/api/users');

// POST request
const { execute: createUser } = usePost('/api/users', {
  onSuccess: (data) => {
    console.log('User created:', data);
  },
  showSuccessToast: true,
  successMessage: 'User created successfully!',
});

// Execute the request
const handleCreateUser = async () => {
  await createUser({ name: 'John Doe', email: 'john@example.com' });
};
```

### Using Authentication

```typescript
import { useAuthStore } from '../store/authStore';

const { user, login, logout, isAuthenticated } = useAuthStore();

// Login
const handleLogin = async () => {
  const success = await login({
    email: 'user@example.com',
    password: 'password123',
  });
  
  if (success) {
    // Redirect or handle success
  }
};

// Logout
const handleLogout = () => {
  logout();
};
```

### Error Handling

```typescript
import { handleApiError } from '../utils/errorHandler';

try {
  const response = await apiService.get('/api/data');
} catch (error) {
  handleApiError(error, 'Custom error message');
}
```

### Custom Components

```typescript
import { LoadingSpinner } from '../components/Common/LoadingSpinner';

// Show loading spinner
<LoadingSpinner message="Loading data..." />

// Full screen loading
<LoadingSpinner fullScreen message="Processing..." />
```

## 🎨 Customization

### Theme Customization

Update the theme in `src/components/Layout/AppLayout.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#your-primary-color',
    },
    secondary: {
      main: '#your-secondary-color',
    },
  },
  // Add more customizations
});
```

### Adding New API Endpoints

1. Add to `src/constants/api.ts`:
```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_FEATURE: {
    LIST: '/api/new-feature',
    CREATE: '/api/new-feature',
    UPDATE: '/api/new-feature/:id',
    DELETE: '/api/new-feature/:id',
  },
};
```

2. Create a service function:
```typescript
// src/services/newFeatureService.ts
import { apiService } from './api';
import { API_ENDPOINTS } from '../constants/api';

export const newFeatureService = {
  getList: () => apiService.get(API_ENDPOINTS.NEW_FEATURE.LIST),
  create: (data: any) => apiService.post(API_ENDPOINTS.NEW_FEATURE.CREATE, data),
  update: (id: string, data: any) => apiService.put(API_ENDPOINTS.NEW_FEATURE.UPDATE.replace(':id', id), data),
  delete: (id: string) => apiService.delete(API_ENDPOINTS.NEW_FEATURE.DELETE.replace(':id', id)),
};
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Build and Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run serve

# Deploy to various platforms
# - Netlify: Drag and drop the build folder
# - Vercel: Connect your GitHub repository
# - AWS S3: Upload build folder to S3 bucket
```

## 🔒 Security Features

- **Authentication token management** with automatic logout on expiration
- **CSRF protection** with proper headers
- **Input validation** on forms
- **Error boundary** to prevent app crashes
- **Secure API calls** with retry logic and timeout handling

## 🚀 Performance Features

- **Code splitting** with React.lazy()
- **Optimized bundle** with tree shaking
- **Caching** with Zustand persistence
- **Lazy loading** for components
- **Request cancellation** to prevent memory leaks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Coding! 🎉** 