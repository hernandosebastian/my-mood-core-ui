export const successGetMeFixture = {
  status: 200,
  body: JSON.stringify({
    id: 123,
    username: "johndoe@example.com",
    nickname: "John Doe",
    avatarSrc: "/assets/avatars/Multiavatar-0ac91fa47b6b8fea10.png",
    externalId: "external-id-12345",
    roles: ["regular"],
    createdAt: new Date("2023-01-01T00:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-01T00:00:00Z").toISOString(),
    deletedAt: null,
  }),
  contentType: "application/json",
};
