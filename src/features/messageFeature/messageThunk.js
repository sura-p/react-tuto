import { messageList, messageListFail } from "./messageAction";

import { apiGet } from "../../services/apiUtils";
import { M_LIST_REQUEST } from "./messageTypes";
export const getMessageList = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: M_LIST_REQUEST });
      const response = await apiGet("Messages",data);
      dispatch(messageList(response.data));
    } catch (error) {
      dispatch(messageListFail(error.response.data.message || "Login failed"));
    }
  };
};
