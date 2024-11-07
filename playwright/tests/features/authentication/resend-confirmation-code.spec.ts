import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import {
  resendConfirmationCodeErrorMessages,
  resendConfirmationCodeToastMessages,
} from "@/features/authentication/messages/resend-confirmation-code.messages";
import {
  successResendConfirmationCodeFixture,
  errorResendConfirmationCodeFixture,
  axiosErrorResendConfirmationCodeFixture,
} from "../../../fixtures/features/authentication/resend-confirmation-code.fixture";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}resend-confirmation-code`);
});

test.describe("ResendConfirmationCodeForm Validation Tests", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');
    const emailErrorMessage = page.locator(
      `text=${resendConfirmationCodeErrorMessages.username.invalidEmail}`
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
      `text=${resendConfirmationCodeErrorMessages.username.maxLength}`
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(emailErrorMessage).toBeVisible();
  });

  test("should successfully submit the form and show success message", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/resend-confirmation-code", (route) => {
      route.fulfill(successResendConfirmationCodeFixture);
    });

    const emailValue = "test@example.com";
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill(emailValue);
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      resendConfirmationCodeToastMessages.success.description
    );

    const confirmUserEmailInput = page.locator("#username");
    await expect(confirmUserEmailInput).toHaveValue(emailValue);
  });

  test("should display error toast for failed code resend", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/resend-confirmation-code", (route) => {
      route.fulfill(errorResendConfirmationCodeFixture);
    });

    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      resendConfirmationCodeToastMessages.error.description
    );
  });

  test("should display error toast with axios message for failed code resend", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/resend-confirmation-code", (route) => {
      route.fulfill(axiosErrorResendConfirmationCodeFixture);
    });

    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    const errorMessage = JSON.parse(
      axiosErrorResendConfirmationCodeFixture.body
    ).message;

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

