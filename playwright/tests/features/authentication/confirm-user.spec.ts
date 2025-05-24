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
  await page.goto(`${BASE_URL}confirmar-usuario`);
});

test.describe("Confirm User", () => {
  test("Should display error for invalid email format", async ({ page }) => {
    const emailInput = page.getByTestId("confirm-user-username-input");
    const submitButton = page.getByTestId("confirm-user-submit-button");
    const emailErrorToastMessage = page.getByText(
      confirmUserErrorMessages.username.invalidEmail
    );

    await emailInput.fill("invalid-email");
    await submitButton.click();
    await expect(emailErrorToastMessage).toBeVisible();
  });

  test("Should display error for email exceeding max length", async ({
    page,
  }) => {
    const emailInput = page.getByTestId("confirm-user-username-input");
    const submitButton = page.getByTestId("confirm-user-submit-button");
    const emailErrorToastMessage = page.getByText(
      confirmUserErrorMessages.username.maxLength
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(emailErrorToastMessage).toBeVisible();
  });

  test("Should display error for non-numeric confirmation code", async ({
    page,
  }) => {
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.getByTestId("confirm-user-submit-button");
    const codeErrorToastMessage = page.getByText(
      confirmUserErrorMessages.code.digitsOnly
    );

    await otpInput.fill("abcdef");
    await submitButton.click();
    await expect(codeErrorToastMessage).toBeVisible();
  });

  test("Should display error for incorrect confirmation code length", async ({
    page,
  }) => {
    const submitButton = page.getByTestId("confirm-user-submit-button");
    const codeErrorToastMessage = page.getByText(
      confirmUserErrorMessages.code.length
    );

    await submitButton.click();
    await expect(codeErrorToastMessage).toBeVisible();
  });

  test("Should successfully submit the form and show success message", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-user", (route) => {
      route.fulfill(successConfirmUserFixture);
    });

    const emailValue = "test@example.com";
    const emailInput = page.getByTestId("confirm-user-username-input");
    const otpInput = page.getByTestId("confirm-user-code-input");
    const submitButton = page.getByTestId("confirm-user-submit-button");

    await emailInput.fill(emailValue);
    await otpInput.fill("123456");

    await submitButton.click();

    await expect(page).toHaveURL(`${BASE_URL}iniciar-sesion`);

    const successfulToastMessage = page.getByText(
      confirmUserToastMessages.success.description
    );

    await expect(successfulToastMessage).toBeVisible();

    const logInEmailInput = page.getByTestId("log-in-username-input");
    await expect(logInEmailInput).toHaveValue(emailValue);
  });

  test("Should display error toast for failed confirmation", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-user", (route) => {
      route.fulfill(errorConfirmUserFixture);
    });

    const emailInput = page.getByTestId("confirm-user-username-input");
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.getByTestId("confirm-user-submit-button");

    await emailInput.fill("test@example.com");
    await otpInput.fill("123456");

    await submitButton.click();

    const errorToastMessage = page.getByText(
      confirmUserToastMessages.error.description
    );

    await expect(errorToastMessage).toBeVisible();
  });

  test("Should display error toast with axios message for failed confirmation", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/confirm-user", (route) => {
      route.fulfill(axiosErrorConfirmUserFixture);
    });

    const emailInput = page.getByTestId("confirm-user-username-input");
    const otpInput = page.locator('input[data-input-otp="true"]');
    const submitButton = page.getByTestId("confirm-user-submit-button");

    await emailInput.fill("test@example.com");
    await otpInput.fill("123456");

    await submitButton.click();

    const errorMessage = JSON.parse(axiosErrorConfirmUserFixture.body).message;
    const errorToastMessage = page.getByText(errorMessage);

    await expect(errorToastMessage).toBeVisible();
  });

  test("Should be redirected when click resend code button", async ({
    page,
  }) => {
    const resendCodeButton = page.locator("#redirect-to-resend-code");

    await expect(resendCodeButton).toBeVisible();
    await expect(resendCodeButton).toBeEnabled();

    await resendCodeButton.click();

    await expect(page).toHaveURL(`${BASE_URL}reenviar-codigo-confirmacion`);
  });
});
