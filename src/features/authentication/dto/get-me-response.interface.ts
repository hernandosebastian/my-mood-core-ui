import { AppRole } from "../enum";

export interface IGetMeResponse {
  id: number;
  username: string;
  nickname: string;
  avatarSrc: string;
  externalId: string;
  roles: AppRole[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
