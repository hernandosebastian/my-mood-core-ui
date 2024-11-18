import { successLoginFixture } from "../fixtures/features/authentication/log-in.fixture";
import { successGetMeFixture } from "../fixtures/features/authentication/get-me.fixture";
import { Page } from "@playwright/test";

interface ILogInProps {
  page: Page;
  isMobile?: boolean;
}

export async function logIn({ page, isMobile }: ILogInProps) {
  await page.route("**/api/v1/auth/sign-in", (route) => {
    route.fulfill(successLoginFixture);
  });

  await page.route("**/api/v1/user/me", (route) => {
    route.fulfill(successGetMeFixture);
  });

  if (isMobile) {
    await page.getByTestId("toggle-sidebar-trigger").click();
  }

  await page.getByTestId("sidebar-log-in-button").click();

  if (isMobile) {
    await page.getByTestId("toggle-sidebar-trigger-close-responsive").click();
  }

  await page.getByTestId("log-in-username-input").fill("test@example.com");
  await page.getByTestId("log-in-password-input").fill("Password123!");
  await page.getByTestId("log-in-button").click();
}
