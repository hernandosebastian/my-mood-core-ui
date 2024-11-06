export const StorageKeys = {
  COGNITO_ACCESS_TOKEN: "cognitoAccessToken",
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

