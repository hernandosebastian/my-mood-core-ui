import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import { calendarToastMessages } from "@/features/calendar/messages/calendar.messages";
import {
  createTrackToastMessages,
  createTrackErrorMessages,
} from "@/features/track/messages/create-track.messages";
import {
  updateTrackToastMessages,
  updateTrackErrorMessages,
} from "@/features/track/messages/update-track.messages";
import { deleteTrackToastMessages } from "@/features/track/messages/delete-track.messages";
import {
  errorCreateTrackFixtureWithMessage,
  errorCreateTrackFixtureWithoutMessage,
  successCreateTrackFixture,
} from "../../../fixtures/features/track/create-track.fixture";
import {
  successDeleteTrackFixture,
  errorDeleteTrackFixtureWithoutMessage,
  errorDeleteTrackFixture,
} from "../../../fixtures/features/track/delete-track.fixture";
import {
  successGetTrackFixture,
  errorGetTrackFixtureWithMessage,
  errorGetTrackFixtureWithoutMessage,
} from "../../../fixtures/features/track/get-track.fixture";
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

test.beforeEach(async ({ page, isMobile }) => {
  const fixedDate = new Date("2024-10-29T10:00:00");
  await page.context().newPage();
  await page.clock.setFixedTime(fixedDate);

  await page.goto(`${BASE_URL}`);
  await logIn({ page, isMobile, isSidebarOpen: false });
});

test.describe("features/track - get (errors)", () => {
  test("should display error message from body if there is one", async ({
    page,
    isMobile,
  }) => {
    await page.route(
      "**/api/v1/track/by-date-range?startDate=2024-10-01T03:00:00.000Z&endDate=2024-11-01T02:59:59.999Z",
      (route) => {
        route.fulfill(errorGetTrackFixtureWithMessage);
      }
    );

    await openSidebarIfMobile({ page, isMobile });
    await selectDayFromCalendar({ page, dayNumber: 10 });
    await closeSidebarIfMobile({ page, isMobile });

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
      "**/api/v1/track/by-date-range?startDate=2024-10-01T03:00:00.000Z&endDate=2024-11-01T02:59:59.999Z",
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

test.describe("features/track - create", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    await page.route(
      "**/api/v1/track/by-date-range?startDate=2024-10-01T03:00:00.000Z&endDate=2024-11-01T02:59:59.999Z",
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

  test("should validate that title is a mood value", async ({ page }) => {
    const createTrackTitleInput = page.getByTestId("create-track-title-input");
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );
    const titleErrorMessage = page.getByText(
      createTrackErrorMessages.title.moodType
    );

    const titleNotValid = "moodNotValid";

    await page.evaluate((randomTitle) => {
      const selectElement = document.querySelector(
        '[data-testid="create-track-title-input"]'
      );
      const newOption = document.createElement("option");
      newOption.value = randomTitle;
      newOption.textContent = randomTitle;
      selectElement.appendChild(newOption);
    }, titleNotValid);

    await createTrackTitleInput.selectOption({ value: titleNotValid });

    await createTrackDoneButton.click();

    await expect(titleErrorMessage).toBeVisible();
  });

  test("should validate description max length", async ({ page }) => {
    const createTrackTitleInput = page.getByTestId("create-track-title-input");
    const createTrackDescriptionInput = page.getByTestId(
      "create-track-description-input"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );
    const descriptionErrorMessage = page.getByText(
      createTrackErrorMessages.description.maxLength
    );

    await createTrackTitleInput.selectOption({ value: "Sad" });
    await createTrackDescriptionInput.click();
    await createTrackDescriptionInput.fill("x".repeat(201));
    await createTrackDoneButton.click();

    await expect(descriptionErrorMessage).toBeVisible();
  });

  test("should create successfully track", async ({ page }) => {
    await page.route("**/api/v1/track", (route) => {
      route.fulfill(successCreateTrackFixture);
    });

    const createTrackTitle = page.getByTestId("create-track-title");
    const createTrackTitleInput = page.getByTestId("create-track-title-input");
    const createTrackDescriptionInput = page.getByTestId(
      "create-track-description-input"
    );
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );

    expect(createTrackTitle).toHaveText("Track Your Mood | 10-10-2024");

    await createTrackTitleInput.selectOption({ value: "Sad" });
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
    await page.route("**/api/v1/track", (route) => {
      route.fulfill(errorCreateTrackFixtureWithMessage);
    });

    const createTrackTitle = page.getByTestId("create-track-title");
    const createTrackTitleInput = page.getByTestId("create-track-title-input");
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );

    expect(createTrackTitle).toHaveText("Track Your Mood | 10-10-2024");

    await createTrackTitleInput.selectOption({ value: "Sad" });
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
    await page.route("**/api/v1/track", (route) => {
      route.fulfill(errorCreateTrackFixtureWithoutMessage);
    });

    const createTrackTitle = page.getByTestId("create-track-title");
    const createTrackTitleInput = page.getByTestId("create-track-title-input");
    const createTrackDoneButton = page.getByTestId(
      "create-track-submit-button"
    );

    expect(createTrackTitle).toHaveText("Track Your Mood | 10-10-2024");

    await createTrackTitleInput.selectOption({ value: "Sad" });
    await createTrackDoneButton.click();

    await expect(
      page.getByText(createTrackToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(createTrackToastMessages.error.description)
    ).toBeVisible();
  });
});

test.describe("features/track - update", () => {
  test.beforeEach(async ({ page, isMobile }) => {
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

test.describe("features/track - delete", () => {
  test.beforeEach(async ({ page, isMobile }) => {
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

  test("should delete a track successfully", async ({ page }) => {
    await page.route("**/api/v1/track/1", (route, request) => {
      if (request.method() === "DELETE") {
        route.fulfill(successDeleteTrackFixture);
      }
    });

    const deleteButton = page.getByTestId("delete-track-button");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitle = page.getByTestId("create-track-title");

    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();
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

    const deleteButton = page.getByTestId("delete-track-button");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitle = page.getByTestId("create-track-title");

    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();
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

    const deleteButton = page.getByTestId("delete-track-button");
    const updateTrackTitle = page.getByTestId("update-track-title");
    const createTrackTitle = page.getByTestId("create-track-title");

    expect(updateTrackTitle).toBeVisible();
    expect(createTrackTitle).not.toBeVisible();
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
});

