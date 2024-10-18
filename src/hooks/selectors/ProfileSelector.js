import { useSelector } from "react-redux";

export const useProfileLoading = () => {
  return useSelector((state) => state.profile.loading);
};
export const useProfileError = () => {
    return useSelector((state) => state.profile.error);
  };

  export const useProfileDetail = () => {
    return useSelector((state) => state.profile.detail);
  };

