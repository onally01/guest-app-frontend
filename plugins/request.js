import axios from "axios";
import store from "@/store";
import { getToken } from "@/plugins/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // Let each request carry token--['X-Token'] as a custom key. Please modify it according to the actual situation.
    //   config.headers.common["Authorization"] = "Bearer " + getToken();
    //   // config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log("err!!! " + error); // for debug

    return Promise.reject(error);
  }
);

export default service;
