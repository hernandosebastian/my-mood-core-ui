import { useQuery, UseQueryResult, useQueryClient } from "react-query";
import { getMe } from "../services";
import { IGetMeResponse } from "../dto";
import { getCognitoToken, removeItem, StorageKeys } from "@/services/cookies";
import { mapToUser } from "../mapper";
import { User } from "../entity";
import { AxiosError } from "axios";

export const getMeKeys = (): string[] => ["getMe"];
const MAX_RETRIES = 3;
const RETRY_DELAY = (attemptIndex: number): number =>
  Math.min(1000 * 2 ** attemptIndex, 30_000);

export const useGetMe = (): UseQueryResult<{ user: User }, AxiosError> => {
  const queryClient = useQueryClient();
  const accessToken = getCognitoToken();

  return useQuery<IGetMeResponse, AxiosError, { user: User }>({
    queryKey: getMeKeys(),
    queryFn: getMe,
    enabled: !!accessToken,
    retry: MAX_RETRIES,
    retryDelay: RETRY_DELAY,
    onError: (error: AxiosError) => {
      const isTokenExpired = error.response?.status === 401;
      if (isTokenExpired) {
        removeItem(StorageKeys.COGNITO_ACCESS_TOKEN);
        queryClient.removeQueries(getMeKeys());
      }
    },
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
