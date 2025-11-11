import { expect, test } from '@playwright/test';

test.describe('one pager flow', () => {
  test('lists seeded one pager', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Sample Tech')).toBeVisible();
  });
});
