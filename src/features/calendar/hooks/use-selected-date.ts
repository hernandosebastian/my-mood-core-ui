import { useCalendarStore } from "../stores";

export const useSelectedDate = (): Date => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);

  if (typeof selectedDate === "string") {
    return new Date(selectedDate);
  }

  return selectedDate;
};

