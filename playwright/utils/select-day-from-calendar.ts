import { Page } from "@playwright/test";

interface ISelectDayFromCalendarProps {
  page: Page;
  dayNumber: number;
}

export async function selectDayFromCalendar({
  page,
  dayNumber,
}: ISelectDayFromCalendarProps) {
  await page.locator(`button[name="day"]:has-text("${dayNumber}")`).click();
}
