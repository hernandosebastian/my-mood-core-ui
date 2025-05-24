import { ISignUpResponse } from "../../../../src/features/authentication/dto/sign-up-response.interface";

export const successSignUpFixture = {
  status: 200,
  body: JSON.stringify({
    externalId: "external-id-12345",
  } as ISignUpResponse),
  contentType: "application/json",
};

export const errorSignUpFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

export const axiosErrorSignUpFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
    message: "Error from Axios",
  }),
  contentType: "application/json",
};

