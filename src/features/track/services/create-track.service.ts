import { env } from "@/config/env";
import { ICreateTrackDto, ITrack } from "../interfaces";
import { getCookie, StoredCookies } from "@/services/cookies";
import { apiService } from "@/config/requests/api-service";

export const createTrack = async (
  createTrackDto: ICreateTrackDto
): Promise<ITrack> => {
  const authToken = getCookie(StoredCookies.ACCESS_TOKEN);
  apiService.setAuthentication(authToken || "");
  return apiService.post<ITrack>(
    `${env.coreApi.baseUrl}/track`,
    createTrackDto
  );
};
