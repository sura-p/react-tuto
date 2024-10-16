// src/reducers/authReducer.js

import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_REQUEST, LOGOUT_REQUEST } from './authTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,    // Set loading to true when login request starts
        error: null,      // Clear any previous errors
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case LOGOUT_REQUEST:
      return {...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
