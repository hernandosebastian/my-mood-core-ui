export const successSignUpFixture = {
  status: 200,
  body: JSON.stringify({
    success: true,
  }),
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

