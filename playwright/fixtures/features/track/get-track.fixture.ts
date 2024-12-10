export const successGetTrackFixture = {
  status: 200,
  body: JSON.stringify([
    {
      id: 1,
      title: "Sad",
      description: "Lorem ipsum dolor sit amet",
      date: new Date("2024-10-10T10:00:00").toISOString(),
      ownerId: 123,
      owner: {},
      createdAt: new Date("2023-01-01T00:00:00Z").toISOString(),
      updatedAt: new Date("2024-01-01T00:00:00Z").toISOString(),
      deletedAt: null,
    },
  ]),
  contentType: "application/json",
};

export const errorGetTrackFixtureWithMessage = {
  status: 400,
  body: JSON.stringify({
    message: "Error getting track",
  }),
  contentType: "application/json",
};

export const errorGetTrackFixtureWithoutMessage = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};

