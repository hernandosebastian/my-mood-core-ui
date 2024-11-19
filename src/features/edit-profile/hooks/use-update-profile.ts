import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { IGetMeResponse } from "@/features/authentication/dto";
import { IUpdateProfileDto } from "../interfaces";
import { updateProfile } from "../services";
import { AxiosError } from "axios";
import { getMeKeys } from "@/features/authentication/hooks/use-get-me";
import { User } from "@/features/authentication/entity";
import { mapToUser } from "@/features/authentication/mapper";

export const useUpdateProfile = (): UseMutationResult<
  IGetMeResponse,
  AxiosError,
  IUpdateProfileDto,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<IGetMeResponse, AxiosError, IUpdateProfileDto, unknown>({
    mutationFn: ({ nickname, avatarSrc }: IUpdateProfileDto) =>
      updateProfile({ nickname, avatarSrc }),

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

