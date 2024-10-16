// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
// export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "./authTypes";





export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const logOutRequest = (id) => ({
  type: LOGOUT_REQUEST,
  payload: id
})



