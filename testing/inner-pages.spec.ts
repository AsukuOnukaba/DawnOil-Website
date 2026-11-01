import { expect, test } from '@playwright/test';
import path from 'node:path';

const pages = [
  {
    route: '/about',
    heading: 'About Dawn Oil',
    slug: 'about',
  },
  {
    route: '/our-focus',
    heading: 'Focused on upstream opportunity',
    slug: 'our-focus',
  },
] as const;

for (const innerPage of pages) {
  test(`${innerPage.route} renders responsively with valid navigation`, async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    const response = await page.goto(innerPage.route, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(innerPage.heading);
    await expect(page.locator('a.brand')).toHaveAttribute('href', '/');
    await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);
    await expect(page.locator('.desktop-nav a[href="/capabilities"]')).toHaveCount(1);
    await expect(page.locator('.desktop-nav a[href="/partnerships"]')).toHaveCount(1);
    await expect(page.locator('.mobile-nav a[href="/capabilities"]')).toHaveCount(1);
    await expect(page.locator('.mobile-nav a[href="/partnerships"]')).toHaveCount(1);
    await expect(page.locator('.site-footer a[href="/capabilities"]')).toHaveCount(1);
    await expect(page.locator('.site-footer a[href="/partnerships"]')).toHaveCount(1);
    await expect(page.locator('a[href="/leadership"]')).toHaveCount(0);
    await expect(page.locator('.desktop-nav a[href="/responsibility"]')).toHaveCount(1);
    await expect(page.locator('.desktop-nav a[href="/contact"]')).toHaveCount(1);

    if (innerPage.route === '/our-focus') {
      await expect(page.getByText('Gas opportunities', { exact: true })).toHaveCount(0);
      await expect(page.getByRole('link', { name: 'Discuss an opportunity' })).toHaveAttribute('href', '/contact?enquiry=opportunity');
    }

    const hasHorizontalOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);

    if (testInfo.project.name === 'desktop-1440') {
      await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
    } else {
      const menu = page.locator('.mobile-menu summary');
      await menu.click();
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
      await menu.click();
    }

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);

    const revealItems = page.locator('[data-reveal]');
    for (let index = 0; index < await revealItems.count(); index += 1) {
      await revealItems.nth(index).scrollIntoViewIfNeeded();
    }
    await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();

    if (testInfo.project.name === 'desktop-1440' || testInfo.project.name === 'mobile-390') {
      const size = testInfo.project.name === 'desktop-1440' ? '1440x900' : '390x844';
      await page.screenshot({
        path: path.resolve(`design_baselines/phase-2a/${innerPage.slug}/${innerPage.slug}-${size}.png`),
        fullPage: true,
        animations: 'disabled',
      });
    }
  });
}
