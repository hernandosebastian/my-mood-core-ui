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

test.describe("ForgotPasswordForm Validation Tests", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');
    const emailErrorMessage = page.locator(
      `text=${forgotPasswordErrorMessages.username.invalidEmail}`
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
      `text=${forgotPasswordErrorMessages.username.maxLength}`
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(emailErrorMessage).toBeVisible();
  });

  test("should successfully submit the form and show success message", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/forgot-password", (route) => {
      route.fulfill(successForgotPasswordFixture);
    });

    const emailInputValue = "test@example.com";
    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill(emailInputValue);
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      forgotPasswordToastMessages.success.description
    );

    const confirmPasswordEmailInput = page.locator("#username");
    await expect(confirmPasswordEmailInput).toHaveValue(emailInputValue);
  });

  test("should display error toast for failed password reset request", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/forgot-password", (route) => {
      route.fulfill(errorForgotPasswordFixture);
    });

    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    await expect(descriptionLocator).toContainText(
      forgotPasswordToastMessages.error.description
    );
  });

  test("should display error toast with axios message for failed password reset request", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/forgot-password", (route) => {
      route.fulfill(axiosErrorForgotPasswordFixture);
    });

    const emailInput = page.locator("#username");
    const submitButton = page.locator('button[type="submit"]');

    await emailInput.fill("test@example.com");
    await submitButton.click();

    const toastLocator = page.locator("li[data-sonner-toast]");
    const descriptionLocator = toastLocator.locator("div[data-description]");
    const errorMessage = JSON.parse(
      axiosErrorForgotPasswordFixture.body
    ).message;

    await expect(descriptionLocator).toContainText(errorMessage);
  });
});

