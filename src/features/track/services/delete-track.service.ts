import { env } from "@/config/env";
import { getCookie, StoredCookies } from "@/services/cookies";
import { apiService } from "@/config/requests/api-service";

export const deleteTrack = async (id: number): Promise<void> => {
  const authToken = getCookie(StoredCookies.ACCESS_TOKEN);
  apiService.setAuthentication(authToken || "");
  return apiService.delete(`${env.coreApi.baseUrl}/track/${id}`);
};
