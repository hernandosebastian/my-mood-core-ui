import axios from "axios";
import { env } from "@/config/env";
import { ITrack } from "../interfaces";
import { getItem, StorageKeys } from "@/services/local-storage";
import { IUpdateTrackDto } from "../interfaces/update-track.dto.interface";

export const updateTrack = async (
  id: number,
  updateTrackDto: IUpdateTrackDto
): Promise<ITrack> => {
  const authToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);

  const apiUrl = `${env.coreApi.baseUrl}/track/${id}`;

  const response = await axios.patch<ITrack>(apiUrl, updateTrackDto, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

