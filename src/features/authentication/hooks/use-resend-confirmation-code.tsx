import { useMutation, UseMutationResult } from "react-query";
import {
  IResendConfirmationCodeDto,
  ISuccessfulOperationResponse,
} from "../dto";
import { resendConfirmationCode } from "../services";

export const useResendConfirmationCode = (): UseMutationResult<
  ISuccessfulOperationResponse,
  unknown,
  IResendConfirmationCodeDto,
  unknown
> => {
  return useMutation<
    ISuccessfulOperationResponse,
    unknown,
    IResendConfirmationCodeDto,
    unknown
  >({
    mutationFn: ({ username }: IResendConfirmationCodeDto) =>
      resendConfirmationCode({ username }),
  });
};

