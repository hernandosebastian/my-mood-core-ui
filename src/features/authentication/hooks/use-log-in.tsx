import { useMutation, UseMutationResult } from "react-query";
import { ILogInDto, ILogInResponse } from "../dto";
import { logIn } from "../services";
import { AxiosError } from "axios";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setUsernameCookie,
} from "@/services/cookies";
import { apiService } from "@/config/requests/api-service";

export const useLogIn = (): UseMutationResult<
  ILogInResponse,
  AxiosError,
  ILogInDto,
  unknown
> => {
  return useMutation<ILogInResponse, AxiosError, ILogInDto, unknown>({
    mutationFn: ({ username, password }: ILogInDto) =>
      logIn({ username, password }),
    onSuccess: ({ accessToken, refreshToken, username }: ILogInResponse) => {
      setAccessTokenCookie(accessToken);
      setRefreshTokenCookie(refreshToken);
      setUsernameCookie(username);
      apiService.setAuthentication(accessToken);
    },
  });
};
