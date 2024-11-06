import { useMutation, UseMutationResult } from "react-query";
import { ILogInDto, ILogInResponse } from "../dto";
import { logIn } from "../services";
import { setItem, StorageKeys } from "@/services/local-storage";
import { AxiosError } from "axios";

export const useLogIn = (): UseMutationResult<
  ILogInResponse,
  AxiosError,
  ILogInDto,
  unknown
> => {
  return useMutation<ILogInResponse, AxiosError, ILogInDto, unknown>({
    mutationFn: ({ username, password }: ILogInDto) =>
      logIn({ username, password }),
    onSuccess: ({ accessToken }: ILogInResponse) => {
      setItem(StorageKeys.COGNITO_ACCESS_TOKEN, accessToken);
    },
  });
};
