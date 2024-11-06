import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PayButton from './components/PayButton';
import HomeScreen from './screens/Home';
import WalletScreen from './screens/Wallet';
import PayScreen from './screens/Pay';
import PanelScreen from './screens/Panel';
import LoginScreen from './screens/Login';
import WelcomeScreen from './screens/Welcome';
import SettingScreen from './screens/Setting'
// import SettingsScreen from './screens/Settings';

import { setFirstTimeUser, setUserLoggedIn } from './actions/actions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const icons = {
  Home: { lib: AntDesign, name: 'home' },
  Wallet: { lib: AntDesign, name: 'creditcard' },
  Panel: { lib: AntDesign, name: 'windows' },
  Settings: { lib: AntDesign, name: 'setting' },
};

function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Pay') {
            return <PayButton onPress={() => navigation.navigate('Pay')} focused={focused} />;
          }

          const { lib: Icon, name } = icons[route.name];
          return <Icon name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#92929c',
        tabBarStyle: {
          backgroundColor: '#131418',
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={{ title: 'Wallet' }} />
      <Tab.Screen name="Pay" component={PayScreen} options={{ title: '' }} />
      <Tab.Screen name="Panel" component={PanelScreen} options={{ title: 'Panel' }} />
      <Tab.Screen name="Settings" component={SettingScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const dispatch = useDispatch();
  const { firstTimeUser, loggedIn, username } = useSelector(state => ({
    firstTimeUser: state.auth.isFirstTimeUser,
    loggedIn: state.auth.isLoggedIn,
    username: state.auth.username,
}));
  console.log('Logged In stage =>' , username);
 
  
  useEffect(() => {
    const checkFirstTimeUser = async () => {
      const isFirstTime = await AsyncStorage.getItem('firstTimeUser');
      if (!isFirstTime) {
        await AsyncStorage.setItem('firstTimeUser', 'true');
        dispatch(setFirstTimeUser(true));
      } else {
        dispatch(setFirstTimeUser(false));
      }

      const isLoggedIn = await AsyncStorage.getItem('loggedIn');
      
      dispatch(setUserLoggedIn(isLoggedIn === 'true'));
    };

    checkFirstTimeUser();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {firstTimeUser ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        ) : !loggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Register AppTabs as a screen in the stack navigator
          <Stack.Screen name="Main" component={AppTabs} />
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
