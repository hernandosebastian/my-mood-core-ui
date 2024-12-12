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
  closeSidebarIfMobile,
  logIn,
  openSidebarIfMobile,
  selectDayFromCalendar,
} from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page, isMobile }) => {
  const fixedDate = new Date("2024-10-29T10:00:00");
  await page.context().newPage();
  await page.clock.setFixedTime(fixedDate);

  await page.goto(`${BASE_URL}`);
  await logIn({ page, isMobile, isSidebarOpen: false });

  await page.route(
    "**/api/v1/track/by-date-range?startDate=2024-10-01T00:00:00.000Z&endDate=2024-10-31T23:59:59.999Z",
    (route) => {
      route.fulfill(successGetTrackFixture);
    }
  );

  await openSidebarIfMobile({ page, isMobile });
  await selectDayFromCalendar({ page, dayNumber: 10 });
  await closeSidebarIfMobile({ page, isMobile });
});

test.describe("features/track - delete", () => {
  test("should delete a track successfully", async ({ page }) => {
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

  test("should display error message if there is an error", async ({
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

  test("should display default error message if there is no error message in the body", async ({
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

  test("should cancel deleting a track", async ({ page }) => {
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
    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();
  });
});
