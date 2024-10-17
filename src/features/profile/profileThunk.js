import {
  getProfileFailure,
  getProfileSuccess,
  loginFailure,
  loginSuccess,
  logOutRequest,
  signupFailure,
  signupSuccess,
  updateProfileFailure,
  updateProfileSuccess
} from "./profileAction";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "./authTypes";
import { apiGet, apiPost, apiUploadFile } from "../../services/apiUtils";
import { GET_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST } from "./profileTypes";
export const getUserProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PROFILE_REQUEST });
      const response =  await apiGet('GetProfile')
      dispatch(getProfileSuccess(response.data));
    } catch (error) {
      dispatch(getProfileFailure(error.response.data.message));
    }
  };
};

export const updateProfile = (data,config) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const response =  await apiUploadFile('ProfileUpdate',data,config)
      dispatch(updateProfileSuccess(response.data));
    } catch (error) {
      dispatch(updateProfileFailure(error.response.data.message));
    }
    
     
  };
};



