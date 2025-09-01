import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  // Enable Redux DevTools
  devTools: __DEV__ && {
    name: 'Smart Relief Mobile',
    trace: true,
    traceLimit: 25,
  },
});

// Add state logging for debugging
if (__DEV__) {
  store.subscribe(() => {
    console.log('🔄 Redux State Updated:', store.getState());
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
