import axios from "axios";
import { env } from "@/config/env";
import { IForgotPasswordDto, ISuccessfulOperationResponse } from "../dto";

export const forgotPassword = async (
  forgotPasswordDto: IForgotPasswordDto
): Promise<ISuccessfulOperationResponse> => {
  const apiUrl = `${env.coreApi.baseUrl}/auth/sign-in`;

  const response = await axios.post<ISuccessfulOperationResponse>(
    apiUrl,
    forgotPasswordDto,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

