import { useQuery, UseQueryResult } from "react-query";
import {
  IGetTrackStatsResponse,
  IMapTrackStatsToMoodTrackingResponse,
} from "../interfaces";
import { AxiosError } from "axios";
import { getItem, StorageKeys } from "@/services/local-storage";
import { getTrackStats } from "../services";
import { mapTrackStatsToMoodTracking } from "../mapper";

export const trackStatsKeys = {
  stats: (): string => "stats",
};

export const useGetTrackStats = (): UseQueryResult<
  IMapTrackStatsToMoodTrackingResponse[] | undefined,
  AxiosError
> => {
  const accessToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);

  return useQuery<
    IGetTrackStatsResponse,
    AxiosError,
    IMapTrackStatsToMoodTrackingResponse[] | undefined
  >({
    queryKey: "stats",
    queryFn: async () => getTrackStats(),
    enabled: !!accessToken,
    select: (response: IGetTrackStatsResponse) => {
      if (
        response.totalTrackStats.length > 0 ||
        response.tracksLast3MonthsStats.length > 0
      ) {
        return [mapTrackStatsToMoodTracking(response)];
      }
      return undefined;
    },
  });
};

