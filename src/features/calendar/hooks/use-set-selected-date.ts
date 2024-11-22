import { useCalendarStore } from "../stores";

export const useSetSelectedDate = (): ((date: Date) => void) => {
  return useCalendarStore((state) => state.setSelectedDate);
};

