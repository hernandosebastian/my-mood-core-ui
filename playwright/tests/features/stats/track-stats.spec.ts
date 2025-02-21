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
import { closeSidebarIfMobile, logIn, openSidebarIfMobile } from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page, isMobile }) => {
  const fixedDate = new Date("2024-10-29T10:00:00");
  await page.context().newPage();
  await page.clock.setFixedTime(fixedDate);

  await page.route(
    "**/api/v1/track/by-date-range?startDate=2024-10-01T00:00:00.000Z&endDate=2024-10-31T23:59:59.999Z",
    (route) => {
      route.fulfill({
        json: [],
      });
    }
  );

  await page.goto(`${BASE_URL}`);
  await logIn({ page, isMobile, isSidebarOpen: false });
});

test.describe("features/stats", () => {
  const dateRange = "August 2024 - October 2024";

  test("should render a message if there is no data", async ({
    page,
    isMobile,
  }) => {
    await page.route(
      "**/api/v1/track/stats?startDate=2024-08-01T00:00:00.000&endDate=2024-10-31T23:59:59.999",
      (route) => {
        route.fulfill(successGetTrackStatsFixtureWithoutActivity);
      }
    );

    const sidebarStatsButton = page.getByTestId("sidebar-stats-button");
    const statsSection = page.getByTestId("stats-section");
    const statsSectionWithoutData = page.getByTestId(
      "stats-section-without-data"
    );

    await openSidebarIfMobile({ page, isMobile });
    await sidebarStatsButton.click();
    await closeSidebarIfMobile({ page, isMobile });

    await expect(statsSectionWithoutData).toBeVisible();
    await expect(statsSection).not.toBeVisible();
  });

  test("should render a message if there is data without last three months activity", async ({
    page,
    isMobile,
  }) => {
    await page.route(
      "**/api/v1/track/stats?startDate=2024-08-01T00:00:00.000&endDate=2024-10-31T23:59:59.999",
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

    await openSidebarIfMobile({ page, isMobile });
    await sidebarStatsButton.click();
    await closeSidebarIfMobile({ page, isMobile });

    await expect(statsSection).toBeVisible();
    await expect(lastThreeMonthsMoodNoActivity).toBeVisible();
    await expect(currentMonthMoodTrackingDonut).not.toBeVisible();
    await expect(statsSectionWithoutData).not.toBeVisible();
    await expect(lastThreeMonthsMoodTrackingBar).not.toBeVisible();
    await expect(lastThreeMonthsMoodDistribution).not.toBeVisible();
    await expect(lastThreeMonthsDateRange).not.toBeVisible();
  });

  test("should render a message if there is data", async ({
    page,
    isMobile,
  }) => {
    await page.route(
      "**/api/v1/track/stats?startDate=2024-08-01T00:00:00.000&endDate=2024-10-31T23:59:59.999",
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

    await openSidebarIfMobile({ page, isMobile });
    await sidebarStatsButton.click();
    await closeSidebarIfMobile({ page, isMobile });

    await expect(statsSection).toBeVisible();
    await expect(lastThreeMonthsMoodTrackingBar).toBeVisible();
    await expect(lastThreeMonthsMoodDistribution).toBeVisible();
    await expect(currentMonthMoodTrackingDonut).toBeVisible();
    await expect(lastThreeMonthsDateRange).toContainText(dateRange);
    await expect(statsSectionWithoutData).not.toBeVisible();
    await expect(lastThreeMonthsMoodNoActivity).not.toBeVisible();
  });

  test("should display error message from body if there is one", async ({
    page,
    isMobile,
  }) => {
    await page.route(
      "**/api/v1/track/stats?startDate=2024-08-01T00:00:00.000&endDate=2024-10-31T23:59:59.999",
      (route) => {
        route.fulfill(errorGetTrackStatsFixtureWithMessage);
      }
    );

    const sidebarStatsButton = page.getByTestId("sidebar-stats-button");

    await openSidebarIfMobile({ page, isMobile });
    await sidebarStatsButton.click();
    await closeSidebarIfMobile({ page, isMobile });

    const errorResponseBody = JSON.parse(
      errorGetTrackStatsFixtureWithMessage.body
    );

    const errorToastMessageTitle = page.getByText(
      trackStatsToastMessages.error.title
    );
    const errorToastMessageDescription = page.getByText(
      errorResponseBody.message
    );

    await expect(errorToastMessageTitle).toBeVisible({ timeout: 10_000 });
    await expect(errorToastMessageDescription).toBeVisible({ timeout: 10_000 });
  });

  test("should display default error message if there is no error message in the body", async ({
    page,
    isMobile,
  }) => {
    await page.route(
      "**/api/v1/track/stats?startDate=2024-08-01T00:00:00.000&endDate=2024-10-31T23:59:59.999",
      (route) => {
        route.fulfill(errorGetTrackStatsFixtureWithoutMessage);
      }
    );

    const sidebarStatsButton = page.getByTestId("sidebar-stats-button");

    await openSidebarIfMobile({ page, isMobile });
    await sidebarStatsButton.click();
    await closeSidebarIfMobile({ page, isMobile });

    const errorToastMessageTitle = page.getByText(
      trackStatsToastMessages.error.title
    );
    const errorToastMessageDescription = page.getByText(
      trackStatsToastMessages.error.description
    );

    await expect(errorToastMessageTitle).toBeVisible();
    await expect(errorToastMessageDescription).toBeVisible();
  });
});
