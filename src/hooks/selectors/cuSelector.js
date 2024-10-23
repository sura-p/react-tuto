import { useSelector } from "react-redux";

export const useCuLoading = () => {
  return useSelector((state) => state.cUList.loading);
};
export const useCuAddLoading = () => {
  return useSelector((state) => state.cUList.addLoading);
};
export const useCuError = () => {
    return useSelector((state) => state.cUList.error);
  };

  export const useCuUser = () => {
    return useSelector((state) => state.cUList.user);
  };
