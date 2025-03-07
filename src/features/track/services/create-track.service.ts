import axios from "axios";
import { env } from "@/config/env";
import { ICreateTrackDto, ITrack } from "../interfaces";
import { getItem, StorageKeys } from "@/services/local-storage";

export const createTrack = async (
  createTrackDto: ICreateTrackDto
): Promise<ITrack> => {
  const authToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);

  const apiUrl = `${env.coreApi.baseUrl}/track`;

  const response = await axios.post<ITrack>(apiUrl, createTrackDto, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
