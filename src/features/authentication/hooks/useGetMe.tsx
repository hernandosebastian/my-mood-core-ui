import { useQuery, UseQueryResult } from "react-query";
import { getMe } from "../services";
import { IGetMeResponse } from "../dto";
import { mapToUser } from "../mapper/mapToUser";
import { User } from "../entity/User";
import { getItem, StorageKeys } from "@/services/local-storage";

const getMeKeys = (): string[] => ["getMe"];

export const useGetMe = (): UseQueryResult<{ user: User }, unknown> => {
  const accessToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);
  return useQuery<IGetMeResponse, unknown, { user: User }>({
    queryKey: getMeKeys(),
    queryFn: getMe,
    enabled: !!accessToken,
    select: ({
      id,
      username,
      externalId,
      roles,
      createdAt,
      updatedAt,
      deletedAt,
    }: IGetMeResponse) => ({
      user: mapToUser({
        id,
        username,
        externalId,
        roles,
        createdAt,
        updatedAt,
        deletedAt,
      }),
    }),
  });
};

