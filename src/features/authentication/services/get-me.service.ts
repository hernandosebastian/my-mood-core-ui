import { getAccessToken } from "@/services/local-storage";
import { IGetMeResponse } from "../dto";
import { env } from "@/config/env";
import axios from "axios";

export const getMe = async (): Promise<IGetMeResponse> => {
  const authToken = getAccessToken();
  const apiUrl = `${env.coreApi.baseUrl}/user/me`;

  const response = await axios.post<IGetMeResponse>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

