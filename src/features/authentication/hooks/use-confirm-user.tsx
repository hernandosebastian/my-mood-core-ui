import { useMutation, UseMutationResult } from "react-query";
import { IConfirmUserDto, ISuccessfulOperationResponse } from "../dto";
import { confirmUser } from "../services";
import { AxiosError } from "axios";

export const useConfirmUser = (): UseMutationResult<
  ISuccessfulOperationResponse,
  AxiosError,
  IConfirmUserDto,
  unknown
> => {
  return useMutation<
    ISuccessfulOperationResponse,
    AxiosError,
    IConfirmUserDto,
    unknown
  >({
    mutationFn: ({ username, code }: IConfirmUserDto) =>
      confirmUser({ username, code }),
  });
};
