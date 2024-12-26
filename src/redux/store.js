// Redux Toolkit Imports
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist'; // Persist utilities
import {apiSlice} from './api/apiSlice';
import authReducer from './auth/authSlice';

// Configurations for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['users'],
};

// Combine your reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,

  auth: authReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

// Export the persistor
export const persistor = persistStore(store);
