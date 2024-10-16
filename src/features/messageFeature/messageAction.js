import { M_LIST_FAILURE, M_LIST_SUCCESS } from "./messageTypes";

// src/actions/messageActions.js
export const SET_MESSAGE = "SET_MESSAGE";

export const messageList = (message) => ({
  type: M_LIST_SUCCESS,
  payload: message,
});
export const messageListFail = (message) => ({
  type: M_LIST_FAILURE,
  payload: message,
});