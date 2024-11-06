import { useQuery, UseQueryResult } from "react-query";
import { getMe } from "../services";
import { IGetMeResponse } from "../dto";
import { getItem, StorageKeys } from "@/services/local-storage";
import { mapToUser } from "../mapper";
import { User } from "../entity";

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
