import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { IGetMeResponse } from "@/features/authentication/dto";
import { AxiosError } from "axios";
import { getMeKeys } from "@/features/authentication/hooks/use-get-me";
import { User } from "@/features/authentication/entity";
import { mapToUser } from "@/features/authentication/mapper";
import { uploadAvatar } from "../services";

export const useUploadAvatar = (): UseMutationResult<
  IGetMeResponse,
  AxiosError,
  File,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<IGetMeResponse, AxiosError, File, unknown>({
    mutationFn: (file: File) => uploadAvatar(file),

    onSuccess: (data) => {
      const previous = queryClient.getQueryData<{ user: User }>(getMeKeys());

      if (previous) {
        queryClient.setQueryData<{ user: User }>(getMeKeys(), {
          user: mapToUser({
            ...data,
          }),
        });
      }

      queryClient.invalidateQueries(getMeKeys());
    },
  });
};
