import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.describe("Not found", () => {
  test("Should display not found page if path is not found", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}not-found-404`);

    const notFoundComponent = page.getByTestId("not-found-container");

    await expect(notFoundComponent).toBeVisible();
  });

  test("Should not display not found page if path is found", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}`);

    const notFoundComponent = page.getByTestId("not-found-container");

    await expect(notFoundComponent).not.toBeVisible();
  });

  test("Should test redirection button on not found page", async ({ page }) => {
    await page.goto(`${BASE_URL}/not-found-404`);

    const notFoundReturnButton = page.getByTestId("not-found-return-button");

    await notFoundReturnButton.click();

    await expect(page).toHaveURL(`${BASE_URL}`);
  });
});
