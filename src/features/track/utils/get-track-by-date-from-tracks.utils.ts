import { Track } from "../entity";

export const getTrackByDateFromTracks = (
  date: Date,
  tracks: Track[] | undefined
): Track | undefined => {
  if (!tracks) return undefined;

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return tracks.find((track) => {
    const trackDate = new Date(track.date);
    trackDate.setHours(0, 0, 0, 0);

    return trackDate.getTime() === targetDate.getTime();
  });
};

