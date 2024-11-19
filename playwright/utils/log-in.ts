import { Page } from "@playwright/test";
import { successLoginFixture } from "../fixtures/features/authentication/log-in.fixture";
import { successGetMeFixture } from "../fixtures/features/authentication/get-me.fixture";
import { openSidebarIfMobile } from "./open-sidebar-if-mobile";
import { closeSidebarIfMobile } from "./close-sidebar-if-mobile";

interface ILogInProps {
  page: Page;
  isMobile: boolean;
  isSidebarOpen: boolean;
}

export async function logIn({
  page,
  isMobile,
  isSidebarOpen,
}: ILogInProps): Promise<void> {
  await page.route("**/api/v1/auth/sign-in", (route) => {
    route.fulfill(successLoginFixture);
  });

  await page.route("**/api/v1/user/me", (route) => {
    route.fulfill(successGetMeFixture);
  });

  if (!isSidebarOpen) {
    await openSidebarIfMobile({ page, isMobile });
  }

  await page.getByTestId("sidebar-log-in-button").click();

  await closeSidebarIfMobile({ page, isMobile });

  await page.getByTestId("log-in-username-input").fill("test@example.com");
  await page.getByTestId("log-in-password-input").fill("Password123!");
  await page.getByTestId("log-in-submit-button").click();
}
