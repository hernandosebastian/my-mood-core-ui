export interface IRefreshTokenDto {
  username: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}
