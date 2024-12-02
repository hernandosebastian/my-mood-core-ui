import { Mood } from "../enum";

export interface ICreateTrackDto {
  title: Mood;
  description?: string;
  date: Date;
}
