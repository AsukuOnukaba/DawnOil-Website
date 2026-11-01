import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './testing',
  timeout: 90_000,
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'firefox',
    colorScheme: 'light',
    launchOptions: {
      firefoxUserPrefs: {
        'gfx.webrender.all': false,
        'gfx.webrender.software': false,
      },
    },
  },
  projects: [
    {
      name: 'desktop-1440',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet-768',
      use: { ...devices['Desktop Firefox'], viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'mobile-390',
      use: { ...devices['Desktop Firefox'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: 'ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
