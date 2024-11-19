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
import { closeSidebarIfMobile, openSidebarIfMobile } from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}sign-up`);
});

test.describe("features/authentication", () => {
  test("should display error for invalid email format", async ({ page }) => {
    const emailInput = page.getByTestId("sign-up-username-input");
    const submitButton = page.getByTestId("sign-up-submit-button");
    const emailErrorToastMessage = page.getByText(
      signUpErrorMessages.username.invalidEmail
    );

    await emailInput.fill("invalid-email");
    await submitButton.click();
    await expect(emailErrorToastMessage).toBeVisible();
  });

  test("should display error for email exceeding max length", async ({
    page,
  }) => {
    const emailInput = page.getByTestId("sign-up-username-input");
    const submitButton = page.getByTestId("sign-up-submit-button");
    const emailErrorToastMessage = page.getByText(
      signUpErrorMessages.username.maxLength
    );

    await emailInput.fill(`${"a".repeat(51)}@example.com`);
    await submitButton.click();
    await expect(emailErrorToastMessage).toBeVisible();
  });

  test("should display error for short password", async ({ page }) => {
    const passwordInput = page.getByTestId("sign-up-password-input");
    const submitButton = page.getByTestId("sign-up-submit-button");
    const passwordErrorToastMessage = page.getByText(
      signUpErrorMessages.password.minLength
    );

    await passwordInput.fill("Short1!");
    await submitButton.click();
    await expect(passwordErrorToastMessage).toBeVisible();
  });

  test("should display error for password missing uppercase letter", async ({
    page,
  }) => {
    const passwordInput = page.getByTestId("sign-up-password-input");
    const submitButton = page.getByTestId("sign-up-submit-button");
    const passwordErrorToastMessage = page.getByText(
      signUpErrorMessages.password.uppercase
    );

    await passwordInput.fill("password1!");
    await submitButton.click();
    await expect(passwordErrorToastMessage).toBeVisible();
  });

  test("should display error for password missing lowercase letter", async ({
    page,
  }) => {
    const passwordInput = page.getByTestId("sign-up-password-input");
    const submitButton = page.getByTestId("sign-up-submit-button");
    const passwordErrorToastMessage = page.getByText(
      signUpErrorMessages.password.lowercase
    );

    await passwordInput.fill("PASSWORD1!");
    await submitButton.click();
    await expect(passwordErrorToastMessage).toBeVisible();
  });

  test("should display error for password missing number", async ({ page }) => {
    const passwordInput = page.getByTestId("sign-up-password-input");
    const submitButton = page.getByTestId("sign-up-submit-button");

    await passwordInput.fill("Password!");
    await submitButton.click();

    const errorToastMessage = page.getByText(
      signUpErrorMessages.password.number
    );

    await expect(errorToastMessage).toBeVisible();
  });

  test("should display error for nickname with special character", async ({
    page,
  }) => {
    const nicknameInput = page.getByTestId("sign-up-nickname-input");
    const submitButton = page.getByTestId("sign-up-submit-button");

    await nicknameInput.fill("John Doe$!'");
    await submitButton.click();

    const errorToastMessage = page.getByText(
      signUpErrorMessages.nickname.invalid
    );

    await expect(errorToastMessage).toBeVisible();
  });

  test("should display error for nickname max length", async ({ page }) => {
    const nicknameInput = page.getByTestId("sign-up-nickname-input");
    const submitButton = page.getByTestId("sign-up-submit-button");

    await nicknameInput.fill(`${"a".repeat(51)}`);
    await submitButton.click();

    const errorToastMessage = page.getByText(
      signUpErrorMessages.nickname.maxLength
    );

    await expect(errorToastMessage).toBeVisible();
  });

  test("should display error for password missing special character", async ({
    page,
  }) => {
    const passwordInput = page.getByTestId("sign-up-password-input");
    const submitButton = page.getByTestId("sign-up-submit-button");
    const passwordErrorToastMessage = page.getByText(
      signUpErrorMessages.password.specialChar
    );

    await passwordInput.fill("Password123");
    await submitButton.click();
    await expect(passwordErrorToastMessage).toBeVisible();
  });

  test("should successfully submit the form and show success message", async ({
    page,
    isMobile,
  }) => {
    await page.route("**/api/v1/auth/sign-up", (route) => {
      route.fulfill(successSignUpFixture);
    });
    page.goto(`${BASE_URL}`);

    await openSidebarIfMobile({ page, isMobile });

    const sidebarSignUpButton = page.getByTestId("sidebar-sign-up-button");
    await sidebarSignUpButton.click();

    await closeSidebarIfMobile({ page, isMobile });

    const emailValue = "test@example.com";
    const emailInput = page.getByTestId("sign-up-username-input");
    const nicknameInput = page.getByTestId("sign-up-nickname-input");
    const passwordInput = page.getByTestId("sign-up-password-input");

    const signUpButton = page.getByTestId("sign-up-submit-button");

    await emailInput.fill(emailValue);
    await nicknameInput.fill("JohnDoe");
    await passwordInput.fill("ValidPass1!");
    await signUpButton.click();

    const logInEmailInput = page.getByTestId("confirm-user-username-input");
    const successfulToastMessage = page.getByText(
      signUpToastMessages.success.description
    );

    await expect(logInEmailInput).toHaveValue(emailValue);
    await expect(successfulToastMessage).toBeVisible();
  });

  test("should display error toast for failed sign up", async ({ page }) => {
    await page.route("**/api/v1/auth/sign-up", (route) => {
      route.fulfill(errorSignUpFixture);
    });

    const emailInput = page.getByTestId("sign-up-username-input");
    const nicknameInput = page.getByTestId("sign-up-nickname-input");
    const passwordInput = page.getByTestId("sign-up-password-input");
    const submitButton = page.getByTestId("sign-up-submit-button");

    await emailInput.fill("test@example.com");
    await nicknameInput.fill("JohnDoe");
    await passwordInput.fill("Password123!");
    await submitButton.click();

    const errorToastMessage = page.getByText(
      signUpToastMessages.error.description
    );

    await expect(errorToastMessage).toBeVisible();
  });

  test("should display error toast with axios message for failed sign up", async ({
    page,
  }) => {
    await page.route("**/api/v1/auth/sign-up", (route) => {
      route.fulfill(axiosErrorSignUpFixture);
    });

    const emailInput = page.getByTestId("sign-up-username-input");
    const nicknameInput = page.getByTestId("sign-up-nickname-input");
    const passwordInput = page.getByTestId("sign-up-password-input");
    const submitButton = page.getByTestId("sign-up-submit-button");

    await emailInput.fill("test@example.com");
    await nicknameInput.fill("JohnDoe");
    await passwordInput.fill("Password123!");
    await submitButton.click();

    const errorMessage = JSON.parse(axiosErrorSignUpFixture.body).message;
    const errorToastMessage = page.getByText(errorMessage);

    await expect(errorToastMessage).toBeVisible();
  });

  test("should be redirected when click log in button", async ({ page }) => {
    const logInButton = page.getByTestId("sign-up-redirect-to-log-in");

    await expect(logInButton).toBeVisible();
    await expect(logInButton).toBeEnabled();

    await logInButton.click();

    await expect(page).toHaveURL(`${BASE_URL}log-in`);
  });
});
