import axios from "axios";
import {
  cUserFailure,
  cUserList,
} from "./cUAction";

import { apiGet } from "../../services/apiUtils";
import { U_LIST_REQUEST } from "./cUTypes";
export const connectedUserList = (data) => {
  let args = "";
  args  = data!==""?data:""
  
  return async (dispatch) => {
    try {
      
     dispatch({ type: U_LIST_REQUEST });
      const response =  await apiGet('CUList',args)
      dispatch(cUserList(response.data));
    } catch (error) {
      dispatch(cUserFailure(error.response.data.message || 'Login failed'));
    }
  };
};


