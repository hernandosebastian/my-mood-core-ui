import { IMonthData, ITrackMonthlyStats } from "../interfaces";
import { monthsNames } from "../utils";

export const mapLastThreeMonthsBarData = (
  tracksLast3MonthsStats: ITrackMonthlyStats[]
): IMonthData[] => {
  return tracksLast3MonthsStats.map((monthStats) => {
    const monthName = monthsNames[monthStats.month - 1];

    const monthData: IMonthData = {
      month: monthName,
    };

    monthStats.moods.forEach((moodStat) => {
      monthData[moodStat.mood] = moodStat.totalTracks;
    });

    return monthData;
  });
};

