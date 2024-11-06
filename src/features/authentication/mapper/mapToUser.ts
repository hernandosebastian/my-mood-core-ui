import { IGetMeResponse } from "../dto/get-me-response.interface";
import { User } from "../entity/User";

export const mapToUser = (getMeResponse: IGetMeResponse): User => {
  return new User(
    getMeResponse.id,
    getMeResponse.username,
    getMeResponse.externalId,
    getMeResponse.roles,
    getMeResponse.createdAt,
    getMeResponse.updatedAt,
    getMeResponse.deletedAt
  );
};

