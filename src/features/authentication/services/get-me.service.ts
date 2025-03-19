import { IGetMeResponse } from "../dto";
import { env } from "@/config/env";
import { getCookie, StoredCookies } from "@/services/cookies";
import { apiService } from "@/config/requests/api-service";

export const getMe = async (): Promise<IGetMeResponse> => {
  const authToken = getCookie(StoredCookies.ACCESS_TOKEN);
  const apiUrl = `${env.coreApi.baseUrl}/user/me`;

  apiService.setAuthentication(authToken || "");
  return apiService.get<IGetMeResponse>(apiUrl);
};
