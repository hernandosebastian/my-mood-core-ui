import { useMutation, UseMutationResult } from "react-query";
import { IForgotPasswordDto, ISuccessfulOperationResponse } from "../dto";
import { forgotPassword } from "../services";

export const useForgotPassword = (): UseMutationResult<
  ISuccessfulOperationResponse,
  unknown,
  IForgotPasswordDto,
  unknown
> => {
  return useMutation<
    ISuccessfulOperationResponse,
    unknown,
    IForgotPasswordDto,
    unknown
  >({
    mutationFn: ({ username }: IForgotPasswordDto) =>
      forgotPassword({ username }),
  });
};

