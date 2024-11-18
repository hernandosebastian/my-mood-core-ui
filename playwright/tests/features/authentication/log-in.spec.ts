import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import {
  logInErrorMessages,
  logInToastMessages,
} from "@/features/authentication/messages/log-in.messages";
import { StorageKeys } from "@/services/local-storage/index";
import { successGetMeFixture } from "../../../fixtures/features/authentication/get-me.fixture";
import {
  successLoginFixture,
  errorLoginFixture,
  axiosErrorLoginFixture,
} from "../../../fixtures/features/authentication/log-in.fixture";
import { closeSidebarIfNeeded, openSidebarIfNeeded } from "utils/sidebar";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}log-in`);
});

test.describe("features/authentication", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');
    const emailErrorMessage = page.locator(
      `text=${logInErrorMessages.username.invalidEmail}`
    );

    await emailInput.fill("invalid-email");
    await submitButton.click();
    await expect(emailErrorMessage).toBeVisible();
  });

  test("should display error for email exceeding max length", async ({
    page,
  }) => {
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');
    const emailErrorMessage = page.locator(
      `text=${logInErrorMessages.username.maxLength}`
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(emailErrorMessage).toBeVisible();
  });

  test("should display error for short password", async ({ page }) => {
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${logInErrorMessages.password.minLength}`
    );

    await passwordInput.fill("Short1!");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should display error for password missing uppercase letter", async ({
    page,
  }) => {
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${logInErrorMessages.password.uppercase}`
    );

    await passwordInput.fill("password1!");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should display error for password missing lowercase letter", async ({
    page,
  }) => {
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${logInErrorMessages.password.lowercase}`
    );

    await passwordInput.fill("PASSWORD1!");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should display error for password missing number", async ({ page }) => {
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${logInErrorMessages.password.number}`
    );

    await passwordInput.fill("Password!");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should display error for password missing special character", async ({
    page,
  }) => {
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${logInErrorMessages.password.specialChar}`
    );

    await passwordInput.fill("Password123");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should successfully submit the form and show success message", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/sign-in", (route) => {
      route.fulfill(successLoginFixture);
    });

    await page.route("**/api/v1/user/me", (route) => {
      route.fulfill(successGetMeFixture);
    });

    page.goto(`${BASE_URL}`);

    await openSidebarIfNeeded(page);

    const sidebarLogInButton = page.locator("#sidebar-log-in-button");
    await sidebarLogInButton.click();

    await closeSidebarIfNeeded(page);

    const emailInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("Password123!");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      logInToastMessages.success.description
    );

    const accessToken = await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, StorageKeys.COGNITO_ACCESS_TOKEN);

    const accessTokenValue = JSON.parse(successLoginFixture.body).accessToken;
    expect(accessToken).toBe(accessTokenValue);
  });

  test("should display error toast for failed login", async ({ page }) => {
    await page.route("**/api/v1/auth/sign-in", (route) => {
      route.fulfill(errorLoginFixture);
    });

    const emailInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("Password123!");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      logInToastMessages.error.description
    );
  });

  test("should display error toast with axios message for failed login", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/sign-in", (route) => {
      route.fulfill(axiosErrorLoginFixture);
    });

    const emailInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("Password123!");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    const errorMessage = JSON.parse(axiosErrorLoginFixture.body).message;

    await expect(descriptionLocator).toContainText(errorMessage);
  });

  test("should be redirected when click sign up button", async ({ page }) => {
    const signUpButton = page.locator("#sign-up-button");

    await expect(signUpButton).toBeVisible();
    await expect(signUpButton).toBeEnabled();

    await signUpButton.click();

    await expect(page).toHaveURL(`${BASE_URL}sign-up`);
  });
});
