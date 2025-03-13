import axios from "axios";
import { env } from "@/config/env";
import { ITrack, IUpdateTrackDto } from "../interfaces";
import { getCognitoToken } from "@/services/cookies";

export const updateTrack = async (
  id: number,
  updateTrackDto: IUpdateTrackDto
): Promise<ITrack> => {
  const authToken = getCognitoToken();

  const apiUrl = `${env.coreApi.baseUrl}/track/${id}`;

  const response = await axios.patch<ITrack>(apiUrl, updateTrackDto, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
