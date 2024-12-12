export const successUpdateTrackFixture = {
  status: 200,
  body: JSON.stringify({
    id: 1,
    title: "Happy",
    description: "Lorem ipsum dolor sit amet!",
    date: new Date("2024-10-10T10:00:00").toISOString(),
    ownerId: 123,
    owner: {},
    createdAt: new Date("2023-01-01T00:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-01T00:00:00Z").toISOString(),
    deletedAt: null,
  }),
  contentType: "application/json",
};

export const errorUpdateTrackFixtureWithMessage = {
  status: 400,
  body: JSON.stringify({
    message: "Error updating track",
  }),
  contentType: "application/json",
};

export const errorUpdateTrackFixtureWithoutMessage = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};
