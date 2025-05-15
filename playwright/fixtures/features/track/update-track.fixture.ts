import { AppRole } from "@/features/authentication/enum";
import { ITrack } from "@/features/track/interfaces";

export const successUpdateTrackFixture = {
  status: 200,
  body: JSON.stringify({
    id: 1,
    title: "Happy",
    description: "Lorem ipsum dolor sit amet!",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
    ownerId: 123,
    owner: {
      id: 123,
      username: "johndoe@example.com",
      nickname: "John Doe",
      avatarSrc: "",
      externalId: "external-id-12345",
      roles: [AppRole.Regular],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  } as ITrack),
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
