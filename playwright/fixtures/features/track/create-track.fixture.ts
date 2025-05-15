import { AppRole } from "@/features/authentication/enum";
import { Mood } from "@/features/track/enum";
import { ITrack } from "@/features/track/interfaces";

export const successCreateTrackFixture = {
  status: 200,
  body: JSON.stringify({
    id: 1,
    title: Mood.SAD,
    description: "Lorem ipsum dolor sit amet",
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
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  } as ITrack),
  contentType: "application/json",
};

export const errorCreateTrackFixtureWithMessage = {
  status: 400,
  body: JSON.stringify({
    message: "Error creating track",
  }),
  contentType: "application/json",
};

export const errorCreateTrackFixtureWithoutMessage = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};
