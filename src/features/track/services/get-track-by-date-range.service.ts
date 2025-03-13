import { env } from "@/config/env";
import { getCognitoToken } from "@/services/cookies";
import axios from "axios";
import { IGetTrackByDateRangeDto, ITrack } from "../interfaces";

export const getTrackByDateRange = async ({
  startDate,
  endDate,
}: IGetTrackByDateRangeDto): Promise<ITrack[]> => {
  const authToken = getCognitoToken();
  const apiUrl = `${env.coreApi.baseUrl}/track/by-date-range?startDate=${startDate}&endDate=${endDate}`;

  const response = await axios.get<ITrack[]>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
