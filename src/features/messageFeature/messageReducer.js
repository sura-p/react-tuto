// src/reducers/messageReducer.js
import { M_LIST_FAILURE, M_LIST_REQUEST, M_LIST_SUCCESS } from "./messageTypes";

const initialState = {
  messages: null,
  loading:null,
  error:null
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case M_LIST_REQUEST:
      return {
        ...state,
        messages:null,
        loading:true,
        error:null
      };
    case M_LIST_SUCCESS:
      return {
        ...state,
        messages:action.payload.data[0],
        loading:false,
        error:null
      };

      case M_LIST_FAILURE:
      return {
        ...state,
        messages:null,
        loading:false,
        error:action.payload
      };
    default:
      return state;
  }
};
