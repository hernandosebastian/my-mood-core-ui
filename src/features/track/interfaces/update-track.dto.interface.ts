import { Mood } from "../enum";

export interface IUpdateTrackDto {
  title?: Mood;
  description?: string;
}

