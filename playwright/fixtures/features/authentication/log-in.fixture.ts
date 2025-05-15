import { APIResponse } from "@playwright/test";
import { ILogInResponse } from "../../../../src/features/authentication/dto/log-in-response.interface";

export const successLoginFixture: {
  status: number;
  body: string;
  contentType: string;
} = {
  status: 200,
  body: JSON.stringify({
    accessToken: "accessTokenFromLoginFixture",
    refreshToken: "refreshTokenFromLoginFixture",
    expiresIn: 3600,
    username: "johndoe@example.com",
  } as ILogInResponse),
  contentType: "application/json",
};

export const errorLoginFixture: {
  status: number;
  body: string;
  contentType: string;
} = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

export const axiosErrorLoginFixture: {
  status: number;
  body: string;
  contentType: string;
} = {
  status: 400,
  body: JSON.stringify({
    success: false,
    message: "Error from Axios",
  }),
  contentType: "application/json",
};

export const unconfirmedUserFixture: {
  status: number;
  body: string;
  contentType: string;
} = {
  status: 403,
  body: JSON.stringify({
    success: false,
    message: "La cuenta de usuario no está confirmada. Por favor, confírmala y vuelve a intentarlo",
  }),
  contentType: "application/json",
};
