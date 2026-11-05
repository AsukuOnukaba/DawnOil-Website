import { expect, test } from '@playwright/test';

test('footer exposes the legal and image-credit routes', async ({ page }) => {
  await page.goto('/');

  for (const [href, label, heading] of [
    ['/privacy', 'Privacy Notice', 'Privacy Notice'],
    ['/terms', 'Website Terms', 'Website Terms'],
    ['/image-credits', 'Image Credits', 'Photograph sources'],
  ] as const) {
    const link = page.locator(`.site-footer a[href="${href}"]`);
    await expect(link).toHaveText(label);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await page.goto('/');
  }
});

test('legal routes are noindex and fit the mobile viewport', async ({ page }) => {
  for (const route of ['/privacy', '/terms']) {
    await page.goto(route);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow, noarchive');
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);
  }

  await page.goto('/image-credits');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);
});
