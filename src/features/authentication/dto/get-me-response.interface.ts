import { AppRole } from "../entity/User";

export interface IGetMeResponse {
  id: number;
  username: string;
  externalId: string;
  roles: AppRole[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}