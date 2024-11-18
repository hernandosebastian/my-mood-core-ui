import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import {
  confirmUserErrorMessages,
  confirmUserToastMessages,
} from "@/features/authentication/messages/confirm-user.messages";
import {
  successConfirmUserFixture,
  errorConfirmUserFixture,
  axiosErrorConfirmUserFixture,
} from "../../../fixtures/features/authentication/confirm-user.fixture";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}confirm-user`);
});

test.describe("features/authentication", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');
    const emailErrorMessage = page.locator(
      `text=${confirmUserErrorMessages.username.invalidEmail}`
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
      `text=${confirmUserErrorMessages.username.maxLength}`
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(emailErrorMessage).toBeVisible();
  });

  test("should display error for non-numeric confirmation code", async ({
    page,
  }) => {
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.locator('button[type="submit"]');
    const codeErrorMessage = page.locator(
      `text=${confirmUserErrorMessages.code.digitsOnly}`
    );

    await otpInput.fill("abcdef");
    await submitButton.click();
    await expect(codeErrorMessage).toBeVisible();
  });

  test("should display error for incorrect confirmation code length", async ({
    page,
  }) => {
    const submitButton = page.locator('button[type="submit"]');
    const codeErrorMessage = page.locator(
      `text=${confirmUserErrorMessages.code.length}`
    );

    await submitButton.click();
    await expect(codeErrorMessage).toBeVisible();
  });

  test("should successfully submit the form and show success message", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-user", (route) => {
      route.fulfill(successConfirmUserFixture);
    });

    const emailValue = "test@example.com";
    const emailInput = page.locator("#username");
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill(emailValue);
    await otpInput.fill("123456");

    await submitButton.click();

    await expect(page).toHaveURL(`${BASE_URL}log-in`);

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      confirmUserToastMessages.success.description
    );

    const logInEmailInput = page.locator("#username");
    await expect(logInEmailInput).toHaveValue(emailValue);
  });

  test("should display error toast for failed confirmation", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-user", (route) => {
      route.fulfill(errorConfirmUserFixture);
    });

    const emailInput = page.locator("#username");
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await otpInput.fill("123456");

    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      confirmUserToastMessages.error.description
    );
  });

  test("should display error toast with axios message for failed confirmation", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-user", (route) => {
      route.fulfill(axiosErrorConfirmUserFixture);
    });

    const emailInput = page.locator("#username");
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await otpInput.fill("123456");

    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    const errorMessage = JSON.parse(axiosErrorConfirmUserFixture.body).message;
    await expect(descriptionLocator).toContainText(errorMessage);
  });

  test("should be redirected when click resend code button", async ({
    page,
  }) => {
    const resendCodeButton = page.locator("#redirect-to-resend-code");

    await expect(resendCodeButton).toBeVisible();
    await expect(resendCodeButton).toBeEnabled();

    await resendCodeButton.click();

    await expect(page).toHaveURL(`${BASE_URL}resend-confirmation-code`);
  });
});
