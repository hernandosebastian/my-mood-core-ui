import { env } from "@/config/env";
import { getCognitoToken } from "@/services/cookies";
import axios from "axios";
import { IGetTrackStatsResponse } from "../interfaces";
import { getStatsStartAndEndDate } from "../utils";

export const getTrackStats = async (): Promise<IGetTrackStatsResponse> => {
  const { startDate, endDate } = getStatsStartAndEndDate();
  const authToken = getCognitoToken();
  const apiUrl = `${env.coreApi.baseUrl}/track/stats?startDate=${startDate}&endDate=${endDate}`;

  const response = await axios.get<IGetTrackStatsResponse>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
