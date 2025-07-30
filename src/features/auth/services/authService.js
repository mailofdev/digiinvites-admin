// authService.js - Authentication service for API calls
class AuthService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  // Login user
  async login(email, password) {
    try {
      // For demo purposes, simulate API call
      // In real app, replace with actual API call:
      // const response = await fetch(`${this.baseURL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo validation - accept any email/password
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Return mock user data
      return {
        success: true,
        user: {
          id: '1',
          email: email,
          name: email.split('@')[0],
          role: 'admin',
          token: 'mock-jwt-token-' + Date.now()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  }

  // Register user
  async register(userData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo validation
      if (!userData.name || !userData.email || !userData.password) {
        throw new Error('All fields are required');
      }

      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Return success response
      return {
        success: true,
        message: 'Registration successful! Please check your email to verify your account.',
        user: {
          id: 'new-user-' + Date.now(),
          email: userData.email,
          name: userData.name,
          role: 'user',
          verified: false
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  }

  // Reset password
  async resetPassword(email) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email) {
        throw new Error('Email is required');
      }

      // Return success response
      return {
        success: true,
        message: 'Password reset link sent to your email!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password reset failed'
      };
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!token) {
        throw new Error('Verification token is required');
      }

      return {
        success: true,
        message: 'Email verified successfully!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Email verification failed'
      };
    }
  }

  // Resend verification email
  async resendVerification(email) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email) {
        throw new Error('Email is required');
      }

      return {
        success: true,
        message: 'Verification email sent!'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to resend verification email'
      };
    }
  }

  // Logout user
  async logout() {
    try {
      // In real app, call logout endpoint:
      // await fetch(`${this.baseURL}/auth/logout`, {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Logout failed'
      };
    }
  }

  // Verify token
  async verifyToken(token) {
    try {
      // In real app, verify token with backend:
      // const response = await fetch(`${this.baseURL}/auth/verify`, {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Token verification failed'
      };
    }
  }

  // Refresh token
  async refreshToken(refreshToken) {
    try {
      // In real app, refresh token:
      // const response = await fetch(`${this.baseURL}/auth/refresh`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ refreshToken })
      // });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Token refresh failed'
      };
    }
  }
}

export default new AuthService();
