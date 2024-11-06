import { useMutation, UseMutationResult } from "react-query";
import { IForgotPasswordDto, ISuccessfulOperationResponse } from "../dto";
import { forgotPassword } from "../services";
import { AxiosError } from "axios";

export const useForgotPassword = (): UseMutationResult<
  ISuccessfulOperationResponse,
  AxiosError,
  IForgotPasswordDto,
  unknown
> => {
  return useMutation<
    ISuccessfulOperationResponse,
    AxiosError,
    IForgotPasswordDto,
    unknown
  >({
    mutationFn: ({ username }: IForgotPasswordDto) =>
      forgotPassword({ username }),
  });
};
