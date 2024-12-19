import { IMonthData } from "@/features/stats/interfaces";
import { monthsNames } from "./months-names.utils";

export const getFormattedDateRange = (data: IMonthData[]): string => {
  const months = data.map((item) => item.month);
  const sortedMonths = [...months].sort((a, b) => {
    return monthsNames.indexOf(a) - monthsNames.indexOf(b);
  });

  const startMonth = sortedMonths[0];
  const endMonth = sortedMonths[sortedMonths.length - 1];
  const year = new Date().getFullYear();

  return `${startMonth} - ${endMonth} ${year}`;
};

