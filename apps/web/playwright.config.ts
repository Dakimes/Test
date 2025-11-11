import { defineConfig } from '@playwright/test';

envDefaults();

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 120000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'
  }
});

function envDefaults() {
  process.env.USE_MOCKS = process.env.USE_MOCKS ?? 'true';
}
