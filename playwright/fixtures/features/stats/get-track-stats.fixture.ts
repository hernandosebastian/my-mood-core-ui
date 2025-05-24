import { IGetTrackStatsResponse } from "@/features/stats/interfaces";
import { getCurrentMonth, getCurrentYear } from "utils";

export const successGetTrackStatsFixtureWithoutActivity = {
  status: 200,
  body: JSON.stringify({
    totalTrackStats: [],
    tracksLast3MonthsStats: [],
  } as IGetTrackStatsResponse),
  contentType: "application/json",
};

export const successGetTrackStatsFixtureWithoutLast3MonthsActivity = {
  status: 200,
  body: JSON.stringify({
    totalTrackStats: [
      {
        mood: "Happy",
        totalTracks: 120,
      },
      {
        mood: "Sad",
        totalTracks: 85,
      },
      {
        mood: "Angry",
        totalTracks: 30,
      },
      {
        mood: "Excited",
        totalTracks: 75,
      },
      {
        mood: "Anxious",
        totalTracks: 45,
      },
      {
        mood: "Calm",
        totalTracks: 95,
      },
      {
        mood: "Confused",
        totalTracks: 50,
      },
      {
        mood: "Bored",
        totalTracks: 40,
      },
    ],
    tracksLast3MonthsStats: [],
  } as IGetTrackStatsResponse),
  contentType: "application/json",
};

export const successGetTrackStatsFixtureWithLast3MonthsActivity = {
  status: 200,
  body: JSON.stringify({
    totalTrackStats: [
      {
        mood: "Happy",
        totalTracks: 120,
      },
      {
        mood: "Sad",
        totalTracks: 85,
      },
      {
        mood: "Angry",
        totalTracks: 30,
      },
      {
        mood: "Excited",
        totalTracks: 75,
      },
      {
        mood: "Anxious",
        totalTracks: 45,
      },
      {
        mood: "Calm",
        totalTracks: 95,
      },
      {
        mood: "Confused",
        totalTracks: 50,
      },
      {
        mood: "Bored",
        totalTracks: 40,
      },
    ],
    tracksLast3MonthsStats: [
      {
        month: getCurrentMonth(),
        year: getCurrentYear(),
        moods: [
          {
            mood: "Happy",
            totalTracks: 8,
          },
          {
            mood: "Sad",
            totalTracks: 5,
          },
          {
            mood: "Angry",
            totalTracks: 3,
          },
          {
            mood: "Excited",
            totalTracks: 4,
          },
          {
            mood: "Anxious",
            totalTracks: 2,
          },
          {
            mood: "Calm",
            totalTracks: 4,
          },
          {
            mood: "Confused",
            totalTracks: 2,
          },
          {
            mood: "Bored",
            totalTracks: 3,
          },
        ],
      },
      {
        month: getCurrentMonth() - 1,
        year: getCurrentYear(),
        moods: [
          {
            mood: "Happy",
            totalTracks: 7,
          },
          {
            mood: "Sad",
            totalTracks: 5,
          },
          {
            mood: "Angry",
            totalTracks: 3,
          },
          {
            mood: "Excited",
            totalTracks: 4,
          },
          {
            mood: "Anxious",
            totalTracks: 2,
          },
          {
            mood: "Calm",
            totalTracks: 4,
          },
          {
            mood: "Confused",
            totalTracks: 2,
          },
          {
            mood: "Bored",
            totalTracks: 3,
          },
        ],
      },
      {
        month: getCurrentMonth() - 2,
        year: getCurrentYear(),
        moods: [
          {
            mood: "Happy",
            totalTracks: 9,
          },
          {
            mood: "Sad",
            totalTracks: 7,
          },
          {
            mood: "Angry",
            totalTracks: 3,
          },
          {
            mood: "Excited",
            totalTracks: 5,
          },
          {
            mood: "Anxious",
            totalTracks: 3,
          },
          {
            mood: "Calm",
            totalTracks: 4,
          },
          {
            mood: "Confused",
            totalTracks: 2,
          },
          {
            mood: "Bored",
            totalTracks: 3,
          },
        ],
      },
    ],
  } as IGetTrackStatsResponse),
  contentType: "application/json",
};

export const errorGetTrackStatsFixtureWithMessage = {
  status: 400,
  body: JSON.stringify({
    message: "Error getting track stats",
  }),
  contentType: "application/json",
};

export const errorGetTrackStatsFixtureWithoutMessage = {
  status: 400,
  body: JSON.stringify({
    success: false,
  }),
  contentType: "application/json",
};
