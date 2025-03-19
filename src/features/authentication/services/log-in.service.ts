import { env } from "@/config/env";
import { ILogInDto, ILogInResponse } from "../dto";
import { apiService } from "@/config/requests/api-service";

export const logIn = async (logInDto: ILogInDto): Promise<ILogInResponse> => {
  const apiUrl = `${env.coreApi.baseUrl}/auth/sign-in`;

  return apiService.post<ILogInResponse>(apiUrl, logInDto);
};
