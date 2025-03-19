import { env } from "@/config/env";
import {
  IResendConfirmationCodeDto,
  ISuccessfulOperationResponse,
} from "../dto";
import { apiService } from "@/config/requests/api-service";

export const resendConfirmationCode = async (
  resendConfirmationCodeDto: IResendConfirmationCodeDto
): Promise<ISuccessfulOperationResponse> => {
  return apiService.post<ISuccessfulOperationResponse>(
    `${env.coreApi.baseUrl}/auth/resend-confirmation-code`,
    resendConfirmationCodeDto
  );
};
