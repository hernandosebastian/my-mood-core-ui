import { AppRole } from "../../../../src/features/authentication/enum";
import { IGetMeResponse } from "../../../../src/features/authentication/dto/get-me-response.interface";

export const successEditProfileFixture = {
  status: 200,
  body: JSON.stringify({
    id: 123,
    username: "johndoe@example.com",
    nickname: "TestNickname",
    avatarSrc: "/avatar.jpg",
    externalId: "external-id-12345",
    roles: [AppRole.Regular],
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  } as IGetMeResponse),
  contentType: "application/json",
};

export const successEditProfileOnlyAvatarFixture = {
  status: 200,
  body: JSON.stringify({
    id: 123,
    username: "johndoe@example.com",
    nickname: "John Doe",
    avatarSrc: "/avatar.jpg",
    externalId: "external-id-12345",
    roles: [AppRole.Regular],
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  } as IGetMeResponse),
  contentType: "application/json",
};

export const successEditProfileOnlyNicknameFixture = {
  status: 200,
  body: JSON.stringify({
    id: 123,
    username: "johndoe@example.com",
    nickname: "TestNickname",
    avatarSrc: "/avatar.jpg",
    externalId: "external-id-12345",
    roles: [AppRole.Regular],
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  } as IGetMeResponse),
  contentType: "application/json",
};

export const errorEditProfileNicknameTakenFixture = {
  status: 400,
  body: JSON.stringify({
    success: false,
    message: "Nickname is already taken",
    error: "Conflict",
    statusCode: 409,
  }),
  contentType: "application/json",
};

export const errorEditProfileFixtureWithoutMessage = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};
