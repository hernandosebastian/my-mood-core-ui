import { useMutation, UseMutationResult } from "react-query";
import { ILogInDto, ILogInResponse } from "../dto";
import { logIn } from "../services";
import { setItem, StorageKeys } from "@/services/local-storage";

export const useLogIn = (): UseMutationResult<
  ILogInResponse,
  unknown,
  ILogInDto,
  unknown
> => {
  return useMutation<ILogInResponse, unknown, ILogInDto, unknown>({
    mutationFn: ({ username, password }: ILogInDto) =>
      logIn({ username, password }),
    onSuccess: ({ accessToken }: ILogInResponse) => {
      setItem(StorageKeys.COGNITO_ACCESS_TOKEN, accessToken);
    },
  });
};

