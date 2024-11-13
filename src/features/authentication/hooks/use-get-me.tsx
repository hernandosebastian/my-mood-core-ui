import { useQuery, UseQueryResult } from "react-query";
import { getMe } from "../services";
import { IGetMeResponse } from "../dto";
import { getItem, StorageKeys } from "@/services/local-storage";
import { mapToUser } from "../mapper";
import { User } from "../entity";
import { AxiosError } from "axios";

export const getMeKeys = (): string[] => ["getMe"];

export const useGetMe = (): UseQueryResult<{ user: User }, AxiosError> => {
  const accessToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);
  return useQuery<IGetMeResponse, AxiosError, { user: User }>({
    queryKey: getMeKeys(),
    queryFn: getMe,
    enabled: !!accessToken,
    select: ({
      id,
      username,
      avatarSrc,
      externalId,
      roles,
      createdAt,
      updatedAt,
      deletedAt,
    }: IGetMeResponse) => ({
      user: mapToUser({
        id,
        username,
        avatarSrc,
        externalId,
        roles,
        createdAt,
        updatedAt,
        deletedAt,
      }),
    }),
  });
};
