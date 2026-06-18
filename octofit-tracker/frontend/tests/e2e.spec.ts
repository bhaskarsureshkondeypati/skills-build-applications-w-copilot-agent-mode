import { test, expect } from '@playwright/test';

test('workouts example adds and lists an item', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Workouts (example)')).toBeVisible();

  const title = `Test Workout ${Date.now()}`;
  await page.fill('input[placeholder="Workout title"]', title);
  await page.click('button:has-text("Add")');

  // wait for new item to appear in the list
  await expect(page.locator(`text=${title}`)).toBeVisible();
});
