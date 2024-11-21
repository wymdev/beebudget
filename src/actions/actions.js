// actions.js
import { getCategories as fetchCategories, addCategory as addToDb, deleteCategory as removeFromDb } from '../database/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser , insertUser } from '../database/db';

// Login Action
export const loginUser = (username,password) => async (dispatch) => {
    try {
        // Call getUser from db.js to validate login credentials
        const user = await getUser(username);
        console.log(user.password);
        if (user && user.password === password) {
            // If user exists and password matches, save login state
            await AsyncStorage.setItem('loggedIn', 'true');
            await AsyncStorage.setItem('username', username);
            // Dispatch login success action
            dispatch({ type: 'LOGIN_SUCCESS', payload: username });
            return { success: true };
        } 
        else {
            // Dispatch login failure action or handle invalid credentials
            // Alert.alert('Error', 'Your information is incorrect or does not exist. Please sign up.');
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid username or password' });
            return { success: false, message: 'Invalid username or password' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Login error' });
        return { success: false, message: 'Login error' };
    }
};

export const registerUser = (username, password) => async (dispatch) => {
    try {
        // console.log('user,password>>>',username,password);
        // Check if the user already exists
        console.log("insert user>>>",username,password);
        
        const existingUser = await getUser(username);

        console.log('existinguser>>>',existingUser);
        
        
        if (existingUser) {
            dispatch({ type: 'REGISTER_FAILURE', payload: 'User already exists' });
            return { success: false, message: 'User already exists' };
        }
        const newUser = await insertUser( username, password );

        if (newUser) {

            await AsyncStorage.setItem('loggedIn', 'true');
            await AsyncStorage.setItem('username', username);
            dispatch({ type: 'REGISTER_SUCCESS', payload: username });
            return { success: true };

        } else {

            dispatch({ type: 'REGISTER_FAILURE', payload: 'Registration failed' });
            return { success: false, message: 'Registration failed' };

        }
    } catch (error) {
        console.error('Error during registration:', error);
        dispatch({ type: 'REGISTER_FAILURE', payload: 'Registration error' });
        return { success: false, message: 'Registration error' };
    }
};

// Logout Action
export const logoutUser = () => async (dispatch) => {
    try {
        // Clear login state in AsyncStorage
        await AsyncStorage.removeItem('loggedIn');
        await AsyncStorage.removeItem('username');

        // Dispatch logout action
        dispatch({ type: 'LOGOUT' });
    } catch (error) {
        console.error('Error clearing login state:', error);
    }
};

export const setFirstTimeUser = (isFirstTime) => (dispatch) => {
    dispatch({ type: 'SET_FIRST_TIME_USER', payload: isFirstTime });
};

// Category Actions
export const loadCategories = () => async (dispatch) => {
    const categories = await fetchCategories();
    dispatch({ type: 'LOAD_CATEGORIES', payload: categories });
};

export const addCategory = (name, icon, color) => async (dispatch) => {
    await addToDb(name, icon, color);
    dispatch(loadCategories());
};

export const deleteCategory = (id) => async (dispatch) => {
    await removeFromDb(id);
    dispatch(loadCategories());
};
