import { env } from "@/config/env";
import { IConfirmUserDto, ISuccessfulOperationResponse } from "../dto";
import { apiService } from "@/config/requests/api-service";

export const confirmUser = async (
  confirmUserDto: IConfirmUserDto
): Promise<ISuccessfulOperationResponse> => {
  return apiService.post<ISuccessfulOperationResponse>(
    `${env.coreApi.baseUrl}/auth/confirm-user`,
    confirmUserDto
  );
};
