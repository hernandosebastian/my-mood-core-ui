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
  closeSidebarIfMobile,
  logIn,
  openSidebarIfMobile,
  selectDayFromCalendar,
} from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.describe("features/track - update", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    const fixedDate = new Date("2024-10-29T10:00:00");
    await page.context().newPage();
    await page.clock.setFixedTime(fixedDate);

    await page.goto(`${BASE_URL}`);
    await logIn({ page, isMobile, isSidebarOpen: false });

    await page.route(
      "**/api/v1/track/by-date-range?startDate=2024-10-01T03:00:00.000Z&endDate=2024-11-01T02:59:59.999Z",
      (route) => {
        route.fulfill(successGetTrackFixture);
      }
    );

    await openSidebarIfMobile({ page, isMobile });
    await selectDayFromCalendar({ page, dayNumber: 10 });
    await closeSidebarIfMobile({ page, isMobile });
  });

  test("should validate that title is a mood value", async ({ page }) => {
    const updateTrackTitleInput = page.getByTestId("update-track-title-input");
    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );
    const titleErrorMessage = page.getByText(
      updateTrackErrorMessages.title.moodType
    );

    const titleNotValid = "moodNotValid";

    await page.evaluate((randomTitle) => {
      const selectElement = document.querySelector(
        '[data-testid="update-track-title-input"]'
      );
      const newOption = document.createElement("option");
      newOption.value = randomTitle;
      newOption.textContent = randomTitle;
      selectElement.appendChild(newOption);
    }, titleNotValid);

    await updateTrackTitleInput.selectOption({ value: titleNotValid });

    await updateTrackDoneButton.click();

    await expect(titleErrorMessage).toBeVisible();
  });

  test("should validate description max length", async ({ page }) => {
    const updateTrackTitleInput = page.getByTestId("update-track-title-input");
    const updateTrackDescriptionInput = page.getByTestId(
      "update-track-description-input"
    );
    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );
    const descriptionErrorMessage = page.getByText(
      updateTrackErrorMessages.description.maxLength
    );

    await updateTrackTitleInput.selectOption({ value: "Sad" });
    await updateTrackDescriptionInput.click();
    await updateTrackDescriptionInput.fill("x".repeat(201));
    await updateTrackDoneButton.click();

    await expect(descriptionErrorMessage).toBeVisible();
  });

  test("should update successfully track", async ({ page }) => {
    await page.route("**/api/v1/track/1", (route) => {
      if (route.request().method() === "PATCH") {
        route.fulfill(successUpdateTrackFixture);
      }
    });

    const updateTrackTitleInput = page.getByTestId("update-track-title-input");
    const updateTrackDescriptionInput = page.getByTestId(
      "update-track-description-input"
    );
    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );

    const selectedValue = await updateTrackTitleInput.inputValue();
    expect(selectedValue).toBe("Sad");

    const initialDescriptionValue =
      await updateTrackDescriptionInput.inputValue();
    expect(initialDescriptionValue).toBe("Lorem ipsum dolor sit amet");

    await updateTrackTitleInput.selectOption({ value: "Happy" });

    const updatedSelectedValue = await updateTrackTitleInput.inputValue();
    expect(updatedSelectedValue).toBe("Happy");

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

  test("should display error message from body if there is one", async ({
    page,
  }) => {
    await page.route("**/api/v1/track/1", (route) => {
      if (route.request().method() === "PATCH") {
        route.fulfill(errorUpdateTrackFixtureWithMessage);
      }
    });

    const updateTrackTitleInput = page.getByTestId("update-track-title-input");

    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );

    await updateTrackTitleInput.selectOption({ value: "Happy" });
    await updateTrackDoneButton.click();

    const errorResponseBody = JSON.parse(
      errorUpdateTrackFixtureWithMessage.body
    );

    await expect(
      page.getByText(updateTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(page.getByText(errorResponseBody.message)).toBeVisible();
  });

  test("should display default error message if there is no error message in the body", async ({
    page,
  }) => {
    await page.route("**/api/v1/track/1", (route) => {
      if (route.request().method() === "PATCH") {
        route.fulfill(errorUpdateTrackFixtureWithoutMessage);
      }
    });

    const updateTrackTitleInput = page.getByTestId("update-track-title-input");

    const updateTrackDoneButton = page.getByTestId(
      "update-track-submit-button"
    );

    await updateTrackTitleInput.selectOption({ value: "Happy" });
    await updateTrackDoneButton.click();

    await expect(
      page.getByText(updateTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(updateTrackToastMessages.error.description)
    ).toBeVisible();
  });
});

