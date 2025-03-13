import { useQuery, UseQueryResult } from "react-query";
import {
  IGetTrackStatsResponse,
  IMapTrackStatsToMoodTrackingResponse,
} from "../interfaces";
import { AxiosError } from "axios";
import { getCognitoToken } from "@/services/cookies";
import { getTrackStats } from "../services";
import {
  mapCurrentMonthMoodTrackingData,
  mapLastThreeMonthsBarData,
  mapTotalMoodTrackingData,
} from "../mapper";

export const trackStatsKeys = {
  stats: (): string => "stats",
};

export const useGetTrackStats = (): UseQueryResult<
  IMapTrackStatsToMoodTrackingResponse | undefined,
  AxiosError
> => {
  const accessToken = getCognitoToken();

  return useQuery<
    IGetTrackStatsResponse,
    AxiosError,
    IMapTrackStatsToMoodTrackingResponse | undefined
  >({
    queryKey: "stats",
    queryFn: async () => getTrackStats(),
    enabled: !!accessToken,
    select: (response: IGetTrackStatsResponse) => {
      if (
        response.totalTrackStats.length > 0 ||
        response.tracksLast3MonthsStats.length > 0
      ) {
        return {
          lastThreeMonths: mapLastThreeMonthsBarData(
            response.tracksLast3MonthsStats
          ),
          historyTrackMap: mapTotalMoodTrackingData(response.totalTrackStats),
          currentMonth: mapCurrentMonthMoodTrackingData(
            response.tracksLast3MonthsStats
          ),
        };
      }
      return undefined;
    },
  });
};
