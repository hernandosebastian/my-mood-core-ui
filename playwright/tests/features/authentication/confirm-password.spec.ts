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

test.describe("features/authentication", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.getByTestId("confirm-password-username-input");
    const submitButton = page.getByTestId("confirm-password-submit-button");
    const errorToastMessage = page.getByText(
      confirmPasswordErrorMessages.username.invalidEmail
    );

    await emailInput.fill("invalid-email");
    await submitButton.click();
    await expect(errorToastMessage).toBeVisible();
  });

  test("should display error for email exceeding max length", async ({
    page,
  }) => {
    const emailInput = page.getByTestId("confirm-password-username-input");
    const submitButton = page.getByTestId("confirm-password-submit-button");
    const errorToastMessage = page.getByText(
      confirmPasswordErrorMessages.username.maxLength
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(errorToastMessage).toBeVisible();
  });

  test("should display error for new password not meeting requirements", async ({
    page,
  }) => {
    const passwordInput = page.getByTestId(
      "confirm-password-new-password-input"
    );
    const submitButton = page.getByTestId("confirm-password-submit-button");
    const passwordErrorToastMessage = page.getByText(
      confirmPasswordErrorMessages.newPassword.uppercase
    );

    await passwordInput.fill("password1!");
    await submitButton.click();
    await expect(passwordErrorToastMessage).toBeVisible();
  });

  test("should display error for invalid password length", async ({ page }) => {
    const passwordInput = page.getByTestId(
      "confirm-password-new-password-input"
    );
    const submitButton = page.getByTestId("confirm-password-submit-button");
    const passwordErrorToastMessage = page.getByText(
      confirmPasswordErrorMessages.newPassword.minLength
    );

    await passwordInput.fill("short");
    await submitButton.click();
    await expect(passwordErrorToastMessage).toBeVisible();
  });

  test("should display error for non-numeric confirmation code", async ({
    page,
  }) => {
    const otpInput = page.getByTestId("confirm-password-code-input");
    const submitButton = page.getByTestId("confirm-password-submit-button");
    const codeErrorToastMessage = page.getByText(
      confirmPasswordErrorMessages.code.digitsOnly
    );

    await otpInput.fill("abcdef");
    await submitButton.click();
    await expect(codeErrorToastMessage).toBeVisible();
  });

  test("should display error for incorrect confirmation code length", async ({
    page,
  }) => {
    const submitButton = page.getByTestId("confirm-password-submit-button");
    const codeErrorToastMessage = page.getByText(
      confirmPasswordErrorMessages.code.length
    );

    await submitButton.click();
    await expect(codeErrorToastMessage).toBeVisible();
  });

  test("should display error when passwords don't match", async ({ page }) => {
    const newPasswordInput = page.getByTestId(
      "confirm-password-new-password-input"
    );
    const confirmPasswordInput = page.getByTestId(
      "confirm-password-confirm-password-input"
    );
    const submitButton = page.getByTestId("confirm-password-submit-button");

    await newPasswordInput.fill("ValidPass1!");
    await confirmPasswordInput.fill("DifferentPass1!");
    await submitButton.click();

    const errorMessage = page.getByText(
      confirmPasswordErrorMessages.confirmPassword.mismatch
    );
    await expect(errorMessage).toBeVisible();
  });

  test("should successfully submit when passwords match", async ({ page }) => {
    await page.route("**/api/v1/auth/confirm-password", (route) => {
      route.fulfill(successConfirmPasswordFixture);
    });

    const emailInput = page.getByTestId("confirm-password-username-input");
    const newPasswordInput = page.getByTestId(
      "confirm-password-new-password-input"
    );
    const confirmPasswordInput = page.getByTestId(
      "confirm-password-confirm-password-input"
    );
    const otpInput = page.getByTestId("confirm-password-code-input");
    const submitButton = page.getByTestId("confirm-password-submit-button");

    await emailInput.fill("test@example.com");
    await newPasswordInput.fill("ValidPass1!");
    await confirmPasswordInput.fill("ValidPass1!");
    await otpInput.fill("123456");
    await submitButton.click();

    await expect(page).toHaveURL(`${BASE_URL}log-in`);
    const successMessage = page.getByText(
      confirmPasswordToastMessages.success.description
    );
    await expect(successMessage).toBeVisible();
  });

  test("should display error toast for failed confirmation", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-password", (route) => {
      route.fulfill(errorConfirmPasswordFixture);
    });

    const emailInput = page.getByTestId("confirm-password-username-input");
    const passwordInput = page.getByTestId(
      "confirm-password-new-password-input"
    );
    const otpInput = page.getByTestId("confirm-password-code-input");
    const submitButton = page.getByTestId("confirm-password-submit-button");

    await emailInput.fill("test@example.com");
    await passwordInput.fill("ValidPass1!");
    await otpInput.fill("123456");

    await submitButton.click();

    const errorToastMessage = page.getByText(
      confirmPasswordToastMessages.error.description
    );

    await expect(errorToastMessage).toBeVisible();
  });

  test("should display error toast with axios message for failed confirmation", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-password", (route) => {
      route.fulfill(axiosErrorConfirmPasswordFixture);
    });

    const emailInput = page.getByTestId("confirm-password-username-input");
    const passwordInput = page.getByTestId(
      "confirm-password-new-password-input"
    );
    const otpInput = page.getByTestId("confirm-password-code-input");
    const submitButton = page.getByTestId("confirm-password-submit-button");

    await emailInput.fill("test@example.com");
    await passwordInput.fill("ValidPass1!");
    await otpInput.fill("123456");

    await submitButton.click();

    const errorMessage = JSON.parse(
      axiosErrorConfirmPasswordFixture.body
    ).message;
    const errorToastMessage = page.getByText(errorMessage);

    await expect(errorToastMessage).toBeVisible();
  });

  test("should be redirected when click forgot password button", async ({
    page,
  }) => {
    const forgotPasswordButton = page.getByTestId(
      "confirm-password-redirect-to-forgot-password-button"
    );

    await expect(forgotPasswordButton).toBeVisible();
    await expect(forgotPasswordButton).toBeEnabled();

    await forgotPasswordButton.click();

    await expect(page).toHaveURL(`${BASE_URL}forgot-password`);
  });
});
