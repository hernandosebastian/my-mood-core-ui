import { env } from "@/config/env";
import {
  IRefreshTokenDto,
  IRefreshTokenResponse,
} from "../dto/refresh-token.dto";
import { apiService } from "@/config/requests/api-service";

export const refreshToken = async (
  refreshTokenDto: IRefreshTokenDto
): Promise<IRefreshTokenResponse> => {
  return apiService.post<IRefreshTokenResponse>(
    `${env.coreApi.baseUrl}/auth/refresh`,
    refreshTokenDto
  );
};
