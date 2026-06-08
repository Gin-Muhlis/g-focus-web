import { defineConfig, devices } from "@playwright/test";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const port = Number(process.env.PORT ?? 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`;
const e2eDatabaseUrl = process.env.E2E_DATABASE_URL ?? process.env.DATABASE_URL;

function databaseUrlIsSafeForE2E(url?: string) {
  if (!url) {
    return false;
  }

  const normalized = url.toLowerCase();
  const safeMarkers = [
    "localhost",
    "127.0.0.1",
    "::1",
    "test",
    "testing",
    "e2e",
    "ci",
  ];

  return safeMarkers.some((marker) => normalized.includes(marker));
}

if (!databaseUrlIsSafeForE2E(e2eDatabaseUrl)) {
  throw new Error(
    "Refusing to run E2E without E2E_DATABASE_URL or a clearly local/test DATABASE_URL.",
  );
}

const databaseUrl = e2eDatabaseUrl as string;

process.env.DATABASE_URL = databaseUrl;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: `PORT=${port} npm run dev`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      DATABASE_URL: databaseUrl,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
