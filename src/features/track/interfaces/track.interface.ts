import { IGetMeResponse as IUser } from "@/features/authentication/dto";
import { Mood } from "../enum";

export interface ITrack {
  id: number;
  title: Mood;
  description?: string;
  date: Date;
  ownerId: number;
  owner: IUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

