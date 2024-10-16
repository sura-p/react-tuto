import { useSelector } from "react-redux";


export const useMessageLoading = () => {
    return useSelector((state) => state.messages.loading);
  };
export const useMessageError = () => {
    return useSelector((state) => state.messages.error);
  };

  export const useMessageList = () => {
    return useSelector((state) => state.messages.messages);
  };
  