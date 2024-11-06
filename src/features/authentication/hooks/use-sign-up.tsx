import { useMutation, UseMutationResult } from "react-query";
import { ISignUpDto, ISignUpResponse } from "../dto";
import { signUp } from "../services";

export const useSignUp = (): UseMutationResult<
  ISignUpResponse,
  unknown,
  ISignUpDto,
  unknown
> => {
  return useMutation<ISignUpResponse, unknown, ISignUpDto, unknown>({
    mutationFn: ({ username, password }: ISignUpDto) =>
      signUp({ username, password }),
  });
};
