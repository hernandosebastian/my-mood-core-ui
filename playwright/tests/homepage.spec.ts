import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.VITE_APP_BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test.describe("Homepage", () => {
  test("should display the correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/My Mood/);
  });
});
