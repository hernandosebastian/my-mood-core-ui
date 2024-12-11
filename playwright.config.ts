import { defineConfig, devices } from "@playwright/test";

const automatedTestsProjects = [
  {
    name: "Desktop Chrome",
    use: { ...devices["Desktop Chrome"] },
  },
];

const defaultProjects = [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
  },
  {
    name: "firefox",
    use: { ...devices["Desktop Firefox"] },
  },
  {
    name: "webkit",
    use: { ...devices["Desktop Safari"] },
  },
  {
    name: "Mobile Chrome (Pixel 5)",
    use: { ...devices["Pixel 5"] },
  },
  {
    name: "Mobile Safari (iPhone 12)",
    use: { ...devices["iPhone 12"] },
  },
  {
    name: "Microsoft Edge",
    use: { ...devices["Desktop Edge"], channel: "msedge" },
  },
];

export default defineConfig({
  testDir: "./playwright/tests",
  outputDir: "playwright/test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["html", { outputFolder: "playwright/playwright-report" }]],
  use: {
    trace: "on-first-retry",
    actionTimeout: 60_000,
    navigationTimeout: 30_000,
  },
  projects:
    process.env.VITE_APP_MODE === "automated_tests"
      ? automatedTestsProjects
      : defaultProjects,
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
