import { IMonthData, ITrackMonthlyStats } from "../interfaces";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const mapLastThreeMonthsBarData = (
  tracksLast3MonthsStats: ITrackMonthlyStats[]
): IMonthData[] => {
  return tracksLast3MonthsStats.map((monthStats) => {
    const monthName = monthNames[monthStats.month - 1];

    const monthData: IMonthData = {
      month: monthName,
    };

    monthStats.moods.forEach((moodStat) => {
      monthData[moodStat.mood] = moodStat.totalTracks;
    });

    return monthData;
  });
};

