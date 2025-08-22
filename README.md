# EMS Frontend Web Application

A modern, production-ready React application built with TypeScript, Material-UI, and best practices for enterprise management systems.

## 🚀 Features

- **Modern React 19** with TypeScript
- **Material-UI v7** for beautiful, accessible components
- **Zustand** for lightweight state management
- **React Router v6** with protected routes
- **Comprehensive testing** with Jest and React Testing Library
- **Code quality tools** with ESLint, Prettier, and Husky
- **PWA support** with service workers
- **Performance optimizations** with lazy loading and React.memo
- **Security features** with authentication and role-based access control

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with retry logic
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier, Husky
- **Build Tool**: Create React App
- **PWA**: Service Worker, Web App Manifest

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+ or yarn 1.22+
- Git

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd EMS-FRONTEND-WEB
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp env.example .env.local
```
Edit `.env.local` with your configuration values.

### 4. Start development server
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ci` | Run tests for CI/CD |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |
| `npm run sonar` | Run SonarQube analysis |

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Common/         # Reusable UI components
│   ├── Layout/         # Layout components
│   └── Security/       # Security and routing
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── services/           # API services
├── store/              # State management (Zustand)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── routes/             # Route definitions
```

## 🧪 Testing

The project uses Jest and React Testing Library for comprehensive testing:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

### Test Structure
- **Unit Tests**: Component behavior and logic
- **Integration Tests**: Component interactions
- **Coverage**: Minimum 70% coverage required

## 📝 Code Quality

### ESLint Configuration
- TypeScript support
- React best practices
- Accessibility rules
- Import ordering
- Prettier integration

### Prettier Configuration
- Consistent code formatting
- Single quotes
- 80 character line length
- Trailing commas

### Pre-commit Hooks (Husky)
- Type checking
- Linting
- Format checking
- Test execution

## 🔒 Security Features

- **Authentication**: JWT-based authentication
- **Route Protection**: Protected routes for authenticated users
- **Role-based Access**: Role-based route access control
- **Input Validation**: Form validation and sanitization
- **Rate Limiting**: Login attempt rate limiting

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of routes
- **React.memo**: Component memoization
- **Bundle Optimization**: Tree shaking and minification
- **PWA**: Service worker for offline support
- **Image Optimization**: Optimized asset loading

## 📱 PWA Features

- **Service Worker**: Offline functionality
- **Web App Manifest**: App-like experience
- **Installable**: Add to home screen
- **Offline Support**: Basic offline functionality

## 🌍 Environment Configuration

Create a `.env.local` file with the following variables:

```env
# API Configuration
REACT_APP_API_BASE_URL=https://your-api-url.com
REACT_APP_API_TIMEOUT=30000
REACT_APP_API_RETRY_ATTEMPTS=3
REACT_APP_API_RETRY_DELAY=1000

# App Configuration
REACT_APP_APP_NAME=EMS Frontend
REACT_APP_VERSION=1.0.0
REACT_APP_ENABLE_DEBUG_MODE=false
REACT_APP_ENABLE_ANALYTICS=false

# Authentication
REACT_APP_AUTH_TOKEN_KEY=authToken
REACT_APP_REFRESH_TOKEN_KEY=refreshToken
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment-specific Builds
```bash
# Development
npm run build

# Production
REACT_APP_ENV=production npm run build

# Staging
REACT_APP_ENV=staging npm run build
```

## 🤝 Contributing

### Development Workflow
1. Create a feature branch
2. Make your changes
3. Run quality checks: `npm run lint && npm run format:check && npm run type-check`
4. Write/update tests
5. Commit with conventional commit message
6. Push and create a pull request

### Commit Message Format
```
type(scope): description

feat(auth): add password reset functionality
fix(api): resolve authentication token issue
docs(readme): update installation instructions
```

## 📊 Monitoring & Analytics

- **Performance Monitoring**: Web Vitals tracking
- **Error Tracking**: Comprehensive error handling
- **User Analytics**: Optional Google Analytics integration
- **SonarQube**: Code quality analysis

## 🔧 Troubleshooting

### Common Issues

#### Dependency Conflicts
```bash
npm install --legacy-peer-deps
```

#### TypeScript Errors
```bash
npm run type-check
```

#### Linting Issues
```bash
npm run lint:fix
```

#### Test Failures
```bash
npm run test:coverage
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using modern web technologies** 