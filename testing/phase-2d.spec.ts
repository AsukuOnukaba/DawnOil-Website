import { expect, test } from '@playwright/test';
import path from 'node:path';

test('Leadership review route is responsive, factual and error-free', async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  const response = await page.goto('/leadership', { waitUntil: 'load' });
  expect(response?.status()).toBe(200);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Our leadership');
  await expect(page.locator('[data-director-card]')).toHaveCount(0);
  await expect(page.locator('a[href^="/leadership/"]')).toHaveCount(0);
  await expect(page.locator('.desktop-nav a[href="/leadership"]')).toHaveCount(0);
  await expect(page.locator('.desktop-nav .nav-unavailable')).toContainText('Leadership');
  const contactCta = page.locator('.contact-cta').getByRole('link', { name: 'Contact Dawn Oil' });
  await expect(contactCta).toHaveAttribute('href', '/contact');
  await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);

  const bodyText = await page.locator('body').innerText();
  expect(bodyText).not.toMatch(/Olubanke|Balogun|Managing Director|Board Director|coming soon|pending confirmation|placeholder/i);

  const hasHorizontalOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(hasHorizontalOverflow).toBe(false);

  if (testInfo.project.name === 'desktop-1440') {
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
    await contactCta.focus();
    await expect(contactCta).toBeFocused();
  } else {
    const menu = page.locator('.mobile-menu summary');
    await menu.focus();
    await expect(menu).toBeFocused();
    await page.keyboard.press('Enter');
    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.locator('.mobile-nav-unavailable')).toContainText('Leadership');
    await expect(mobileNavigation.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    await menu.click();
    await expect(mobileNavigation).toBeHidden();
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
      path: path.resolve(`design_baselines/phase-2d/leadership/leadership-${size}.png`),
      fullPage: true,
      animations: 'disabled',
    });
  }
});

test('reduced motion keeps Leadership content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/leadership', { waitUntil: 'load' });
  const revealItem = page.locator('[data-reveal]').first();
  await expect(revealItem).toBeVisible();
  expect(await revealItem.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
});
