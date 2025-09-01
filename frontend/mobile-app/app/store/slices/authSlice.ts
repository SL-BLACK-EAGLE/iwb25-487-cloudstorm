import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../services/authAPI';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('🚀 Starting sign in with:', { email: credentials.email });
      const response = await authAPI.signIn(credentials);
      console.log('✅ API Response:', response);
      return response;
    } catch (error: any) {
      console.log('❌ Sign in error:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Sign in failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        console.log('🔄 Sign in pending...');
        console.log('📊 Current state before pending:', { 
          isLoading: state.isLoading, 
          isAuthenticated: state.isAuthenticated,
          user: state.user 
        });
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log('✅ Sign in successful:', action.payload);
        console.log('📊 User data received:', action.payload.user);
        console.log('🔑 Token received:', action.payload.token ? 'Yes' : 'No');
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        console.log('📊 Final state after success:', {
          isLoading: state.isLoading,
          isAuthenticated: state.isAuthenticated,
          userEmail: state.user?.email
        });
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log('❌ Sign in failed:', action.payload);
        console.log('📊 Error details:', action.error);
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        console.log('📊 Final state after error:', {
          isLoading: state.isLoading,
          isAuthenticated: state.isAuthenticated,
          error: state.error
        });
      });
  },
});

export const { clearError, signOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;
