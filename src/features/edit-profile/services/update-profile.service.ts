import { env } from "@/config/env";
import { IUpdateProfileDto } from "../interfaces";
import { IGetMeResponse } from "@/features/authentication/dto";
import { getCookie, StoredCookies } from "@/services/cookies";
import { apiService } from "@/config/requests/api-service";

export const updateProfile = async (
  updateProfileDto: IUpdateProfileDto
): Promise<IGetMeResponse> => {
  const authToken = getCookie(StoredCookies.ACCESS_TOKEN);
  apiService.setAuthentication(authToken || "");
  return apiService.patch<IGetMeResponse>(
    `${env.coreApi.baseUrl}/user/me`,
    updateProfileDto
  );
};
