// actions.js
import { getCategories as fetchCategories, addCategory as addToDb, deleteCategory as removeFromDb } from '../database/db';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login Action
export const loginUser = (username) => async (dispatch) => {
    try {
        // Save login state in AsyncStorage
        await AsyncStorage.setItem('loggedIn', 'true');
        await AsyncStorage.setItem('username', username);

        // Dispatch login success
        dispatch({ type: 'LOGIN_SUCCESS', payload: username });
    } catch (error) {
        console.error('Error storing login state:', error);
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
