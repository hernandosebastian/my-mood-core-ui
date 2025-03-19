import { env } from "@/config/env";
import { IGetTrackByDateRangeDto, ITrack } from "../interfaces";
import { getCookie, StoredCookies } from "@/services/cookies";
import { apiService } from "@/config/requests/api-service";

export const getTrackByDateRange = async ({
  startDate,
  endDate,
}: IGetTrackByDateRangeDto): Promise<ITrack[]> => {
  const authToken = getCookie(StoredCookies.ACCESS_TOKEN);
  apiService.setAuthentication(authToken || "");
  return apiService.get<ITrack[]>(
    `${env.coreApi.baseUrl}/track/by-date-range?startDate=${startDate}&endDate=${endDate}`
  );
};
