import axios from "axios";
import { env } from "@/config/env";
import { getItem, StorageKeys } from "@/services/local-storage";

export const deleteTrack = async (id: number): Promise<void> => {
  const authToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);

  const apiUrl = `${env.coreApi.baseUrl}/track/${id}`;

  const response = await axios.delete<void>(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
