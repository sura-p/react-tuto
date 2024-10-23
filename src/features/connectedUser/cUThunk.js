import axios from "axios";
import {
  cUserFailure,
  cUserList,
  cUserListAdd,
  cUserListAddFailure,
} from "./cUAction";

import { apiGet, apiPost } from "../../services/apiUtils";
import { CU_LIST_ADD_REQUEST, U_LIST_REQUEST } from "./cUTypes";
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

export const addPeer = (data) => {
  return async (dispatch) => {
    try {
      
     dispatch({ type: CU_LIST_ADD_REQUEST });
      const response =  await apiPost('AddPeer',data)
      dispatch(cUserListAdd(response.data));
    } catch (error) {
      console.log(error);
      
      dispatch(cUserListAddFailure(error.response.data.message || 'Login failed'));
    }
  };
};


