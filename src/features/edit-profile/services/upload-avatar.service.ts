import axios from "axios";
import { env } from "@/config/env";
import { IGetMeResponse } from "@/features/authentication/dto";
import { getCognitoToken } from "@/services/cookies";

export const uploadAvatar = async (file: File): Promise<IGetMeResponse> => {
  const authToken = getCognitoToken();
  const formData = new FormData();
  formData.append("avatar", file);

  const apiUrl = `${env.coreApi.baseUrl}/user/avatar`;

  const response = await axios.post<IGetMeResponse>(apiUrl, formData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
