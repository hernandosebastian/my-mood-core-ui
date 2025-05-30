import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const automatedTestsProjects = [
  {
    name: "firefox",
    use: { ...devices["Desktop Firefox"] },
  },
];

const defaultProjects = [
  {
    name: "firefox",
    use: { ...devices["Desktop Firefox"] },
  },
  {
    name: "Mobile Chrome (Pixel 5)",
    use: { ...devices["Pixel 5"] },
  },
  {
    name: "Mobile Safari (iPhone 12)",
    use: { ...devices["iPhone 12"] },
  },
];

const projectsToRun =
  process.env.VITE_APP_MODE === "automated_tests"
    ? automatedTestsProjects
    : defaultProjects;

export default defineConfig({
  testDir: "./playwright/tests",
  outputDir: "playwright/test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  timeout: 60_000,
  reporter: [["html", { outputFolder: "playwright/playwright-report" }]],
  use: {
    trace: "on-first-retry",
    actionTimeout: 60_000,
    navigationTimeout: 30_000,
    launchOptions: {
      headless: true,
      slowMo: process.env.CI ? 100 : 50,
      args: [
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-ipc-flooding-protection",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    },
    timezoneId: "UTC",
  },
  projects: projectsToRun,
  webServer: {
    command: "npm run start:dev",
    url: "http://localhost:3000/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

