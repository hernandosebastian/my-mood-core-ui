import { IGetMeResponse } from "../dto";
import { User } from "../entity";

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
