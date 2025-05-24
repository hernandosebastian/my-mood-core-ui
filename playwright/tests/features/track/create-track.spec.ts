import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import {
  errorCreateTrackFixtureWithMessage,
  errorCreateTrackFixtureWithoutMessage,
  successCreateTrackFixture,
} from "../../../fixtures/features/track/create-track.fixture";
import {
  createTrackToastMessages,
  createTrackErrorMessages,
} from "@/features/track/messages/create-track.messages";
import {
  completeLoginForm,
  openSidebarOnMobile,
  selectDayFromCalendar,
  getMonthDateRange,
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

test.describe("Create track", () => {
  test("Should validate description max length", async ({ page, isMobile }) => {
    const { firstDayOfYear, lastDayOfYear, startDate, endDate } =
      getMonthDateRange();

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${firstDayOfYear.toISOString()}&endDate=${lastDayOfYear.toISOString()}`,
      (route) => {
        route.fulfill({
          json: [],
        });
      }
    );

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      (route) => {
        route.fulfill({
          json: [],
        });
      }
    );

    await openSidebarOnMobile({ page, isMobile });

    await expect(page.getByTestId("sidebar-date-picker")).toBeVisible();

    await selectDayFromCalendar({ page, dayNumber: 10 });

    const createTrackTitleSadInput = page.getByTestId(
      "create-track-Sad-button"
    );
    const createTrackDescriptionInput = page.getByTestId(
      "create-track-description-input"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );
    const descriptionErrorMessage = page.getByText(
      createTrackErrorMessages.description.maxLength
    );

    await createTrackTitleSadInput.click();
    await createTrackDescriptionInput.click();
    await createTrackDescriptionInput.fill("x".repeat(1001));
    await createTrackDoneButton.click();

    await expect(descriptionErrorMessage).toBeVisible();
  });

  test("Should create successfully track", async ({ page, isMobile }) => {
    const { firstDayOfYear, lastDayOfYear, startDate, endDate } =
      getMonthDateRange();

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${firstDayOfYear.toISOString()}&endDate=${lastDayOfYear.toISOString()}`,
      (route) => {
        route.fulfill({
          json: [],
        });
      }
    );

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      (route) => {
        route.fulfill({
          json: [],
        });
      }
    );

    await page.route("**/api/v1/track", (route) => {
      route.fulfill(successCreateTrackFixture);
    });

    await openSidebarOnMobile({ page, isMobile });

    await selectDayFromCalendar({ page, dayNumber: 10 });

    const createTrackTitle = page.getByTestId("create-track-title");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitleSadInput = page.getByTestId(
      "create-track-Sad-button"
    );
    const createTrackDescriptionInput = page.getByTestId(
      "create-track-description-input"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );
    const updateTrackDescriptionInput = page.getByTestId(
      "update-track-description-input"
    );
    const descriptionText = "Lorem ipsum dolor sit amet";

    await expect(createTrackTitle).toBeVisible();
    await expect(updateTrackTitle).not.toBeVisible();

    await createTrackTitleSadInput.click();
    await createTrackDescriptionInput.click();
    await createTrackDescriptionInput.fill(descriptionText);
    await createTrackDoneButton.click();

    await expect(createTrackTitle).not.toBeVisible();
    await expect(updateTrackTitle).toBeVisible();

    await expect(updateTrackDescriptionInput).toHaveText(descriptionText);

    await expect(
      page.getByText(createTrackToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(createTrackToastMessages.success.description)
    ).toBeVisible();
  });

  test("Should display error message from body if there is one", async ({
    page,
    isMobile,
  }) => {
    const { firstDayOfYear, lastDayOfYear, startDate, endDate } =
      getMonthDateRange();

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${firstDayOfYear.toISOString()}&endDate=${lastDayOfYear.toISOString()}`,
      (route) => {
        route.fulfill({
          json: [],
        });
      }
    );

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      (route) => {
        route.fulfill({
          json: [],
        });
      }
    );

    await page.route("**/api/v1/track", (route) => {
      route.fulfill(errorCreateTrackFixtureWithMessage);
    });

    await openSidebarOnMobile({ page, isMobile });

    await selectDayFromCalendar({ page, dayNumber: 10 });

    const createTrackTitle = page.getByTestId("create-track-title");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitleSadInput = page.getByTestId(
      "create-track-Sad-button"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );

    await expect(createTrackTitle).toBeVisible();
    await expect(updateTrackTitle).not.toBeVisible();

    await createTrackTitleSadInput.click();
    await createTrackDoneButton.click();

    await expect(createTrackTitle).toBeVisible();
    await expect(updateTrackTitle).not.toBeVisible();

    const errorResponseBody = JSON.parse(
      errorCreateTrackFixtureWithMessage.body
    );

    await expect(
      page.getByText(createTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(page.getByText(errorResponseBody.message)).toBeVisible();
  });

  test("Should display default error message if there is no error message in the body", async ({
    page,
    isMobile,
  }) => {
    const { firstDayOfYear, lastDayOfYear, startDate, endDate } =
      getMonthDateRange();

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${firstDayOfYear.toISOString()}&endDate=${lastDayOfYear.toISOString()}`,
      (route) => {
        route.fulfill({
          json: [],
        });
      }
    );

    await page.route(
      `**/api/v1/track/by-date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
      (route) => {
        route.fulfill({
          json: [],
        });
      }
    );

    await page.route("**/api/v1/track", (route) => {
      route.fulfill(errorCreateTrackFixtureWithoutMessage);
    });

    await openSidebarOnMobile({ page, isMobile });

    await selectDayFromCalendar({ page, dayNumber: 10 });

    const createTrackTitle = page.getByTestId("create-track-title");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitleSadInput = page.getByTestId(
      "create-track-Sad-button"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );

    await expect(createTrackTitle).toBeVisible();
    await expect(updateTrackTitle).not.toBeVisible();

    await createTrackTitleSadInput.click();
    await createTrackDoneButton.click();

    await expect(createTrackTitle).toBeVisible();
    await expect(updateTrackTitle).not.toBeVisible();

    await expect(
      page.getByText(createTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(createTrackToastMessages.error.description)
    ).toBeVisible();
  });
});
