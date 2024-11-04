import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test.describe("Counter Functionality", () => {
  test("should display the correct title and initial count", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Vite \+ React/);

    const countText = page.getByText("count is 0");
    await expect(countText).toBeVisible();
  });

  test("should increment the count when button is clicked", async ({
    page,
  }) => {
    const button = page.getByRole("button", { name: /count is 0/i });

    await button.click();

    const updatedCountText = page.getByText("count is 1");
    await expect(updatedCountText).toBeVisible();
  });
});

