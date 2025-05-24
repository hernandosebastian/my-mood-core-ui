import { ISuccessfulOperationResponse } from "../../../../src/features/authentication/dto/successful-operation-response.interface";

export const successConfirmUserFixture = {
  status: 200,
  body: JSON.stringify({
    success: true,
  } as ISuccessfulOperationResponse),
  contentType: "application/json",
};

export const errorConfirmUserFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

export const axiosErrorConfirmUserFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
    message: "Error from fixture",
  }),
  contentType: "application/json",
};

