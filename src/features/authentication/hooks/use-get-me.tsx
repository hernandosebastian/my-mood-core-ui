import { useQuery, UseQueryResult } from "react-query";
import { getMe } from "../services";
import { IGetMeResponse } from "../dto";
import { mapToUser } from "../mapper";
import { User } from "../entity";
import { AxiosError } from "axios";
import { getCookie, StoredCookies } from "@/services/cookies";

export const getMeKeys = (): string[] => ["getMe"];
const MAX_RETRIES = 3;
const RETRY_DELAY = (attemptIndex: number): number =>
  Math.min(1000 * 2 ** attemptIndex, 30_000);

export const useGetMe = (): UseQueryResult<{ user: User }, AxiosError> => {
  const accessToken = getCookie(StoredCookies.ACCESS_TOKEN);
  return useQuery<IGetMeResponse, AxiosError, { user: User }>({
    queryKey: getMeKeys(),
    queryFn: getMe,
    enabled: !!accessToken,
    retry: MAX_RETRIES,
    retryDelay: RETRY_DELAY,
    select: ({
      id,
      username,
      nickname,
      avatarSrc,
      externalId,
      roles,
      createdAt,
      updatedAt,
      deletedAt,
    }) => ({
      user: mapToUser({
        id,
        username,
        nickname,
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
