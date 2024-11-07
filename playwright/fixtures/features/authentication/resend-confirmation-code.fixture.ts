export const successResendConfirmationCodeFixture = {
  status: 200,
  body: JSON.stringify({
    success: true,
  }),
  contentType: "application/json",
};

export const errorResendConfirmationCodeFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

export const axiosErrorResendConfirmationCodeFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
    message: "Error from Axios",
  }),
  contentType: "application/json",
};

