import { env } from "@/config/env";
import { getItem, StorageKeys } from "@/services/local-storage";
import axios from "axios";
import { IGetTrackStatsResponse } from "../interfaces";
import { getStatsStartAndEndDate } from "../utils";

export const getTrackStats = async (): Promise<IGetTrackStatsResponse> => {
  const { startDate, endDate } = getStatsStartAndEndDate();
  const authToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);
  const apiUrl = `${env.coreApi.baseUrl}/track/stats?startDate=${startDate}&endDate=${endDate}`;

  const response = await axios.get<IGetTrackStatsResponse>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
