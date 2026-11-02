import { expect, test } from '@playwright/test';
import path from 'node:path';

const screenshotForProject: Record<string, string> = {
  'desktop-1440': 'design_baselines/current/home-1440x900.png',
  'tablet-768': 'design_baselines/current/home-768x1024.png',
  'mobile-390': 'design_baselines/mobile/home-390x844.png',
};

test('homepage renders without console errors or horizontal overflow', async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('/', { waitUntil: 'load' });

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Building value in Nigerian upstream energy');
  await expect(page.locator('header.site-header')).toBeVisible();
  await expect(page.locator('footer.site-footer')).toBeVisible();
  await expect(page.locator('a.brand')).toHaveAttribute('href', '/');
  await expect(page.locator('.desktop-nav a[href="/"]')).toHaveCount(1);
  await expect(page.locator('.desktop-nav a[href="/about"]')).toHaveCount(1);
  await expect(page.locator('.desktop-nav a[href="/our-focus"]')).toHaveCount(1);
  await expect(page.locator('.desktop-nav a[href="/capabilities"]')).toHaveCount(1);
  await expect(page.locator('.desktop-nav a[href="/partnerships"]')).toHaveCount(1);
  await expect(page.locator('.desktop-nav a[href="/responsibility"]')).toHaveCount(1);
  await expect(page.locator('.desktop-nav a[href="/leadership"]')).toHaveCount(1);
  await expect(page.locator('.desktop-nav a[href="/contact"]')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Explore our focus' })).toHaveAttribute('href', '/our-focus');
  await expect(page.getByRole('link', { name: 'About Dawn Oil' })).toHaveAttribute('href', '/about');
  await expect(page.getByRole('link', { name: 'Explore our capabilities' })).toHaveAttribute('href', '/capabilities');
  await expect(page.getByRole('link', { name: 'Explore partnerships' })).toHaveAttribute('href', '/partnerships');
  await expect(page.getByRole('link', { name: 'Our approach to responsibility' })).toHaveAttribute('href', '/responsibility');
  await expect(page.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute('href', '/contact');
  await expect(page.locator('.hero a[href="/contact"]')).toHaveCount(1);
  await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Meet our leadership' })).toHaveAttribute('href', '/leadership');

  const hasHorizontalOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(hasHorizontalOverflow).toBe(false);

  if (testInfo.project.name === 'desktop-1440') {
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  } else {
    const menu = page.locator('.mobile-menu summary');
    await expect(menu).toBeVisible();
    await menu.click();
    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole('link', { name: 'Our Focus' })).toHaveAttribute('href', '/our-focus');
    await expect(mobileNavigation.getByRole('link', { name: 'Responsibility' })).toHaveAttribute('href', '/responsibility');
    await expect(mobileNavigation.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    await menu.click();
  }

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);

  const revealItems = page.locator('[data-reveal]');
  for (let index = 0; index < await revealItems.count(); index += 1) {
    await revealItems.nth(index).scrollIntoViewIfNeeded();
  }
  await page.locator('#top').scrollIntoViewIfNeeded();

  const screenshotPath = screenshotForProject[testInfo.project.name];
  await page.screenshot({
    path: path.resolve(screenshotPath),
    fullPage: true,
    animations: 'disabled',
  });
});
