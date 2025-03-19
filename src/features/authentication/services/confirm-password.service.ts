import { env } from "@/config/env";
import { IConfirmPasswordDto, ISuccessfulOperationResponse } from "../dto";
import { apiService } from "@/config/requests/api-service";

export const confirmPassword = async (
  confirmPasswordDto: IConfirmPasswordDto
): Promise<ISuccessfulOperationResponse> => {
  return apiService.post<ISuccessfulOperationResponse>(
    `${env.coreApi.baseUrl}/auth/confirm-password`,
    confirmPasswordDto
  );
};
