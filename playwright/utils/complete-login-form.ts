import { Page } from "@playwright/test";
import { successLoginFixture } from "../fixtures/features/authentication/log-in.fixture";
import { successGetMeFixture } from "../fixtures/features/authentication/get-me.fixture";

interface ILogInProps {
  page: Page;
}

export async function completeLoginForm({ page }: ILogInProps): Promise<void> {
  await page.route("**/api/v1/auth/sign-in", (route) => {
    route.fulfill(successLoginFixture);
  });

  await page.route("**/api/v1/user/me", (route) => {
    route.fulfill(successGetMeFixture);
  });

  await page.getByTestId("log-in-username-input").fill("johndoe@example.com");
  await page.getByTestId("log-in-password-input").fill("Password123!");
  await page.getByTestId("log-in-submit-button").click();
}
