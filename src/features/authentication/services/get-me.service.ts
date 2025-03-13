import { IGetMeResponse } from "../dto";
import { env } from "@/config/env";
import { getCognitoToken } from "@/services/cookies";
import axios from "axios";

export const getMe = async (): Promise<IGetMeResponse> => {
  const authToken = getCognitoToken();
  const apiUrl = `${env.coreApi.baseUrl}/user/me`;

  const response = await axios.get<IGetMeResponse>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
