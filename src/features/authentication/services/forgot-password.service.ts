import { env } from "@/config/env";
import { IForgotPasswordDto, ISuccessfulOperationResponse } from "../dto";
import { apiService } from "@/config/requests/api-service";

export const forgotPassword = async (
  forgotPasswordDto: IForgotPasswordDto
): Promise<ISuccessfulOperationResponse> => {
  return apiService.post<ISuccessfulOperationResponse>(
    `${env.coreApi.baseUrl}/auth/forgot-password`,
    forgotPasswordDto
  );
};
