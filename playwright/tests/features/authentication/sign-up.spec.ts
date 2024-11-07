import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import {
  signUpErrorMessages,
  signUpToastMessages,
} from "@/features/authentication/messages/sign-up.messages";
import {
  successSignUpFixture,
  errorSignUpFixture,
  axiosErrorSignUpFixture,
} from "../../../fixtures/features/authentication/sign-up.fixture";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}sign-up`);
});

test.describe("SignUpForm Validation Tests", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');
    const emailErrorMessage = page.locator(
      `text=${signUpErrorMessages.username.invalidEmail}`
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
      `text=${signUpErrorMessages.username.maxLength}`
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(emailErrorMessage).toBeVisible();
  });

  test("should display error for short password", async ({ page }) => {
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${signUpErrorMessages.password.minLength}`
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
      `text=${signUpErrorMessages.password.uppercase}`
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
      `text=${signUpErrorMessages.password.lowercase}`
    );

    await passwordInput.fill("PASSWORD1!");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should display error for password missing number", async ({ page }) => {
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${signUpErrorMessages.password.number}`
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
      `text=${signUpErrorMessages.password.specialChar}`
    );

    await passwordInput.fill("Password123");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should successfully submit the form and show success message", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/sign-up", (route) => {
      route.fulfill(successSignUpFixture);
    });

    const emailValue = "test@example.com";
    const emailInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill(emailValue);
    await passwordInput.fill("ValidPass1!");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      signUpToastMessages.success.description
    );

    const logInEmailInput = page.locator("#username");
    await expect(logInEmailInput).toHaveValue(emailValue);
  });

  test("should display error toast for failed sign up", async ({ page }) => {
    await page.route("**/api/v1/auth/sign-up", (route) => {
      route.fulfill(errorSignUpFixture);
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
      signUpToastMessages.error.description
    );
  });

  test("should display error toast with axios message for failed sign up", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/sign-up", (route) => {
      route.fulfill(axiosErrorSignUpFixture);
    });

    const emailInput = page.locator("#username");
    const passwordInput = page.locator("#password");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("Password123!");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    const errorMessage = JSON.parse(axiosErrorSignUpFixture.body).message;

    await expect(descriptionLocator).toContainText(errorMessage);
  });

  test("should be redirected when click log in button", async ({ page }) => {
    const logInButton = page.locator("#redirect-to-log-in");

    await expect(logInButton).toBeVisible();
    await expect(logInButton).toBeEnabled();

    await logInButton.click();

    await expect(page).toHaveURL(`${BASE_URL}log-in`);
  });
});

