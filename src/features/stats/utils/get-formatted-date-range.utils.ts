import { IMonthData } from "@/features/stats/interfaces";

export const getFormattedDateRange = (data: IMonthData[]): string => {
  const dates = data.map((item) => item.month);
  const sortedDates = [...dates].sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const startDate = sortedDates[0];
  const endDate = sortedDates[sortedDates.length - 1];

  return `${startDate} - ${endDate}`;
};
