import { useMutation, UseMutationResult } from "react-query";
import { ILogInDto, ILogInResponse } from "../dto";
import { logIn } from "../services";

export const useLogIn = (): UseMutationResult<
  ILogInResponse,
  unknown,
  ILogInDto,
  unknown
> => {
  return useMutation<ILogInResponse, unknown, ILogInDto, unknown>({
    mutationFn: ({ username, password }: ILogInDto) =>
      logIn({ username, password }),
  });
};

