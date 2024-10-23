
import {  CU_LIST_ADD_FAILURE, CU_LIST_ADD_REQUEST, CU_LIST_ADD_SUCCESS, CU_LIST_FAILURE, CU_LIST_SUCCESS, P_LIST_FAILURE, P_LIST_REQUEST, P_LIST_SUCCESS,  } from "./cUTypes";





export const cUserList = (user) => ({
  type: CU_LIST_SUCCESS ,
  payload: user,
});

export const cUserFailure = (error) => ({
  type: CU_LIST_FAILURE,
  payload: error,
});

export const cUserListAdd = (newUser) => ({
  type: CU_LIST_ADD_SUCCESS ,
  payload: newUser,
});

export const cUserListAddFailure = (error) => ({
  type: CU_LIST_ADD_FAILURE ,
  payload: error,
});

export const cUserListAddRequest= (user) => ({
  type: CU_LIST_ADD_REQUEST ,
  payload: user,
});



