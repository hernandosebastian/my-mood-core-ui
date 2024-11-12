import { successLoginFixture } from "../fixtures/features/authentication/log-in.fixture";
import { successGetMeFixture } from "../fixtures/features/authentication/get-me.fixture";
import dotenv from "dotenv";
import { Page } from "@playwright/test";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

interface ILogInProps {
  page: Page;
}

export async function logIn({ page }: ILogInProps) {
  await page.route("**/api/v1/auth/sign-in", (route) => {
    route.fulfill(successLoginFixture);
  });

  await page.route("**/api/v1/user/me", (route) => {
    route.fulfill(successGetMeFixture);
  });

  await page.goto(`${BASE_URL}log-in`);

  const emailInput = page.locator("#username");
  const passwordInput = page.locator("#password");
  const submitButton = page.locator('button[type="submit"]');

  await emailInput.fill("test@example.com");
  await passwordInput.fill("Password123!");
  await submitButton.click();
}

