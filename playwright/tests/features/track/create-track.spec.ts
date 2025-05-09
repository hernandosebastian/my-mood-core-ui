import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import {
  createTrackToastMessages,
  createTrackErrorMessages,
} from "@/features/track/messages/create-track.messages";
import {
  errorCreateTrackFixtureWithMessage,
  errorCreateTrackFixtureWithoutMessage,
  successCreateTrackFixture,
} from "../../../fixtures/features/track/create-track.fixture";
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
    "**/api/v1/registro/by-date-range?startDate=2024-10-01T00:00:00.000Z&endDate=2024-10-31T23:59:59.999Z",
    (route) => {
      route.fulfill({
        json: [],
      });
    }
  );

  await openSidebarIfMobile({ page, isMobile });
  await selectDayFromCalendar({ page, dayNumber: 10 });
  await closeSidebarIfMobile({ page, isMobile });
});

test.describe("features/track - create", () => {
  test("should validate description max length", async ({ page }) => {
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

  test("should create successfully track", async ({ page }) => {
    await page.route("**/api/v1/registro", (route) => {
      route.fulfill(successCreateTrackFixture);
    });

    const createTrackTitle = page.getByTestId("create-track-title");
    const createTrackTitleSadInput = page.getByTestId(
      "create-track-Sad-button"
    );
    const createTrackDescriptionInput = page.getByTestId(
      "create-track-description-input"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );

    expect(createTrackTitle).toHaveText("Track Your Mood | 10-10-2024");

    await createTrackTitleSadInput.click();
    await createTrackDescriptionInput.click();
    await createTrackDescriptionInput.fill("Lorem ipsum dolor sit amet");
    await createTrackDoneButton.click();

    const updateTrackTitle = page.getByTestId("update-track-title");
    expect(updateTrackTitle).toHaveText("Update Your Track | 10-10-2024");

    await expect(
      page.getByText(createTrackToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(createTrackToastMessages.success.description)
    ).toBeVisible();
  });

  test("should display error message from body if there is one", async ({
    page,
  }) => {
    await page.route("**/api/v1/registro", (route) => {
      route.fulfill(errorCreateTrackFixtureWithMessage);
    });

    const createTrackTitle = page.getByTestId("create-track-title");
    const createTrackTitleSadInput = page.getByTestId(
      "create-track-Sad-button"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );

    expect(createTrackTitle).toHaveText("Track Your Mood | 10-10-2024");

    await createTrackTitleSadInput.click();
    await createTrackDoneButton.click();

    const errorResponseBody = JSON.parse(
      errorCreateTrackFixtureWithMessage.body
    );

    await expect(
      page.getByText(createTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(page.getByText(errorResponseBody.message)).toBeVisible();
  });

  test("should display default error message if there is no error message in the body", async ({
    page,
  }) => {
    await page.route("**/api/v1/registro", (route) => {
      route.fulfill(errorCreateTrackFixtureWithoutMessage);
    });

    const createTrackTitle = page.getByTestId("create-track-title");
    const createTrackTitleSadInput = page.getByTestId(
      "create-track-Sad-button"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );

    expect(createTrackTitle).toHaveText("Track Your Mood | 10-10-2024");

    await createTrackTitleSadInput.click();
    await createTrackDoneButton.click();

    await expect(
      page.getByText(createTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(createTrackToastMessages.error.description)
    ).toBeVisible();
  });
});
