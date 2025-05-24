import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import {
  updateTrackToastMessages,
  updateTrackErrorMessages,
} from "@/features/track/messages/update-track.messages";
import { successGetTrackFixture } from "../../../fixtures/features/track/get-track.fixture";
import {
  successUpdateTrackFixture,
  errorUpdateTrackFixtureWithMessage,
  errorUpdateTrackFixtureWithoutMessage,
} from "../../../fixtures/features/track/update-track.fixture";
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

test.describe("Update track", () => {
  test("Should validate description max length", async ({ page }) => {
    const createTrackTitleHappyInput = page.getByTestId(
      "update-track-Happy-button"
    );
    const updateTrackPreviousTitleInput = page.getByTestId(
      "update-track-previous-mood-button"
    );
    const updateTrackDescriptionInput = page.getByTestId(
      "update-track-description-input"
    );
    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );
    const descriptionErrorMessage = page.getByText(
      updateTrackErrorMessages.description.maxLength
    );

    await updateTrackPreviousTitleInput.click();
    await createTrackTitleHappyInput.click();
    await updateTrackDescriptionInput.click();
    await updateTrackDescriptionInput.fill("x".repeat(1001));
    await updateTrackDoneButton.click();

    await expect(descriptionErrorMessage).toBeVisible();
  });

  test("Should update successfully track", async ({ page }) => {
    await page.route("**/api/v1/track/1", (route) => {
      if (route.request().method() === "PATCH") {
        route.fulfill(successUpdateTrackFixture);
      }
    });

    const createTrackTitleHappyInput = page.getByTestId(
      "update-track-Happy-button"
    );
    const updateTrackPreviousTitleInput = page.getByTestId(
      "update-track-previous-mood-button"
    );
    const updateTrackDescriptionInput = page.getByTestId(
      "update-track-description-input"
    );
    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );

    const initialDescriptionValue =
      await updateTrackDescriptionInput.inputValue();
    expect(initialDescriptionValue).toBe("Lorem ipsum dolor sit amet");

    await updateTrackPreviousTitleInput.click();
    await createTrackTitleHappyInput.click();

    await updateTrackDescriptionInput.click();
    await updateTrackDescriptionInput.fill("Lorem ipsum dolor sit amet!");

    await updateTrackDoneButton.click();

    const updatedDescriptionValue =
      await updateTrackDescriptionInput.inputValue();
    expect(updatedDescriptionValue).toBe("Lorem ipsum dolor sit amet!");

    await expect(
      page.getByText(updateTrackToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(updateTrackToastMessages.success.description)
    ).toBeVisible();
  });

  test("Should display error message from body if there is one", async ({
    page,
  }) => {
    await page.route("**/api/v1/track/1", (route) => {
      if (route.request().method() === "PATCH") {
        route.fulfill(errorUpdateTrackFixtureWithMessage);
      }
    });

    const createTrackTitleHappyInput = page.getByTestId(
      "update-track-Happy-button"
    );
    const updateTrackPreviousTitleInput = page.getByTestId(
      "update-track-previous-mood-button"
    );
    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );

    await updateTrackPreviousTitleInput.click();
    await createTrackTitleHappyInput.click();
    await updateTrackDoneButton.click();

    const errorResponseBody = JSON.parse(
      errorUpdateTrackFixtureWithMessage.body
    );

    await expect(
      page.getByText(updateTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(page.getByText(errorResponseBody.message)).toBeVisible();
  });

  test("Should display default error message if there is no error message in the body", async ({
    page,
  }) => {
    await page.route("**/api/v1/track/1", (route) => {
      if (route.request().method() === "PATCH") {
        route.fulfill(errorUpdateTrackFixtureWithoutMessage);
      }
    });

    const createTrackTitleHappyInput = page.getByTestId(
      "update-track-Happy-button"
    );
    const updateTrackPreviousTitleInput = page.getByTestId(
      "update-track-previous-mood-button"
    );
    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );

    await updateTrackPreviousTitleInput.click();
    await createTrackTitleHappyInput.click();
    await updateTrackDoneButton.click();

    await expect(
      page.getByText(updateTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(updateTrackToastMessages.error.description)
    ).toBeVisible();
  });
});
