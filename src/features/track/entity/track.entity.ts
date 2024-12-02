import { Mood } from "../enum";

export class Track {
  constructor(
    public id: number,
    public title: Mood,
    public date: Date,
    public ownerId: number,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
    public description?: string
  ) {}
}

