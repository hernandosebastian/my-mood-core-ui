import axios from "axios";
import { env } from "@/config/env";
import {
  IResendConfirmationCodeDto,
  ISuccessfulOperationResponse,
} from "../dto";

export const resendConfirmationCode = async (
  resendConfirmationCodeDto: IResendConfirmationCodeDto
): Promise<ISuccessfulOperationResponse> => {
  const apiUrl = `${env.coreApi.baseUrl}/auth/resend-confirmation-code`;

  const response = await axios.post<ISuccessfulOperationResponse>(
    apiUrl,
    resendConfirmationCodeDto,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

