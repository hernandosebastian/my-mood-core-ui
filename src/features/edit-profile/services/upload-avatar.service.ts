import { env } from "@/config/env";
import { IGetMeResponse } from "@/features/authentication/dto";
import { getCookie, StoredCookies } from "@/services/cookies";
import { apiService } from "@/config/requests/api-service";

export const uploadAvatar = async (file: File): Promise<IGetMeResponse> => {
  const authToken = getCookie(StoredCookies.ACCESS_TOKEN);
  const formData = new FormData();
  formData.append("avatar", file);

  apiService.setAuthentication(authToken || "");
  return apiService.post<IGetMeResponse>(
    `${env.coreApi.baseUrl}/user/avatar`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
