import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { STANDARD_USER_AUTH_FILE } from './support/auth';

dotenv.config({ path: '.env.local', override: false });

process.env.BASE_URL = 'https://www.saucedemo.com';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true, /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 2 : 0, /* Retry on CI only */
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://www.saucedemo.com',
    viewport: { width: 1400, height: 1200 },
    video: 'on',
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: STANDARD_USER_AUTH_FILE },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: STANDARD_USER_AUTH_FILE },
      dependencies: ['setup'],
    },
  ],
});
