import { env } from "@/config/env";
import { ITrack, IUpdateTrackDto } from "../interfaces";
import { getCookie, StoredCookies } from "@/services/cookies";
import { apiService } from "@/config/requests/api-service";

export const updateTrack = async (
  id: number,
  updateTrackDto: IUpdateTrackDto
): Promise<ITrack> => {
  const authToken = getCookie(StoredCookies.ACCESS_TOKEN);
  apiService.setAuthentication(authToken || "");
  return apiService.patch<ITrack>(
    `${env.coreApi.baseUrl}/track/${id}`,
    updateTrackDto
  );
};
