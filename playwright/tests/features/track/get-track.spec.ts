import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { calendarToastMessages } from "@/features/calendar/messages/calendar.messages";
import {
  errorGetTrackFixtureWithMessage,
  errorGetTrackFixtureWithoutMessage,
} from "../../../fixtures/features/track/get-track.fixture";
import {
  completeLoginForm,
  getMonthDateRange,
  openSidebarOnMobile,
  selectDayFromCalendar,
} from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page, isMobile }) => {
  await page.goto(`${BASE_URL}`);

  await openSidebarOnMobile({ page, isMobile });

  await page.getByTestId("sidebar-log-in-button").click();
  expect(page.url()).toContain("/iniciar-sesion");

  await completeLoginForm({ page });
});

test.describe("Get track", () => {
  test("Should display error message from body if there is one", async ({
    page,
    isMobile,
  }) => {
    const { firstDayOfYear, lastDayOfYear } = getMonthDateRange();

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${firstDayOfYear.toISOString()}&endDate=${lastDayOfYear.toISOString()}`,
      (route) => {
        route.fulfill(errorGetTrackFixtureWithMessage);
      }
    );

    await openSidebarOnMobile({ page, isMobile });

    await expect(page.getByTestId("sidebar-date-picker")).toBeVisible();

    await selectDayFromCalendar({ page, dayNumber: 10 });

    const errorResponseBody = JSON.parse(errorGetTrackFixtureWithMessage.body);

    await expect(
      page.getByText(calendarToastMessages.error.title, { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText(errorResponseBody.message, { exact: true })
    ).toBeVisible();
  });

  test("Should display default error message if there is no error message in the body", async ({
    page,
    isMobile,
  }) => {
    const { firstDayOfYear, lastDayOfYear } = getMonthDateRange();

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${firstDayOfYear.toISOString()}&endDate=${lastDayOfYear.toISOString()}`,
      (route) => {
        route.fulfill(errorGetTrackFixtureWithoutMessage);
      }
    );

    await openSidebarOnMobile({ page, isMobile });

    await expect(page.getByTestId("sidebar-date-picker")).toBeVisible();

    await selectDayFromCalendar({ page, dayNumber: 10 });

    const errorToastMessageTitle = page.getByText(
      calendarToastMessages.error.title,
      { exact: true }
    );
    const errorToastMessageDescription = page.getByText(
      calendarToastMessages.error.description,
      { exact: true }
    );

    await expect(errorToastMessageTitle).toBeVisible();
    await expect(errorToastMessageDescription).toBeVisible();
  });
});
