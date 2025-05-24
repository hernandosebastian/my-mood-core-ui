import { ISuccessfulOperationResponse } from "../../../../src/features/authentication/dto/successful-operation-response.interface";

export const successForgotPasswordFixture = {
  status: 200,
  body: JSON.stringify({
    success: true,
  } as ISuccessfulOperationResponse),
  contentType: "application/json",
};

export const errorForgotPasswordFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

export const axiosErrorForgotPasswordFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
    message: "Error from Axios",
  }),
  contentType: "application/json",
};

