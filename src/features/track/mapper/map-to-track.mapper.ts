import { Track } from "../entity";
import { ITrack } from "../interfaces";

export const mapToTrack = (trackResponse: ITrack): Track => {
  return new Track(
    trackResponse.id,
    trackResponse.title,
    trackResponse.date,
    trackResponse.ownerId,
    trackResponse.createdAt,
    trackResponse.updatedAt,
    trackResponse.deletedAt,
    trackResponse.description
  );
};

