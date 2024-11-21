import React , {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';

import { init } from './database/db';


import Navigation from './Navigation';

function App() {

  useEffect(() => {
    // Initialize the database when the app starts
    const initializeDatabase = async () => {
      try {
        await init();
        console.log('Database initialized successfully.');
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeDatabase();
  }, []);
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="light" />
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default registerRootComponent(App);