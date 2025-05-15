import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { deleteTrackToastMessages } from "@/features/track/messages/delete-track.messages";
import {
  successDeleteTrackFixture,
  errorDeleteTrackFixtureWithoutMessage,
  errorDeleteTrackFixture,
} from "../../../fixtures/features/track/delete-track.fixture";
import { successGetTrackFixture } from "../../../fixtures/features/track/get-track.fixture";
import {
  completeLoginForm,
  getMonthDateRange,
  openSidebarOnMobile,
  selectDayFromCalendar,
} from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page, isMobile }) => {
  const { firstDayOfYear, lastDayOfYear, startDate, endDate } =
    getMonthDateRange();

  await page.route(
    `**/api/v1/track/by-date-range?startDate=${firstDayOfYear.toISOString()}&endDate=${lastDayOfYear.toISOString()}`,
    (route) => {
      route.fulfill(successGetTrackFixture);
    }
  );

  await page.route(
    `**/api/v1/track/by-date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
    (route) => {
      route.fulfill(successGetTrackFixture);
    }
  );

  await page.goto(`${BASE_URL}`);

  await openSidebarOnMobile({ page, isMobile });

  await page.getByTestId("sidebar-log-in-button").click();
  expect(page.url()).toContain("/iniciar-sesion");

  await completeLoginForm({ page });

  await openSidebarOnMobile({ page, isMobile });

  await selectDayFromCalendar({ page, dayNumber: 10 });
});

test.describe("Delete track", () => {
  test("Should delete a track successfully", async ({ page }) => {
    await page.route("**/api/v1/track/1", (route, request) => {
      if (request.method() === "DELETE") {
        route.fulfill(successDeleteTrackFixture);
      }
    });

    const openDeleteTrackDialogButton = page.getByTestId(
      "open-delete-track-dialog-button"
    );
    const deleteButton = page.getByTestId("delete-track-button");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitle = page.getByTestId("create-track-title");

    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();
    await openDeleteTrackDialogButton.click();
    await deleteButton.click();
    await expect(updateTrackTitle).not.toBeVisible();
    await expect(createTrackTitle).toBeVisible();

    await expect(
      page.getByText(deleteTrackToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(deleteTrackToastMessages.success.description)
    ).toBeVisible();
  });

  test("Should display error message if there is an error", async ({
    page,
  }) => {
    await page.route("**/api/v1/track/1", (route, request) => {
      if (request.method() === "DELETE") {
        route.fulfill(errorDeleteTrackFixture);
      }
    });

    const openDeleteTrackDialogButton = page.getByTestId(
      "open-delete-track-dialog-button"
    );
    const deleteButton = page.getByTestId("delete-track-button");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitle = page.getByTestId("create-track-title");

    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();
    await openDeleteTrackDialogButton.click();
    await deleteButton.click();
    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();

    const errorResponseBody = JSON.parse(errorDeleteTrackFixture.body);

    await expect(
      page.getByText(deleteTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(page.getByText(errorResponseBody.message)).toBeVisible();
  });

  test("Should display default error message if there is no error message in the body", async ({
    page,
  }) => {
    await page.route("**/api/v1/track/1", (route, request) => {
      if (request.method() === "DELETE") {
        route.fulfill(errorDeleteTrackFixtureWithoutMessage);
      }
    });

    const openDeleteTrackDialogButton = page.getByTestId(
      "open-delete-track-dialog-button"
    );
    const deleteButton = page.getByTestId("delete-track-button");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitle = page.getByTestId("create-track-title");

    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();
    await openDeleteTrackDialogButton.click();
    await deleteButton.click();
    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();

    await expect(
      page.getByText(deleteTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(deleteTrackToastMessages.error.description)
    ).toBeVisible();
  });

  test("Should cancel deleting a track", async ({ page }) => {
    const openDeleteTrackDialogButton = page.getByTestId(
      "open-delete-track-dialog-button"
    );
    const cancelDeleteButton = page.getByTestId("cancel-delete-track-button");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitle = page.getByTestId("create-track-title");

    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();
    await openDeleteTrackDialogButton.click();
    await cancelDeleteButton.click();

    expect(createTrackTitle).not.toBeVisible();

    const isHidden = await updateTrackTitle.isHidden();
    const isVisible = await updateTrackTitle.isVisible();

    expect(isHidden || isVisible).toBe(true);
  });
});
