export const successEditProfileFixture = {
  status: 200,
  body: JSON.stringify({
    id: 123,
    username: "johndoe@example.com",
    nickname: "TestNickname",
    avatarSrc: "/src/assets/avatars/Multiavatar-0af9e888d36c86d96f.png",
    externalId: "external-id-12345",
    roles: ["regular"],
    createdAt: new Date("2023-01-01T00:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-01T00:00:00Z").toISOString(),
    deletedAt: null,
  }),
  contentType: "application/json",
};

export const successEditProfileOnlyAvatarFixture = {
  status: 200,
  body: JSON.stringify({
    id: 123,
    username: "johndoe@example.com",
    nickname: "John Doe",
    avatarSrc: "/src/assets/avatars/Multiavatar-0af9e888d36c86d96f.png",
    externalId: "external-id-12345",
    roles: ["regular"],
    createdAt: new Date("2023-01-01T00:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-01T00:00:00Z").toISOString(),
    deletedAt: null,
  }),
  contentType: "application/json",
};

export const successEditProfileOnlyNicknameFixture = {
  status: 200,
  body: JSON.stringify({
    id: 123,
    username: "johndoe@example.com",
    nickname: "TestNickname",
    avatarSrc: "/src/assets/avatars/Multiavatar-0ac91fa47b6b8fea10.png",
    externalId: "external-id-12345",
    roles: ["regular"],
    createdAt: new Date("2023-01-01T00:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-01T00:00:00Z").toISOString(),
    deletedAt: null,
  }),
  contentType: "application/json",
};

export const errorEditProfileNicknameTakenFixture = {
  status: 400,
  body: JSON.stringify({
    message: "Nickname is taken",
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

