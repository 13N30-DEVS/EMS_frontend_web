# EMS Frontend Web

## Overview
A modern EMS frontend built with React and TypeScript.

## Features
- Authentication & Role-based Access Control
- Reusable UI Components
- Error Boundaries & Loading Spinners
- Modular Architecture

## Security Components
- **ProtectedRoute**: Restricts access to authenticated users.
- **RoleBasedRoute**: Restricts access based on user roles.
- **SecurityContext**: Provides authentication and role state globally.

## Common Components
- **Button**: Reusable button component.
- **Modal**: Simple modal dialog.
- **Notification**: Toast-style notification for messages.
- **ErrorBoundary**: Catches and displays errors in the UI.
- **LoadingSpinner**: Shows a loading indicator.

## Documentation
See the [docs/](./docs/) directory for:
- Project Overview
- Setup & Installation
- Folder Structure
- Security Practices
- Component Usage

## Usage Example
```tsx
import ProtectedRoute from './src/components/Security/ProtectedRoute';
import Button from './src/components/Common/Button';

<Button onClick={() => alert('Clicked!')}>Click Me</Button>
```

## Getting Started
1. Install dependencies: `npm install`
2. Start the app: `npm start`

---
For more details, see the [docs/](./docs/) directory. 