// src/reducers/authReducer.js

import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_REQUEST, LOGOUT_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, GET_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from './profileTypes';

const initialState = {
  detail: null,
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:   
      return {
        ...state,
        loading: true,    // Set loading to true when login request starts
        error: null,      // Clear any previous errors
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload,
        error: null,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload,
        error: null,
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_PROFILE_REQUEST:
      return {...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
