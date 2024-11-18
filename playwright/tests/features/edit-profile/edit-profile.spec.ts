import { test, expect } from "@playwright/test";
import { editProfileToastMessages } from "@/features/edit-profile/messages/edit-profile.messages";
import { successGetMeFixture } from "../../../fixtures/features/authentication/get-me.fixture";
import {
  errorEditProfileFixtureWithoutMessage,
  errorEditProfileNicknameTakenFixture,
  successEditProfileFixture,
  successEditProfileOnlyAvatarFixture,
  successEditProfileOnlyNicknameFixture,
} from "../../../fixtures/features/edit-profile/edit-profile.fixture";
import dotenv from "dotenv";

import { logIn, openSidebarIfMobile, closeSidebarIfMobile } from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page, isMobile }) => {
  await page.goto(`${BASE_URL}`);
  await logIn({ page, isMobile });
});

test.describe("features/edit-profile", () => {
  test("should successfully submit the form with new avatar and nickname", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else if (route.request().method() === "PATCH") {
        route.fulfill(successEditProfileFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarIfMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    await closeSidebarIfMobile({ page, isMobile });

    const currentAvatar = page.getByTestId("current-avatar");
    const nicknameInput = page.getByTestId("edit-profile-nickname");

    const getMeBody = JSON.parse(successGetMeFixture.body);
    await expect(currentAvatar).toHaveAttribute("src", getMeBody.avatarSrc);
    await expect(nicknameInput).toHaveValue(getMeBody.nickname);

    await page.getByTestId("avatar-Multiavatar-0af9e888d36c86d96f").click();
    await nicknameInput.click();
    await nicknameInput.fill("TestNickname");

    const responseEditProfileBody = JSON.parse(successEditProfileFixture.body);
    await expect(currentAvatar).toHaveAttribute(
      "src",
      responseEditProfileBody.avatarSrc
    );
    await expect(nicknameInput).toHaveValue(responseEditProfileBody.nickname);

    await page.getByTestId("edit-profile-submit-button").click();

    await expect(
      page.getByText(editProfileToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(editProfileToastMessages.success.description)
    ).toBeVisible();

    await expect(page).toHaveURL(`${BASE_URL}`);
  });

  test("should successfully submit the form with new avatar", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else if (route.request().method() === "PATCH") {
        route.fulfill(successEditProfileOnlyAvatarFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarIfMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    await closeSidebarIfMobile({ page, isMobile });

    const currentAvatar = page.getByTestId("current-avatar");
    const nicknameInput = page.getByTestId("edit-profile-nickname");

    const getMeBody = JSON.parse(successGetMeFixture.body);
    await expect(currentAvatar).toHaveAttribute("src", getMeBody.avatarSrc);
    await expect(nicknameInput).toHaveValue(getMeBody.nickname);

    await page.getByTestId("avatar-Multiavatar-0af9e888d36c86d96f").click();

    const responseEditProfileBody = JSON.parse(
      successEditProfileOnlyAvatarFixture.body
    );
    await expect(currentAvatar).toHaveAttribute(
      "src",
      responseEditProfileBody.avatarSrc
    );
    await expect(nicknameInput).toHaveValue(getMeBody.nickname);

    await page.getByTestId("edit-profile-submit-button").click();

    await expect(
      page.getByText(editProfileToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(editProfileToastMessages.success.description)
    ).toBeVisible();

    await expect(page).toHaveURL(`${BASE_URL}`);
  });

  test("should successfully submit the form with nickname", async ({
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

    await openSidebarIfMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    await closeSidebarIfMobile({ page, isMobile });

    const currentAvatar = page.getByTestId("current-avatar");
    const nicknameInput = page.getByTestId("edit-profile-nickname");

    const getMeBody = JSON.parse(successGetMeFixture.body);
    await expect(currentAvatar).toHaveAttribute("src", getMeBody.avatarSrc);
    await expect(nicknameInput).toHaveValue(getMeBody.nickname);

    await nicknameInput.click();
    await nicknameInput.fill("TestNickname");

    const responseEditProfileBody = JSON.parse(
      successEditProfileOnlyNicknameFixture.body
    );
    await expect(currentAvatar).toHaveAttribute("src", getMeBody.avatarSrc);
    await expect(nicknameInput).toHaveValue(responseEditProfileBody.nickname);

    await page.getByTestId("edit-profile-submit-button").click();

    await expect(
      page.getByText(editProfileToastMessages.success.title)
    ).toBeVisible();
    await expect(
      page.getByText(editProfileToastMessages.success.description)
    ).toBeVisible();

    await expect(page).toHaveURL(`${BASE_URL}`);
  });

  test("should get error if nickname is taken", async ({ page, isMobile }) => {
    await page.route("**/api/v1/user/me", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill(successGetMeFixture);
      } else if (route.request().method() === "PATCH") {
        route.fulfill(errorEditProfileNicknameTakenFixture);
      } else {
        route.continue();
      }
    });

    await openSidebarIfMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    await closeSidebarIfMobile({ page, isMobile });

    const nicknameInput = page.getByTestId("edit-profile-nickname");

    await nicknameInput.click();
    await nicknameInput.fill("NicknameTaken");

    await page.getByTestId("edit-profile-submit-button").click();

    const errorResponseBody = JSON.parse(
      errorEditProfileNicknameTakenFixture.body
    );

    await expect(
      page.getByText(editProfileToastMessages.error.title)
    ).toBeVisible();
    await expect(page.getByText(errorResponseBody.message)).toBeVisible();
  });

  test("should display default error message if there is no error message in the body", async ({
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

    await openSidebarIfMobile({ page, isMobile });

    await page.getByTestId("sidebar-open-menu-button").click();
    await page.getByTestId("sidebar-edit-profile-menu-item").click();

    await closeSidebarIfMobile({ page, isMobile });

    const nicknameInput = page.getByTestId("edit-profile-nickname");

    await nicknameInput.click();
    await nicknameInput.fill("NicknameError");

    await page.getByTestId("edit-profile-submit-button").click();

    await expect(
      page.getByText(editProfileToastMessages.error.title)
    ).toBeVisible();
    await expect(
      page.getByText(editProfileToastMessages.error.description)
    ).toBeVisible();
  });
});

