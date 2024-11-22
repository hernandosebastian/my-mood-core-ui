import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICalendarState } from "../interfaces";

const CALENDAR_STORAGE_KEY = "calendar-storage";

export const useCalendarStore = create<ICalendarState>()(
  persist(
    (set) => ({
      selectedDate: new Date(),
      setSelectedDate: (date: Date): void => set({ selectedDate: date }),
    }),
    {
      name: CALENDAR_STORAGE_KEY,
    }
  )
);

