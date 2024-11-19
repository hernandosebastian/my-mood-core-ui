import { AppRole } from "../enum";

export class User {
  constructor(
    public id: number,
    public username: string,
    public nickname: string,
    public avatarSrc: string,
    public externalId: string,
    public Roles: AppRole[],
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null
  ) {}
}
