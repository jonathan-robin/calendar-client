import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/GlobalState";
import { AxiosResponse } from "axios";

export interface ServerResponseToken {
  accessToken: "string";
  refreshToken: "string";
}

function useAxios() {
  const [authState, setAuthState] = useContext(AuthContext);

  const instance = axios.create({
    baseURL: "https://api-calendar-todo.herokuapp.com/api",
  });

  instance.defaults.headers.common[
    "authorization"
  ] = `Bearer ${authState.token}`;

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error);
      console.error(`[response error] [${JSON.stringify(error)}]`);
      console.log("intercept error");
      const originalRequest = error.config;
      if (
        error.config.url != "/refreshToken" &&
        error.response.status === 401 &&
        originalRequest._retry !== true &&
        authState.token != ""
      ) {
        console.log("intercept error TOKEN");
        originalRequest._retry = true;
        if (authState.refreshToken && authState.refreshToken != "") {
          instance.defaults.headers.common[
            "authorization"
          ] = `Bearer ${authState.refreshToken}`;
          console.log("refresh Token");
          await instance
            .post("/RefreshToken")
            .then((response: AxiosResponse<any, ServerResponseToken>) => {
              instance.defaults.headers.common[
                "authorization"
              ] = `Bearer ${response.data.accessToken}`;
              originalRequest.headers[
                "authorization"
              ] = `Bearer ${response.data.accessToken}`;
              setAuthState({ ...authState, token: response.data.accessToken });
            })
            .catch((error) => {
              console.log(error.response.status);
              setAuthState({ ...authState, refreshToken: "" });
            });
          return instance(originalRequest);
        }
      }
    }
  );

  return instance;
}

export default useAxios;
