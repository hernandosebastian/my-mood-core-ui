import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { calendarToastMessages } from "@/features/calendar/messages/calendar.messages";
import {
  errorGetTrackFixtureWithMessage,
  errorGetTrackFixtureWithoutMessage,
} from "../../../fixtures/features/track/get-track.fixture";
import {
  closeSidebarIfMobile,
  logIn,
  openSidebarIfMobile,
  selectDayFromCalendar,
} from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page, isMobile }) => {
  const fixedDate = new Date("2024-10-29T00:00:00.000Z");
  await page.context().newPage();
  await page.clock.setFixedTime(fixedDate);

  await page.goto(`${BASE_URL}`);
  await logIn({ page, isMobile, isSidebarOpen: false });
});

test.describe("features/track - get", () => {
  test("should display error message from body if there is one", async ({
    page,
    isMobile,
  }) => {
    const errorResponseBody = JSON.parse(errorGetTrackFixtureWithMessage.body);

    const errorToastMessageTitle = page.getByText(
      calendarToastMessages.error.title
    );
    const errorToastMessageDescription = page.getByText(
      errorResponseBody.message
    );

    await expect(errorToastMessageTitle).toBeVisible();
    await expect(errorToastMessageDescription).toBeVisible();
  });

  test("should display default error message if there is no error message in the body", async ({
    page,
    isMobile,
  }) => {
    await page.route(
      "**/api/v1/track/by-date-range?startDate=2024-10-01T00:00:00.000Z&endDate=2024-10-31T23:59:59.999Z",
      (route) => {
        route.fulfill(errorGetTrackFixtureWithoutMessage);
      }
    );

    await openSidebarIfMobile({ page, isMobile });
    await selectDayFromCalendar({ page, dayNumber: 10 });
    await closeSidebarIfMobile({ page, isMobile });

    const errorToastMessageTitle = page.getByText(
      calendarToastMessages.error.title
    );
    const errorToastMessageDescription = page.getByText(
      calendarToastMessages.error.description
    );

    await expect(errorToastMessageTitle).toBeVisible();
    await expect(errorToastMessageDescription).toBeVisible();
  });
});
