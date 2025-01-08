import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivateWithAccessToken = () => {
  const { accessToken } = useAuth(); // get access token from context to put in header
  const refreshToken = useRefreshToken(); //this return the refreshtoken function to refreshToken variable.

  useEffect(() => {
    //used for setting up interceptors when component mounts and remove them when component unmounts.
    //Adds an interceptor to modify the request configuration before the request is sent.
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    //Adds an interceptor to handle responses. if (error.response.status === 403 && !prevRequest?.sent
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          //function to get a new access token.
          const newAccessToken = await refreshToken();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest); //retries the request with new access token
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor); //remove request interceptor when component unmounts
      axiosPrivate.interceptors.response.eject(responseInterceptor); //remove response interceptor when component unmounts
    };
  }, [accessToken, refreshToken]);

  return axiosPrivate; //return axios instance with interceptors
};
