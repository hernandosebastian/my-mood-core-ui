import { env } from "@/config/env";
import { getItem, StorageKeys } from "@/services/local-storage";
import axios from "axios";
import { IGetTrackStatsResponse } from "../interfaces";

export const getTrackStats = async (): Promise<IGetTrackStatsResponse> => {
  const authToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);
  const apiUrl = `${env.coreApi.baseUrl}/track/stats`;

  const response = await axios.get<IGetTrackStatsResponse>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

