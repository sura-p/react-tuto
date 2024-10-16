// src/reducers/authReducer.js

import {U_LIST_REQUEST, CU_LIST_SUCCESS, CU_LIST_FAILURE } from './cUTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const cUReducer = (state = initialState, action) => {
  console.log(action,"action")
  switch (action.type) {
    case U_LIST_REQUEST:
      return {
        ...state,
        loading: true,   
        error: null,      
      };

    case CU_LIST_SUCCESS :
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case CU_LIST_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
   
    default:
      return state;
  }
};

export default cUReducer;
