export enum AppRole {
  Admin = "admin",
  Regular = "regular",
}

export class User {
  constructor(
    public id: number,
    public username: string,
    public externalId: string,
    public Roles: AppRole[],
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null
  ) {}
}

