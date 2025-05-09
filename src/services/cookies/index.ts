import Cookies from "universal-cookie";

export enum StoredCookies {
  ACCESS_TOKEN = "accessToken",
  USERNAME = "username",
  REFRESH_TOKEN = "refreshToken",
}

const THIRTY_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;
const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const cookies = new Cookies({ path: "/" });

export function setUsernameCookie(username: string): void {
  const expires = new Date(Date.now() + THIRTY_DAYS_IN_MILLISECONDS);
  cookies.set(StoredCookies.USERNAME, username, {
    expires,
    path: "/",
  });
}

export function setRefreshTokenCookie(refreshToken: string): void {
  cookies.set(StoredCookies.REFRESH_TOKEN, refreshToken, {
    expires: new Date(Date.now() + THIRTY_DAYS_IN_MILLISECONDS),
    path: "/",
  });
}

export function setAccessTokenCookie(accessToken: string): void {
  cookies.set(StoredCookies.ACCESS_TOKEN, accessToken, {
    expires: new Date(Date.now() + ONE_DAY_IN_MILLISECONDS),
    path: "/",
  });
}

export function getCookie(name: StoredCookies): string | null {
  return cookies.get(name) || null;
}

export function removeCookie(name: StoredCookies): void {
  cookies.remove(name);
}

export function removeAllCookies(): void {
  for (const cookie of Object.values(StoredCookies)) {
    cookies.remove(cookie);
  }
}
