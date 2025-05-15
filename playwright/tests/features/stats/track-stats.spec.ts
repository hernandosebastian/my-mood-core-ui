import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { trackStatsToastMessages } from "@/features/stats/messages";
import {
  errorGetTrackStatsFixtureWithMessage,
  errorGetTrackStatsFixtureWithoutMessage,
  successGetTrackStatsFixtureWithLast3MonthsActivity,
  successGetTrackStatsFixtureWithoutActivity,
  successGetTrackStatsFixtureWithoutLast3MonthsActivity,
} from "../../../fixtures/features/stats/get-track-stats.fixture";
import {
  completeLoginForm,
  getCurrentMonth,
  getCurrentYear,
  getMonthDateRange,
  openSidebarOnMobile,
} from "utils";
import { monthsNames } from "@/features/stats/utils/months-names.utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page, isMobile }) => {
  const { startDate, endDate, firstDayOfYear, lastDayOfYear } =
    getMonthDateRange();

  await page.route(
    `**/api/v1/track/by-date-range?startDate=${startDate}&endDate=${endDate}`,
    (route) => {
      route.fulfill({
        json: [],
      });
    }
  );

  await page.route(
    `**/api/v1/track/by-date-range?startDate=${firstDayOfYear}&endDate=${lastDayOfYear}`,
    (route) => {
      route.fulfill({
        json: [],
      });
    }
  );

  await page.goto(`${BASE_URL}`);
  await openSidebarOnMobile({ page, isMobile });

  await page.getByTestId("sidebar-log-in-button").click();
  expect(page.url()).toContain("/iniciar-sesion");

  await completeLoginForm({ page });
});

