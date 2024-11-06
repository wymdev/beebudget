// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers'; // Ensure this path is correct

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persistence
    }).concat(logger), // Add thunk to the default middleware
});

// Create a persistor
export const persistor = persistStore(store);
