import { IMonthData, ITrackMonthlyStats } from "../interfaces";
import { monthsNames } from "../utils";

const sortMonthlyStatsByChronologicalOrder = (
  monthlyStats: ITrackMonthlyStats[]
): ITrackMonthlyStats[] => {
  return [...monthlyStats].sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return a.month - b.month;
  });
};

const createMonthDataFromStats = (
  monthStats: ITrackMonthlyStats
): IMonthData => {
  const monthName = monthsNames[monthStats.month - 1];

  const monthData: IMonthData = {
    month: `${monthName} ${monthStats.year}`,
  };

  monthStats.moods.forEach((moodStat) => {
    monthData[moodStat.mood] = moodStat.totalTracks;
  });

  return monthData;
};

export const mapLastThreeMonthsBarData = (
  tracksLast3MonthsStats: ITrackMonthlyStats[]
): IMonthData[] => {
  const chronologicallySortedStats = sortMonthlyStatsByChronologicalOrder(
    tracksLast3MonthsStats
  );

  return chronologicallySortedStats.map(createMonthDataFromStats);
};
