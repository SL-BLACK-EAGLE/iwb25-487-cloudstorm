import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store';
import { setCredentials } from '../store/slices/authSlice';
import { authAPI } from '../services/authAPI';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🔄 AuthProvider - Initializing auth...');
        const token = await AsyncStorage.getItem('authToken');
        console.log('🔑 AuthProvider - Stored token:', token ? 'Found' : 'Not found');
        
        if (token) {
          console.log('👤 AuthProvider - Getting current user...');
          // Try to get current user with stored token
          const userData = await authAPI.getCurrentUser();
          console.log('✅ AuthProvider - User data retrieved:', userData);
          store.dispatch(setCredentials({ user: userData.user, token }));
          console.log('✅ AuthProvider - Credentials set in store');
        } else {
          console.log('ℹ️ AuthProvider - No stored token, user needs to sign in');
        }
      } catch (error) {
        console.log('❌ AuthProvider - Initialization failed:', error);
        // If token is invalid, remove it
        await AsyncStorage.removeItem('authToken');
        console.log('🧹 AuthProvider - Removed invalid token');
      }
    };

    initializeAuth();
  }, []);

  return <>{children}</>;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log('🏗️ AuthProvider - Rendering with Redux store');
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
};
