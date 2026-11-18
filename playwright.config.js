const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90000,
  workers: 1,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['junit', { outputFile: 'test-results/results.xml' }]],
  use: {
    browserName: 'chromium',
    viewport: { width: 1280, height: 900 },
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});
