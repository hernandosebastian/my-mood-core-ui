import { ISuccessfulOperationResponse } from "../../../../src/features/authentication/dto/successful-operation-response.interface";

export const successConfirmPasswordFixture = {
  status: 200,
  body: JSON.stringify({
    success: true,
  } as ISuccessfulOperationResponse),
  contentType: "application/json",
};

export const errorConfirmPasswordFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

export const axiosErrorConfirmPasswordFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
    message: "Error from fixture",
  }),
  contentType: "application/json",
};

