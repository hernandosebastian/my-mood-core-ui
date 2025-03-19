import { env } from "@/config/env";
import { getCookie, StoredCookies } from "@/services/cookies";
import { IGetTrackStatsResponse } from "../interfaces";
import { getStatsStartAndEndDate } from "../utils";
import { apiService } from "@/config/requests/api-service";

export const getTrackStats = async (): Promise<IGetTrackStatsResponse> => {
  const { startDate, endDate } = getStatsStartAndEndDate();
  const authToken = getCookie(StoredCookies.ACCESS_TOKEN);
  apiService.setAuthentication(authToken || "");
  return apiService.get<IGetTrackStatsResponse>(
    `${env.coreApi.baseUrl}/track/stats?startDate=${startDate}&endDate=${endDate}`
  );
};
