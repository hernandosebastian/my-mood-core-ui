import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { IApiResponseError } from "./interfaces/api-response-error.interface";
import { IRefreshTokenResponse } from "@/features/authentication/dto/refresh-token.dto";
import { ApiResponseError } from "./errors/api-response-error";
import { IHTTPRequestService } from "./interfaces/http-request-service.interface";
import {
  getCookie,
  StoredCookies,
  setAccessTokenCookie,
} from "@/services/cookies";

function createErrorHandler(instance: AxiosInstance) {
  return async function handleAxiosError(
    error: unknown | Error | AxiosError<IApiResponseError>
  ): Promise<AxiosResponse<unknown, unknown>> {
    if (!axios.isAxiosError<IApiResponseError>(error) || !error.response)
      return Promise.reject(error);

    const originalRequest = error.config;
    const shouldRefresh =
      error.response.status === 401 &&
      error.response.data.error === "TokenExpired";
    if (shouldRefresh && originalRequest) {
      const refreshResponse = await instance.post<IRefreshTokenResponse>(
        "/auth/refresh",
        {
          username: getCookie(StoredCookies.USERNAME),
          refreshToken: getCookie(StoredCookies.REFRESH_TOKEN),
        }
      );

      setAccessTokenCookie(refreshResponse.data.accessToken);
      const authorization = `Bearer ${refreshResponse.data.accessToken}`;
      instance.defaults.headers.common["Authorization"] = authorization;
      originalRequest.headers.Authorization = authorization;
      return instance(originalRequest);
    }
    return Promise.reject(
      new ApiResponseError(
        error.response.data.error,
        error.response.data.message,
        error.response.data.statusCode
      )
    );
  };
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_BASE_URL,
  headers: {
    common: {
      Authorization: `Bearer ${getCookie(StoredCookies.ACCESS_TOKEN)}`,
    },
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  createErrorHandler(axiosInstance)
);

function createAxiosService(
  instance: AxiosInstance
): IHTTPRequestService<AxiosRequestConfig> {
  return {
    get: async <T,>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await instance.get<T>(url, config);
      return response.data;
    },
    post: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await instance.post<T>(url, body, config);
      return response.data;
    },
    patch: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await axiosInstance.patch(url, body, config);
      return response.data;
    },
    put: async <T, K = unknown>(
      url: string,
      body: K,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await axiosInstance.put(url, body, config);
      return response.data;
    },
    delete: async <T,>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await axiosInstance.delete<T>(url, config);
      return response.data;
    },
    setAuthentication: (token: string): void => {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return;
    },
  };
}

export const axiosService = createAxiosService(axiosInstance);
