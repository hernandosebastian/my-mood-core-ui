import axios from "axios";
import { env } from "@/config/env";
import { IConfirmUserDto, ISuccessfulOperationResponse } from "../dto";

export const confirmUser = async (
  confirmUserDto: IConfirmUserDto
): Promise<ISuccessfulOperationResponse> => {
  const apiUrl = `${env.coreApi.baseUrl}/auth/confirm-user`;

  const response = await axios.post<ISuccessfulOperationResponse>(
    apiUrl,
    confirmUserDto,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
