import { useMutation, UseMutationResult } from "react-query";
import { ISignUpDto, ISignUpResponse } from "../dto";
import { signUp } from "../services";
import { AxiosError } from "axios";

export const useSignUp = (): UseMutationResult<
  ISignUpResponse,
  AxiosError,
  ISignUpDto,
  unknown
> => {
  return useMutation<ISignUpResponse, AxiosError, ISignUpDto, unknown>({
    mutationFn: ({ username, nickname, password }: ISignUpDto) =>
      signUp({ username, nickname, password }),
  });
};
