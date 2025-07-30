# Authentication System

This authentication system provides a complete login/logout flow for the application.

## Features

- **Login Page**: Shows when user is not authenticated
- **Protected Routes**: Main layout with topbar/sidebar only accessible after login
- **Persistent Login**: User session persists across browser refreshes
- **Logout Functionality**: Available in the topbar user menu
- **Loading States**: Proper loading indicators during authentication checks

## Components

### AuthProvider
- Manages authentication state globally
- Provides login/logout functions
- Handles user session persistence

### LoginForm
- Email and password input fields
- Form validation and error handling
- Loading states during login

### AuthLayout
- Centered layout for authentication pages
- Responsive design

## Usage

### Basic Setup
```jsx
import { AuthProvider } from './features/auth';

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
```

### Using Auth in Components
```jsx
import { useAuth } from './features/auth/hooks/useAuth';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Check if user is logged in
  if (!isAuthenticated()) {
    return <Login />;
  }
  
  return <div>Welcome, {user.name}!</div>;
}
```

## Demo Credentials

For testing purposes, any email and password combination will work. The system is designed to be easily replaced with real API authentication.

## Future Enhancements

- Real API integration
- JWT token management
- Password reset functionality
- User registration
- Role-based access control 