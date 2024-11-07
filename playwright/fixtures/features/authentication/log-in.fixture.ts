export const successLoginFixture = {
  status: 200,
  body: JSON.stringify({
    success: true,
    accessToken: "accessTokenFromLoginFixture",
  }),
  contentType: "application/json",
};

export const errorLoginFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

export const axiosErrorLoginFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
    message: "Error from Axios",
  }),
  contentType: "application/json",
};

