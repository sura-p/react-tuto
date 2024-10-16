
import {  CU_LIST_FAILURE, CU_LIST_SUCCESS,  } from "./cUTypes";





export const cUserList = (user) => ({
  type: CU_LIST_SUCCESS ,
  payload: user,
});

export const cUserFailure = (error) => ({
  type: CU_LIST_FAILURE,
  payload: error,
});





