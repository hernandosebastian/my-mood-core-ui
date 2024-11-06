import { useQuery, UseQueryResult } from "react-query";
import { getMe } from "../services";
import { IGetMeResponse } from "../dto";
import { mapToUser } from "../mapper/mapToUser";
import { User } from "../entity/User";

const getMeKeys = (): string[] => ["getMe"];

export const useGetMe = (): UseQueryResult<{ user: User }, unknown> => {
  return useQuery<IGetMeResponse, unknown, { user: User }>({
    queryKey: getMeKeys(),
    queryFn: getMe,
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

