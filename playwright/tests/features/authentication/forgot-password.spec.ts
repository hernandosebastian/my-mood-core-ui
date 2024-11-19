import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import {
  forgotPasswordErrorMessages,
  forgotPasswordToastMessages,
} from "@/features/authentication/messages/forgot-password.messages";
import {
  successForgotPasswordFixture,
  errorForgotPasswordFixture,
  axiosErrorForgotPasswordFixture,
} from "../../../fixtures/features/authentication/forgot-password.fixture";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}forgot-password`);
});

test.describe("features/authentication", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.getByTestId("forgot-password-username-input");
    const submitButton = page.getByTestId("forgot-password-submit-button");
    const emailErrorToastMessage = page.getByText(
      forgotPasswordErrorMessages.username.invalidEmail
    );

    await emailInput.fill("invalid-email");
    await submitButton.click();
    await expect(emailErrorToastMessage).toBeVisible();
  });

  test("should display error for email exceeding max length", async ({
    page,
  }) => {
    const emailInput = page.getByTestId("forgot-password-username-input");
    const submitButton = page.getByTestId("forgot-password-submit-button");
    const errorValidationMessage = page.getByText(
      "Email cannot be longer than 50 characters."
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(errorValidationMessage).toBeVisible();
  });

  test("should successfully submit the form and show success message", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/forgot-password", (route) => {
      route.fulfill(successForgotPasswordFixture);
    });

    const emailInputValue = "test@example.com";
    const emailInput = page.getByTestId("forgot-password-username-input");
    const submitButton = page.getByTestId("forgot-password-submit-button");

    await emailInput.fill(emailInputValue);
    await submitButton.click();

    const successfulToastMessage = page.getByText(
      forgotPasswordToastMessages.success.description
    );

    await expect(successfulToastMessage).toBeVisible();

    const confirmPasswordEmailInput = page.getByTestId(
      "confirm-password-username-input"
    );
    await expect(confirmPasswordEmailInput).toHaveValue(emailInputValue);
  });

  test("should display error toast for failed password reset request", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/forgot-password", (route) => {
      route.fulfill(errorForgotPasswordFixture);
    });

    const emailInput = page.getByTestId("forgot-password-username-input");
    const submitButton = page.getByTestId("forgot-password-submit-button");

    await emailInput.fill("test@example.com");
    await submitButton.click();

    const errorToastMessage = page.getByText(
      forgotPasswordToastMessages.error.description
    );

    await expect(errorToastMessage).toBeVisible();
  });

  test("should display error toast with axios message for failed password reset request", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/forgot-password", (route) => {
      route.fulfill(axiosErrorForgotPasswordFixture);
    });

    const emailInput = page.getByTestId("forgot-password-username-input");
    const submitButton = page.getByTestId("forgot-password-submit-button");

    await emailInput.fill("test@example.com");
    await submitButton.click();

    const errorMessage = JSON.parse(
      axiosErrorForgotPasswordFixture.body
    ).message;
    const errorToastMessage = page.getByText(errorMessage);

    await expect(errorToastMessage).toBeVisible();
  });
});
