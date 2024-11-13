import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}`);
});

test.describe("Homepage", () => {
  test("should show homepage and test get started button", async ({ page }) => {
    const homepageSection = page.locator("#homepage-section");
    const getStartedButton = page.locator("#homepage-get-started-button");

    await expect(homepageSection).toBeVisible();
    await expect(getStartedButton).toBeVisible();

    await getStartedButton.click();

    await expect(page).toHaveURL(`${BASE_URL}log-in`);
  });
});

