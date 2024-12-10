import { useCalendarStore } from "../stores";
import { getStartAndEndOfMonth } from "../utils";

export const useMonthDateRange = (): {
  startDate: string;
  endDate: string;
  month: string;
  year: string;
} => {
  const currentDate = useCalendarStore((state) => state.selectedDate);

  return getStartAndEndOfMonth(new Date(currentDate));
};

