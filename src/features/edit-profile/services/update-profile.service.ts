import axios from "axios";
import { env } from "@/config/env";
import { IUpdateProfileDto } from "../interfaces";
import { IGetMeResponse } from "@/features/authentication/dto";
import { getCognitoToken } from "@/services/cookies";

export const updateProfile = async (
  updateProfileDto: IUpdateProfileDto
): Promise<IGetMeResponse> => {
  const authToken = getCognitoToken();

  const apiUrl = `${env.coreApi.baseUrl}/user/me`;

  const response = await axios.patch<IGetMeResponse>(apiUrl, updateProfileDto, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};
