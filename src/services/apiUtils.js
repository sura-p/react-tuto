import axios from "axios";
import { apiConfig, apiKeys } from "./apiConfig";
import { useAuthUser } from "../hooks/selectors/AuthSelector";

export const getUrlByKey = (key) => {
  return apiConfig + apiKeys[key];
};

// export const getUrlByKeyAndParams = (key, params) => {
//   return apiConfig + apiKeys[key]
// }

export const apiGet = (key, args) => {
    console.log("apicall");
    
  if (typeof args === "string") {
    return axios.get(getUrlByKey(key) + args);
  } else if (typeof args === "object") {
    return axios.get(getUrlByKey(key), {
      params: args.params,
      headers: args.headers
    });
  } else {
    return axios.get(getUrlByKey(key), {
      data: args
    });
  }
};

export const apiPost = (key, args) => {
  return axios.post(getUrlByKey(key), args);
};

export const apiPut = (key, args) => {
  return axios.put(getUrlByKey(key), args);
};

export const apiPutUrl = (key, dynamicUrl, args) => {
  return axios.put(getUrlByKey(key) + dynamicUrl, args);
};

export const apiPostUrl = (key, dynamicUrl, args) => {
  return axios.post(getUrlByKey(key) + dynamicUrl, args);
};

export const apiGetUrl = (key, dynamicUrl, args) => {
  return axios.get(getUrlByKey(key) + dynamicUrl, args);
};

export const apiUploadFile = (key, args, config) => {
  return axios.put(getUrlByKey(key), args, config);
};

export const apiDelete = (key, args) => {
  return axios.delete(getUrlByKey(key), args);
};

export const apiDeleteUrl = (key, dynamicUrl, args) => {
  return axios.delete(getUrlByKey(key) + dynamicUrl, args);
};

axios.interceptors.request.use(
  function (config) {
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);

    return Promise.reject(error);
  }
);
