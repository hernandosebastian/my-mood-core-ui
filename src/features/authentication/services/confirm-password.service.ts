import axios from "axios";
import { env } from "@/config/env";
import { IConfirmPasswordDto, ISuccessfulOperationResponse } from "../dto";

export const confirmPassword = async (
  confirmPasswordDto: IConfirmPasswordDto
): Promise<ISuccessfulOperationResponse> => {
  const apiUrl = `${env.coreApi.baseUrl}/auth/confirm-password`;

  const response = await axios.post<ISuccessfulOperationResponse>(
    apiUrl,
    confirmPasswordDto,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
