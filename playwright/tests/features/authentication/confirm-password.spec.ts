import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import {
  confirmPasswordErrorMessages,
  confirmPasswordToastMessages,
} from "@/features/authentication/messages/confirm-password.messages";
import {
  successConfirmPasswordFixture,
  errorConfirmPasswordFixture,
  axiosErrorConfirmPasswordFixture,
} from "../../../fixtures/features/authentication/confirm-password.fixture";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}confirm-password`);
});

test.describe("ConfirmPasswordForm Validation Tests", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');
    const emailErrorMessage = page.locator(
      `text=${confirmPasswordErrorMessages.username.invalidEmail}`
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
      `text=${confirmPasswordErrorMessages.username.maxLength}`
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(emailErrorMessage).toBeVisible();
  });

  test("should display error for new password not meeting requirements", async ({
    page,
  }) => {
    const passwordInput = page.locator('input[name="newPassword"]');
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${confirmPasswordErrorMessages.newPassword.uppercase}`
    );

    await passwordInput.fill("password1!");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should display error for invalid password length", async ({ page }) => {
    const passwordInput = page.locator('input[name="newPassword"]');
    const submitButton = page.locator('button[type="submit"]');
    const passwordErrorMessage = page.locator(
      `text=${confirmPasswordErrorMessages.newPassword.minLength}`
    );

    await passwordInput.fill("short");
    await submitButton.click();
    await expect(passwordErrorMessage).toBeVisible();
  });

  test("should display error for non-numeric confirmation code", async ({
    page,
  }) => {
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.locator('button[type="submit"]');
    const codeErrorMessage = page.locator(
      `text=${confirmPasswordErrorMessages.code.digitsOnly}`
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
      `text=${confirmPasswordErrorMessages.code.length}`
    );

    await submitButton.click();
    await expect(codeErrorMessage).toBeVisible();
  });

  test("should successfully submit the form and show success message", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-password", (route) => {
      route.fulfill(successConfirmPasswordFixture);
    });

    const emailValue = "test@example.com";
    const emailInput = page.locator("#username");
    const passwordInput = page.locator('input[name="newPassword"]');
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill(emailValue);
    await passwordInput.fill("ValidPass1!");
    await otpInput.fill("123456");

    await submitButton.click();

    await expect(page).toHaveURL(`${BASE_URL}log-in`);

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      confirmPasswordToastMessages.success.description
    );

    const logInEmailInput = page.locator("#username");
    await expect(logInEmailInput).toHaveValue(emailValue);
  });

  test("should display error toast for failed confirmation", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-password", (route) => {
      route.fulfill(errorConfirmPasswordFixture);
    });

    const emailInput = page.locator("#username");
    const passwordInput = page.locator('input[name="newPassword"]');
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("ValidPass1!");
    await otpInput.fill("123456");

    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      confirmPasswordToastMessages.error.description
    );
  });

  test("should display error toast with axios message for failed confirmation", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-password", (route) => {
      route.fulfill(axiosErrorConfirmPasswordFixture);
    });

    const emailInput = page.locator("#username");
    const passwordInput = page.locator('input[name="newPassword"]');
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await passwordInput.fill("ValidPass1!");
    await otpInput.fill("123456");

    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    const errorMessage = JSON.parse(
      axiosErrorConfirmPasswordFixture.body
    ).message;
    await expect(descriptionLocator).toContainText(errorMessage);
  });

  test("should be redirected when click forgot password button", async ({
    page,
  }) => {
    const forgotPasswordButton = page.locator("#redirect-to-forgot-password");

    await expect(forgotPasswordButton).toBeVisible();
    await expect(forgotPasswordButton).toBeEnabled();

    await forgotPasswordButton.click();

    await expect(page).toHaveURL(`${BASE_URL}forgot-password`);
  });
});

