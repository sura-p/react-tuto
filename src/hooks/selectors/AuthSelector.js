import { useSelector } from "react-redux";

export const useAuthLoading = () => {
  return useSelector((state) => state.auth.loading);
};
export const useAuthError = () => {
    return useSelector((state) => state.auth.error);
  };

  export const useAuthUser = () => {
    return useSelector((state) => state.auth.user);
  };
