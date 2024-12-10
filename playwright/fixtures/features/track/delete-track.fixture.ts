export const successDeleteTrackFixture = {
  status: 200,
  body: "",
};

export const errorDeleteTrackFixture = {
  status: 400,
  body: JSON.stringify({
    message: "Error deleting track",
  }),
  contentType: "application/json",
};

export const errorDeleteTrackFixtureWithoutMessage = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

