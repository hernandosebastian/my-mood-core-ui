export const isTokenExpired = (token: string): boolean => {
  try {
    const TOKEN_PARTS = token.split(".");
    const PAYLOAD_INDEX = 1;
    const MILLISECONDS = 1000;

    const payload = JSON.parse(atob(TOKEN_PARTS[PAYLOAD_INDEX]));
    const currentTimestamp = Date.now();
    const tokenExpirationTime = payload.exp * MILLISECONDS;

    return tokenExpirationTime < currentTimestamp;
  } catch {
    return true;
  }
};