test.describe("Track stats", () => {
  test("Should render a message if there is no data", async ({
    page,
    isMobile,
  }) => {
    const { startDateTwoMonthsAgo, endDate } = getMonthDateRange();

    await page.route(
      `**/api/v1/track/stats?startDate=${startDateTwoMonthsAgo
        .toISOString()
        .replace("Z", "")}&endDate=${endDate.toISOString().replace("Z", "")}`,
      (route) => {
        route.fulfill(successGetTrackStatsFixtureWithoutActivity);
      }
    );

    const sidebarStatsButton = page.getByTestId("sidebar-stats-button");
    const statsSection = page.getByTestId("stats-section");
    const statsSectionWithoutData = page.getByTestId(
      "stats-section-without-data"
    );

    await openSidebarOnMobile({ page, isMobile });
    await sidebarStatsButton.click();

    await expect(statsSectionWithoutData).toBeVisible();
    await expect(statsSection).not.toBeVisible();
  });

  test("Should render a message if there is data without last three months activity", async ({
    page,
    isMobile,
  }) => {
    const { startDateTwoMonthsAgo, endDate } = getMonthDateRange();

    await page.route(
      `**/api/v1/track/stats?startDate=${startDateTwoMonthsAgo
        .toISOString()
        .replace("Z", "")}&endDate=${endDate.toISOString().replace("Z", "")}`,
      (route) => {
        route.fulfill(successGetTrackStatsFixtureWithoutLast3MonthsActivity);
      }
    );

    const sidebarStatsButton = page.getByTestId("sidebar-stats-button");
    const statsSection = page.getByTestId("stats-section");
    const statsSectionWithoutData = page.getByTestId(
      "stats-section-without-data"
    );
    const lastThreeMonthsDateRange = page.getByTestId(
      "last-three-months-date-range"
    );
    const lastThreeMonthsMoodTrackingBar = page.getByTestId(
      "last-three-months-mood-tracking-bar"
    );
    const lastThreeMonthsMoodDistribution = page.getByTestId(
      "last-three-months-mood-distribution"
    );
    const lastThreeMonthsMoodNoActivity = page.getByTestId(
      "last-three-months-mood-no-activity"
    );
    const currentMonthMoodTrackingDonut = page.getByTestId(
      "current-month-mood-tracking-donut"
    );

    await openSidebarOnMobile({ page, isMobile });
    await sidebarStatsButton.click();

    await expect(statsSection).toBeVisible();
    await expect(lastThreeMonthsMoodNoActivity).toBeVisible();
    await expect(currentMonthMoodTrackingDonut).not.toBeVisible();
    await expect(statsSectionWithoutData).not.toBeVisible();
    await expect(lastThreeMonthsMoodTrackingBar).not.toBeVisible();
    await expect(lastThreeMonthsMoodDistribution).not.toBeVisible();
    await expect(lastThreeMonthsDateRange).not.toBeVisible();
  });

  test("Should render a message if there is data", async ({
    page,
    isMobile,
  }) => {
    const { startDateTwoMonthsAgo, endDate } = getMonthDateRange();

    await page.route(
      `**/api/v1/track/stats?startDate=${startDateTwoMonthsAgo
        .toISOString()
        .replace("Z", "")}&endDate=${endDate.toISOString().replace("Z", "")}`,
      (route) => {
        route.fulfill(successGetTrackStatsFixtureWithLast3MonthsActivity);
      }
    );

    const sidebarStatsButton = page.getByTestId("sidebar-stats-button");
    const statsSection = page.getByTestId("stats-section");
    const statsSectionWithoutData = page.getByTestId(
      "stats-section-without-data"
    );
    const lastThreeMonthsDateRange = page.getByTestId(
      "last-three-months-date-range"
    );
    const lastThreeMonthsMoodTrackingBar = page.getByTestId(
      "last-three-months-mood-tracking-bar"
    );
    const lastThreeMonthsMoodDistribution = page.getByTestId(
      "last-three-months-mood-distribution"
    );
    const lastThreeMonthsMoodNoActivity = page.getByTestId(
      "last-three-months-mood-no-activity"
    );
    const currentMonthMoodTrackingDonut = page.getByTestId(
      "current-month-mood-tracking-donut"
    );

    await openSidebarOnMobile({ page, isMobile });
    await sidebarStatsButton.click();

    await expect(statsSection).toBeVisible();
    await expect(lastThreeMonthsMoodTrackingBar).toBeVisible();
    await expect(lastThreeMonthsMoodDistribution).toBeVisible();
    await expect(currentMonthMoodTrackingDonut).toBeVisible();

    const dateRangeText = await lastThreeMonthsDateRange.textContent();

    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();
    const possibleRanges = [
      `${monthsNames[currentMonth - 3]} ${currentYear} - ${
        monthsNames[currentMonth - 1]
      } ${currentYear}`,
      `${monthsNames[currentMonth - 2]} ${currentYear} - ${
        monthsNames[currentMonth]
      } ${currentYear}`,
      `${monthsNames[currentMonth - 2]} ${currentYear} - ${
        monthsNames[currentMonth - 1]
      } ${currentYear}`,
    ];

    const isValidRange = possibleRanges.some((range) =>
      dateRangeText?.includes(range)
    );
    expect(isValidRange).toBeTruthy();

    await expect(statsSectionWithoutData).not.toBeVisible();
    await expect(lastThreeMonthsMoodNoActivity).not.toBeVisible();
  });

  test("Should display error message from body if there is one", async ({
    page,
    isMobile,
  }) => {
    const { startDateTwoMonthsAgo, endDate } = getMonthDateRange();

    await page.route(
      `**/api/v1/track/stats?startDate=${startDateTwoMonthsAgo
        .toISOString()
        .replace("Z", "")}&endDate=${endDate.toISOString().replace("Z", "")}`,
      (route) => {
        route.fulfill(errorGetTrackStatsFixtureWithMessage);
      }
    );

    const sidebarStatsButton = page.getByTestId("sidebar-stats-button");

    await openSidebarOnMobile({ page, isMobile });
    await sidebarStatsButton.click();

    const errorResponseBody = JSON.parse(
      errorGetTrackStatsFixtureWithMessage.body
    );

    await expect(
      page.getByText(trackStatsToastMessages.error.title)
    ).toBeVisible();
    await expect(page.getByText(errorResponseBody.message)).toBeVisible();
  });

  test("Should display default error message if there is no error message in the body", async ({
    page,
    isMobile,
  }) => {
    const { startDateTwoMonthsAgo, endDate } = getMonthDateRange();

    await page.route(
      `**/api/v1/track/stats?startDate=${startDateTwoMonthsAgo
        .toISOString()
        .replace("Z", "")}&endDate=${endDate.toISOString().replace("Z", "")}`,
      (route) => {
        route.fulfill(errorGetTrackStatsFixtureWithoutMessage);
      }
    );

    const sidebarStatsButton = page.getByTestId("sidebar-stats-button");

    await openSidebarOnMobile({ page, isMobile });
    await sidebarStatsButton.click();

    await expect(
      page.getByText(trackStatsToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(trackStatsToastMessages.error.description)
    ).toBeVisible();
  });
});

