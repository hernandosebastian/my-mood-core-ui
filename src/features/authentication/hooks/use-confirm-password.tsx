import { useMutation, UseMutationResult } from "react-query";

import { IConfirmPasswordDto, ISuccessfulOperationResponse } from "../dto";
import { confirmPassword } from "../services";
import { AxiosError } from "axios";

export const useConfirmPassword = (): UseMutationResult<
  ISuccessfulOperationResponse,
  AxiosError,
  IConfirmPasswordDto,
  unknown
> => {
  return useMutation<
    ISuccessfulOperationResponse,
    AxiosError,
    IConfirmPasswordDto,
    unknown
  >({
    mutationFn: ({ username, newPassword, code }: IConfirmPasswordDto) =>
      confirmPassword({ username, newPassword, code }),
  });
};
