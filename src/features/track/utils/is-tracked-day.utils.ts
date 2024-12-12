import { Track } from "../entity";

export function isTrackedDay(date: Date, tracks: Track[] | undefined): boolean {
  if (!tracks) return false;

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return tracks.some((track) => {
    const trackDate = new Date(track.date);
    trackDate.setHours(0, 0, 0, 0);

    return trackDate.getTime() === targetDate.getTime();
  });
}

