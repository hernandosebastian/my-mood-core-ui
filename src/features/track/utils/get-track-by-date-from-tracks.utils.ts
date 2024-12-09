import { Track } from "../entity";

export const getTrackByDateFromTracks = (
  date: Date,
  tracks: Track[] | undefined
): Track | undefined => {
  console.log("tracks in getTrackByDateFromTracks", JSON.stringify(tracks));
  if (!tracks) return undefined;
  console.log("passed tracks in getTrackByDateFromTracks");

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  console.log("targetDate", targetDate);
  return tracks.find((track) => {
    const trackDate = new Date(track.date);
    trackDate.setHours(0, 0, 0, 0);

    return trackDate.getTime() === targetDate.getTime();
  });
};

