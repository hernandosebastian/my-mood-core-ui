import axios from "axios";
import { env } from "@/config/env";
import { IGetMeResponse } from "@/features/authentication/dto";
import { getItem, StorageKeys } from "@/services/local-storage";

export const uploadAvatar = async (file: File): Promise<IGetMeResponse> => {
  const authToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);
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
