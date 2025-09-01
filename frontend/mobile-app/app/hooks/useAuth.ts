import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { signIn, signOut, clearError } from '../store/slices/authSlice';
import { signInSchema, SignInFormData } from '../schemas/authSchemas';
import { ZodError } from 'zod';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  // Log auth state changes for debugging
  if (__DEV__) {
    console.log('🔍 useAuth - Current auth state:', {
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      hasUser: !!authState.user,
      hasToken: !!authState.token,
      error: authState.error
    });
  }

  const handleSignIn = useCallback(async (credentials: SignInFormData) => {
    try {
      console.log('🎯 useAuth - Starting sign in process');
      console.log('📝 Credentials:', { email: credentials.email, passwordLength: credentials.password.length });
      
      // Validate credentials
      console.log('🔍 Validating credentials with Zod...');
      signInSchema.parse(credentials);
      console.log('✅ Validation passed');
      
      // Dispatch sign in action
      console.log('🚀 Dispatching sign in action...');
      const result = await dispatch(signIn(credentials)).unwrap();
      console.log('✅ Sign in dispatch successful:', result);
      return { success: true, data: result };
    } catch (error) {
      console.log('❌ Sign in failed in useAuth:', error);
      if (error instanceof ZodError) {
        // @ts-ignore
        console.log('📋 Validation errors:', error.errors);
        const validationErrors: Partial<SignInFormData> = {};
        // @ts-ignore
        error.errors.forEach((err) => {
          if (err.path[0]) {
            validationErrors[err.path[0] as keyof SignInFormData] = err.message;
          }
        });
        console.log('📋 Formatted validation errors:', validationErrors);
        return { success: false, validationErrors };
      }
      console.log('🚫 API/Network error:', error);
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const handleSignOut = useCallback(() => {
    console.log('👋 useAuth - Signing out...');
    dispatch(signOut());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    console.log('🧹 useAuth - Clearing auth error');
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...authState,
    signIn: handleSignIn,
    signOut: handleSignOut,
    clearError: clearAuthError,
  };
};
