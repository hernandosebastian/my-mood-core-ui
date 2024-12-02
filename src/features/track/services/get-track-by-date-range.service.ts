import { env } from "@/config/env";
import { getItem, StorageKeys } from "@/services/local-storage";
import axios from "axios";
import { IGetTrackByDateRangeDto, ITrack } from "../interfaces";

export const getTrackByDateRange = async ({
  startDate,
  endDate,
}: IGetTrackByDateRangeDto): Promise<ITrack[]> => {
  const authToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);
  const apiUrl = `${env.coreApi.baseUrl}/track/by-date-range?startDate=${startDate}&endDate=${endDate}`;

  const response = await axios.get<ITrack[]>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

