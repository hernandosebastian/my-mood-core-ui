import { AppRole } from "../../../../src/features/authentication/enum";
import { IGetMeResponse } from "../../../../src/features/authentication/dto/get-me-response.interface";

export const successGetMeFixture: {
  status: number;
  body: string;
  contentType: string;
} = {
  status: 200,
  body: JSON.stringify({
    id: 123,
    username: "johndoe@example.com",
    nickname: "JohnDoe",
    avatarSrc: "",
    externalId: "external-id-12345",
    roles: [AppRole.Regular],
    createdAt: new Date("2023-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  } as IGetMeResponse),
  contentType: "application/json",
};
