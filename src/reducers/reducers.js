import { combineReducers } from 'redux';

// Initial state for authentication
const initialAuthState = {
    isFirstTimeUser: true,
    isLoggedIn: false,
    username: null,
};

// Authentication reducer
const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isLoggedIn: true, username: action.payload };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, username: null };
        case 'SET_FIRST_TIME_USER':
            return { ...state, isFirstTimeUser: action.payload };
        default:
            return state;
    }
};

// Initial state for categories
const initialCategoryState = {
    categories: [],
};

// Categories reducer
const categoryReducer = (state = initialCategoryState, action) => {
    switch (action.type) {
        case 'LOAD_CATEGORIES':
            return { ...state, categories: action.payload };
        default:
            return state;
    }
};

// Combine reducers
export default combineReducers({
    auth: authReducer,
    category: categoryReducer,
});
