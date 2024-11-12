import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.describe("NotFound Tests", () => {
  test("should display not found page if path is not found", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}not-found-404`);

    const notFoundComponent = page.locator("#not-found-component");

    await expect(notFoundComponent).toBeVisible();
  });

  test("should not display not found page if path is found", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}`);

    const notFoundComponent = page.locator("#not-found-component");

    await expect(notFoundComponent).not.toBeVisible();
  });

  test("should test redirection button on not found page", async ({ page }) => {
    await page.goto(`${BASE_URL}/not-found-404`);

    const notFoundReturnButton = page.locator("#not-found-return-button");

    await notFoundReturnButton.click();

    await expect(page).toHaveURL(`${BASE_URL}`);
  });
});

