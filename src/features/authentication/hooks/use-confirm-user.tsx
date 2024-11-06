import { useMutation, UseMutationResult } from "react-query";
import { IConfirmUserDto, ISuccessfulOperationResponse } from "../dto";
import { confirmUser } from "../services";

export const useConfirmUser = (): UseMutationResult<
  ISuccessfulOperationResponse,
  unknown,
  IConfirmUserDto,
  unknown
> => {
  return useMutation<
    ISuccessfulOperationResponse,
    unknown,
    IConfirmUserDto,
    unknown
  >({
    mutationFn: ({ username, code }: IConfirmUserDto) =>
      confirmUser({ username, code }),
  });
};
