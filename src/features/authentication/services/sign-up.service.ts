import { env } from "@/config/env";
import { ISignUpDto, ISignUpResponse } from "../dto";
import { apiService } from "@/config/requests/api-service";

export const signUp = async (
  signUpDto: ISignUpDto
): Promise<ISignUpResponse> => {
  return apiService.post<ISignUpResponse>(
    `${env.coreApi.baseUrl}/auth/sign-up`,
    signUpDto
  );
};
