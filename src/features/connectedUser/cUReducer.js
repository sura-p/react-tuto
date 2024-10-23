// src/reducers/authReducer.js

import {U_LIST_REQUEST, CU_LIST_SUCCESS, CU_LIST_FAILURE, P_LIST_REQUEST, P_LIST_SUCCESS, P_LIST_FAILURE, CU_LIST_ADD_REQUEST, CU_LIST_ADD_SUCCESS, CU_LIST_ADD_FAILURE } from './cUTypes';

const initialState = {
  user: [],
  loading: true,
  addLoading:false,
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
        loading: false,
        user: action.payload,
        error: null,
      };
    case CU_LIST_FAILURE:
      return {
        ...state,
    
        loading: false,
        error: action.payload,
      };   

      case CU_LIST_ADD_REQUEST:
      return {
        ...state,
        addLoading: true,   
        error: null,      
      };

    case CU_LIST_ADD_SUCCESS :
      return {
        ...state,
        addLoading: false,
        user: [...state.user.contacts, action.payload],
        error: null,
      };
    case CU_LIST_ADD_FAILURE:
      return {
        ...state,
        addLoading: false,
        error: action.payload,
      };   
   
   
    default:
      return state;
  }
};

export default cUReducer;
