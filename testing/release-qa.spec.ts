import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/about',
  '/our-focus',
  '/capabilities',
  '/leadership',
  '/partnerships',
  '/responsibility',
  '/contact',
  '/image-credits',
  '/privacy',
  '/terms',
  '/leadership/banke-alakija-balogun',
  '/leadership/emmanuel-ukegbu',
  '/leadership/dr-lazarus-a-angbazo',
  '/leadership/ike-oguine',
  '/leadership/anthony-muoneke',
] as const;

test('release routes remain usable at required widths', async ({ page, request }) => {
  test.setTimeout(180_000);
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on('console', (message) => message.type() === 'error' && consoleErrors.push(message.text()));
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      consoleErrors.length = 0;
      pageErrors.length = 0;
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect([200, 304], route).toContain(response?.status());
      await page.waitForTimeout(100);
      await expect(page.locator('h1'), route).toHaveCount(1);
      const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(hasHorizontalOverflow, `${route} at ${width}px`).toBe(false);
      await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);
      await expect(page.locator('img:not([alt])')).toHaveCount(0);

      expect(consoleErrors, route).toEqual([]);
      expect(pageErrors, route).toEqual([]);
    }
  }

  const missing = await request.get('/this-route-does-not-exist');
  expect(missing.status()).toBe(404);
});

test('shared head assets and disabled enquiry form are release-safe', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toHaveCount(1);
  await expect(page.locator('link[href="/favicon-16x16.png"]')).toHaveCount(1);
  await expect(page.locator('link[href="/favicon-32x32.png"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"][href="/apple-touch-icon.png"]')).toHaveCount(1);
  await expect(page.locator('[data-contact-form]')).toHaveAttribute('data-formspree-enabled', 'false');
  await expect(page.getByRole('button', { name: 'Send enquiry' })).toBeDisabled();
});
