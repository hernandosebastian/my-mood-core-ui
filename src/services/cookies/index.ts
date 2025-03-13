import { env } from '@/config/env';
import Cookies from 'js-cookie'

export const StorageKeys = {
  COGNITO_ACCESS_TOKEN: "cognitoAccessToken",
};

export const setItem = (key: string, value: string, expires: number): void => {
  Cookies.set(key, value, {
    expires, 
    secure: env.cookies.secure,
    sameSite: env.cookies.sameSite,
  });
};

export const getItem = (key: string): string | null => {
  return Cookies.get(key) || null;
};

export const removeItem = (key: string): void => {
  Cookies.remove(key);
};