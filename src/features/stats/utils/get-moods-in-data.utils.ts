import { Mood } from "@/features/track/enum";
import { IMonthData } from "../interfaces";

export const getMoodsInData = (lastThreeMonthsData: IMonthData[]): string[] => {
  const moodsInData = new Set<string>();

  lastThreeMonthsData.forEach((monthData) => {
    Object.keys(monthData).forEach((key) => {
      if (Object.values(Mood).includes(key as Mood)) {
        moodsInData.add(key);
      }
    });
  });

  return Array.from(moodsInData);
};
