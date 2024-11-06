import { useMutation, UseMutationResult } from "react-query";
import {
  IResendConfirmationCodeDto,
  ISuccessfulOperationResponse,
} from "../dto";
import { resendConfirmationCode } from "../services";
import { AxiosError } from "axios";

export const useResendConfirmationCode = (): UseMutationResult<
  ISuccessfulOperationResponse,
  AxiosError,
  IResendConfirmationCodeDto,
  unknown
> => {
  return useMutation<
    ISuccessfulOperationResponse,
    AxiosError,
    IResendConfirmationCodeDto,
    unknown
  >({
    mutationFn: ({ username }: IResendConfirmationCodeDto) =>
      resendConfirmationCode({ username }),
  });
};
