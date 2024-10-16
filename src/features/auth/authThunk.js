import {
  loginFailure,
  loginSuccess,
  logOutRequest,
  signupFailure,
  signupSuccess
} from "./authAction";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "./authTypes";
import { apiPost } from "../../services/apiUtils";
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const response =  await apiPost('Login',credentials)
      dispatch(loginSuccess(response.data));
      localStorage.setItem('token',response.data.token)
    } catch (error) {
      dispatch(loginFailure(error.response.data.message || 'Login failed'));
    }
  };
};

export const signupUser = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });
     
      const response =  await apiPost('SignUp',credentials)
      dispatch(signupSuccess(response.data));
    } catch (error) {
      dispatch(signupFailure(error.response.data.message || "Signup failed"));
    }
    
     
  };
};

export const logoutUser = (id) => {
  return async (dispatch) => {
    dispatch(logOutRequest(id));
}
}
