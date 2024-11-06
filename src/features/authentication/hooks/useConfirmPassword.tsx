import { useMutation, UseMutationResult } from "react-query";
import {
  IConfirmPasswordDto,
  ISuccessfulOperationResponse,
} from "../dto/index";
import { confirmPassword } from "../services";

export const useConfirmPassword = (): UseMutationResult<
  ISuccessfulOperationResponse,
  unknown,
  IConfirmPasswordDto,
  unknown
> => {
  return useMutation<
    ISuccessfulOperationResponse,
    unknown,
    IConfirmPasswordDto,
    unknown
  >({
    mutationFn: ({ username, newPassword, code }: IConfirmPasswordDto) =>
      confirmPassword({ username, newPassword, code }),
  });
};

