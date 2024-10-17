// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
// export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./profileTypes";





export const getProfileSuccess = (user) => ({
  type: GET_PROFILE_SUCCESS,
  payload: user,
});

export const getProfileFailure = (error) => ({
  type: GET_PROFILE_FAILURE,
  payload: error,
});

export const updateProfileSuccess = (user) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: user,
});

export const updateProfileFailure = (error) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error,
});

export const updateProfileRequest = () => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: null
})

export const requestProfile = (data) => ({
  type: GET_PROFILE_REQUEST,
  payload: data,
});



