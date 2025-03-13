import axios from "axios";
import { env } from "@/config/env";
import { ICreateTrackDto, ITrack } from "../interfaces";
import { getCognitoToken } from "@/services/cookies";

export const createTrack = async (
  createTrackDto: ICreateTrackDto
): Promise<ITrack> => {
  const authToken = getCognitoToken();

  const apiUrl = `${env.coreApi.baseUrl}/track`;

  const response = await axios.post<ITrack>(apiUrl, createTrackDto, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
