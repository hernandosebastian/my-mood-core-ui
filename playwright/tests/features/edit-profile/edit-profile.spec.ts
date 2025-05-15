import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { successGetMeFixture } from "fixtures/features/authentication/get-me.fixture";
import {
  successEditProfileFixture,
  successEditProfileOnlyAvatarFixture,
  successEditProfileOnlyNicknameFixture,
  errorEditProfileNicknameTakenFixture,
  errorEditProfileFixtureWithoutMessage,
} from "fixtures/features/edit-profile/edit-profile.fixture";
import { editProfileToastMessages } from "@/features/edit-profile/messages";
import { editProfileErrorMessages } from "@/features/edit-profile/messages";
import { completeLoginForm, openSidebarOnMobile } from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.use({
  storageState: "playwright/.auth/storage.json",
});

test.beforeEach(async ({ page, isMobile }) => {
  await page.goto(`${BASE_URL}`);

  await openSidebarOnMobile({ page, isMobile });

  await page.getByTestId("sidebar-log-in-button").click();
  expect(page.url()).toContain("/iniciar-sesion");

  await completeLoginForm({ page });

  await openSidebarOnMobile({ page, isMobile });
});

test.describe("Edit profile", () => {
  test("Should show error when nickname exceeds max length", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });
    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    const nicknameInput = page.getByTestId("edit-profile-nickname");
    const invalidNickname = "a".repeat(37);
    const submitButton = page.getByTestId("edit-profile-submit-button");

    await nicknameInput.click();
    await nicknameInput.fill(invalidNickname);
    await nicknameInput.blur();
    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click({ force: true });

    await expect(
      page.getByText(editProfileErrorMessages.nickname.maxLength)
    ).toBeVisible();
  });

  test("Should show error when nickname contains invalid characters", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });
    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    const nicknameInput = page.getByTestId("edit-profile-nickname");
    const invalidNickname = "invalid@nickname!";
    const submitButton = page.getByTestId("edit-profile-submit-button");

    await nicknameInput.click();
    await nicknameInput.fill(invalidNickname);
    await nicknameInput.blur();
    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click({ force: true });

    await expect(
      page.getByText(editProfileErrorMessages.nickname.invalid)
    ).toBeVisible();
  });

  test("Should show error when avatar file size exceeds limit", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });
    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    const submitButton = page.getByTestId("edit-profile-submit-button");

    await page.evaluate(() => {
      const input = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      if (!input) {
        return;
      }

      const file = new File([""], "test.jpg", {
        type: "image/jpeg",
      });

      Object.defineProperty(file, "size", {
        value: 2 * 1024 * 1024,
      });

      Object.defineProperty(input, "files", {
        value: [file],
      });

      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click({ force: true });

    await expect(
      page.getByText(editProfileErrorMessages.avatar.invalidSize)
    ).toBeVisible();
  });

  test("Should show error when avatar file type is invalid", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });
    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    const submitButton = page.getByTestId("edit-profile-submit-button");

    await page.evaluate(() => {
      const input = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      if (!input) {
        return;
      }

      const file = new File([""], "test.pdf", {
        type: "application/pdf",
      });

      Object.defineProperty(input, "files", {
        value: [file],
      });

      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click({ force: true });

    await expect(
      page.getByText(editProfileErrorMessages.avatar.invalidType)
    ).toBeVisible();
  });

  test("Should successfully submit the form with new avatar and nickname", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/avatar", (route) => {
      route.fulfill(successEditProfileOnlyAvatarFixture);
    });

    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else if (route.request().method() === "PATCH") {
        route.fulfill(successEditProfileFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });
    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    await expect(page).toHaveURL(`${BASE_URL}editar-perfil`);

    const nicknameInput = page.getByTestId("edit-profile-nickname");

    await nicknameInput.click();
    await nicknameInput.fill("NewNickname123");

    await page.evaluate(() => {
      const input = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      if (!input) {
        return;
      }

      const mockFile = new File(["mock content"], "test-avatar.png", {
        type: "image/png",
      });
      Object.defineProperty(input, "files", {
        value: [mockFile],
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    await page
      .getByTestId("edit-profile-submit-button")
      .scrollIntoViewIfNeeded();
    await page.getByTestId("edit-profile-submit-button").click({ force: true });

    await expect(
      page.getByText(editProfileToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(editProfileToastMessages.success.description)
    ).toBeVisible();

    await expect(page).toHaveURL(`${BASE_URL}`);
  });

  test("Should successfully submit the form with new avatar only", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/avatar", (route) => {
      route.fulfill(successEditProfileOnlyAvatarFixture);
    });

    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else if (route.request().method() === "PATCH") {
        route.fulfill(successEditProfileOnlyAvatarFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });
    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    const nicknameInput = page.getByTestId("edit-profile-nickname");
    const getMeBody = JSON.parse(successGetMeFixture.body);

    await expect(nicknameInput).toHaveValue(getMeBody.nickname);

    await page.evaluate(() => {
      const input = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      if (!input) {
        return;
      }

      const mockFile = new File(["mock content"], "test-avatar.png", {
        type: "image/png",
      });
      Object.defineProperty(input, "files", {
        value: [mockFile],
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    await page
      .getByTestId("edit-profile-submit-button")
      .scrollIntoViewIfNeeded();
    await page.getByTestId("edit-profile-submit-button").click({ force: true });

    await expect(
      page.getByText(editProfileToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(editProfileToastMessages.success.description)
    ).toBeVisible();
  });

  test("Should successfully submit the form with new nickname only", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else if (route.request().method() === "PATCH") {
        route.fulfill(successEditProfileOnlyNicknameFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    const nicknameInput = page.getByTestId("edit-profile-nickname");

    await nicknameInput.click();
    await nicknameInput.fill("NewNickname123");

    await page
      .getByTestId("edit-profile-submit-button")
      .scrollIntoViewIfNeeded();
    await page.getByTestId("edit-profile-submit-button").click({ force: true });

    await expect(
      page.getByText(editProfileToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(editProfileToastMessages.success.description)
    ).toBeVisible();

    await expect(page).toHaveURL(`${BASE_URL}`);
  });

  test("Should get error if nickname is taken", async ({ page, isMobile }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else if (route.request().method() === "PATCH") {
        route.fulfill(errorEditProfileNicknameTakenFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    const nicknameInput = page.getByTestId("edit-profile-nickname");

    await nicknameInput.click();
    await nicknameInput.fill("NicknameTaken");

    await page
      .getByTestId("edit-profile-submit-button")
      .scrollIntoViewIfNeeded();
    await page.getByTestId("edit-profile-submit-button").click({ force: true });

    const errorResponseBody = JSON.parse(
      errorEditProfileNicknameTakenFixture.body
    );

    await expect(
      page.getByText(editProfileToastMessages.error.title)
    ).toBeVisible();
    await expect(page.getByText(errorResponseBody.message)).toBeVisible();
  });

  test("Should display default error message if there is no error message in the body", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else if (route.request().method() === "PATCH") {
        route.fulfill(errorEditProfileFixtureWithoutMessage);
      } else {
        route.continue();
      }
    });

    await openSidebarOnMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    const nicknameInput = page.getByTestId("edit-profile-nickname");

    await nicknameInput.click();
    await nicknameInput.fill("NicknameError");

    await page
      .getByTestId("edit-profile-submit-button")
      .scrollIntoViewIfNeeded();
    await page.getByTestId("edit-profile-submit-button").click({ force: true });

    await expect(
      page.getByText(editProfileToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(editProfileToastMessages.error.description)
    ).toBeVisible();
  });
});

