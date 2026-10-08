import { defineConfig, devices } from "@playwright/test";

// Runs against the static export in ./out, i.e. exactly what ships.
// Build first: `npm run build && npm run test:e2e`.
// Set BASE_URL to test a deployed site instead (no local server is started),
// e.g. `BASE_URL=https://forgecommunity.dev npm run test:e2e`.
const baseURL = process.env.BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: baseURL ?? "http://localhost:4173",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "phone", use: { ...devices["Pixel 7"] } },
  ],
  webServer: baseURL
    ? undefined
    : {
        command: "npm run serve",
        url: "http://localhost:4173",
        reuseExistingServer: !process.env.CI,
      },
});
