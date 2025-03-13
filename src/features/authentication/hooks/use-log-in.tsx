import { useMutation, UseMutationResult } from "react-query";
import { ILogInDto, ILogInResponse } from "../dto";
import { logIn } from "../services";
import { AxiosError } from "axios";
import { setItem, StorageKeys } from "@/services/cookies";

export const useLogIn = (): UseMutationResult<
  ILogInResponse,
  AxiosError,
  ILogInDto,
  unknown
> => {
  const THIRTY_DAYS = 30;

  return useMutation<ILogInResponse, AxiosError, ILogInDto, unknown>({
    mutationFn: ({ username, password }: ILogInDto) =>
      logIn({ username, password }),
    onSuccess: ({ accessToken }: ILogInResponse) => {
      setItem(StorageKeys.COGNITO_ACCESS_TOKEN, accessToken, THIRTY_DAYS);
    },
  });
};
