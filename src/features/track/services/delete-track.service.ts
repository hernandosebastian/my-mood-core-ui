import axios from "axios";
import { env } from "@/config/env";
import { getCognitoToken } from "@/services/cookies";

export const deleteTrack = async (id: number): Promise<void> => {
  const authToken = getCognitoToken();

  const apiUrl = `${env.coreApi.baseUrl}/track/${id}`;

  const response = await axios.delete<void>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
