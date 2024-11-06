import { env } from "@/config/env";

export const StorageKeys = {
  LAST_AUTH_USER: `CognitoIdentityServiceProvider.${env.cognito.clientId}.LastAuthUser`,
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(
    `CognitoIdentityServiceProvider.${env.cognito.clientId}.${getItem(
      StorageKeys.LAST_AUTH_USER
    )}.accessToken`
  );
};
export const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeItem = (key: string): void => {
  return localStorage.removeItem(key);
};

