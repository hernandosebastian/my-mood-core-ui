import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { logIn } from "utils";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}`);
});

test.describe("features/homepage", () => {
  test("should show homepage and test get started button", async ({ page }) => {
    const homepageSection = page.getByTestId("homepage-section");
    const getStartedButton = page.getByTestId("homepage-get-started-button");

    await expect(homepageSection).toBeVisible();
    await expect(getStartedButton).toBeVisible();

    await getStartedButton.click();

    await expect(page).toHaveURL(`${BASE_URL}log-in`);
  });

  test("shouldn't show homepage and test get started button when user is logged in", async ({
    page,
  }) => {
    await logIn({ page, isMobile: false, isSidebarOpen: false });

    const homepageSection = page.getByTestId("homepage-section");
    const getStartedButton = page.getByTestId("homepage-get-started-button");

    await expect(homepageSection).toBeVisible();
    await expect(getStartedButton).not.toBeVisible();
  });
});
