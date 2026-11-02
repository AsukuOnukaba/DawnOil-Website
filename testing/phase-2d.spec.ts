import { expect, test } from '@playwright/test';
import path from 'node:path';

const profiles = [
  ['Banke Alakija-Balogun', '/leadership/banke-alakija-balogun'],
  ['Emmanuel Ukegbu', '/leadership/emmanuel-ukegbu'],
  ['Dr. Lazarus A. Angbazo', '/leadership/dr-lazarus-a-angbazo'],
  ['Ike Oguine', '/leadership/ike-oguine'],
  ['Anthony Muoneke', '/leadership/anthony-muoneke'],
] as const;

test('Leadership presents five linked profiles with active navigation', async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  const response = await page.goto('/leadership', { waitUntil: 'load' });
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Our leadership');
  await expect(page.locator('[data-director-card]')).toHaveCount(5);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');

  for (const [name, href] of profiles) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    await expect(page.locator(`a[href="${href}"]`)).toHaveCount(1);
  }

  await expect(page.locator('.desktop-nav a[href="/leadership"]')).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.site-footer a[href="/leadership"]')).toHaveCount(1);
  await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);

  if (testInfo.project.name !== 'desktop-1440') {
    const menu = page.locator('.mobile-menu summary');
    await menu.focus();
    await page.keyboard.press('Enter');
    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNavigation.getByRole('link', { name: 'Leadership' })).toHaveAttribute('aria-current', 'page');
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
      path: path.resolve(`design_baselines/leadership-content/leadership-${size}.png`),
      fullPage: true,
      animations: 'disabled',
    });
  }
});

test('each biography route retains supplied experience and qualifications', async ({ page, request }, testInfo) => {
  for (const [name, href] of profiles) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
    await page.goto(href, { waitUntil: 'load' });
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
    await expect(page.getByRole('heading', { name: 'Professional experience' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Qualifications' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Leadership' }).first()).toHaveAttribute('href', '/leadership');
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);
  }

  if (testInfo.project.name === 'desktop-1440' || testInfo.project.name === 'mobile-390') {
    await page.goto('/leadership/banke-alakija-balogun', { waitUntil: 'load' });
    const size = testInfo.project.name === 'desktop-1440' ? '1440x900' : '390x844';
    await page.screenshot({
      path: path.resolve(`design_baselines/leadership-content/banke-alakija-balogun-${size}.png`),
      fullPage: true,
      animations: 'disabled',
    });
  }
});

test('historical roles remain attributed to individuals and no Dawn titles are invented', async ({ page }) => {
  await page.goto('/leadership/banke-alakija-balogun', { waitUntil: 'load' });
  await expect(page.getByText('Equinox Hydrocarbon Ltd', { exact: false })).toBeVisible();
  await page.goto('/leadership/anthony-muoneke', { waitUntil: 'load' });
  await expect(page.getByText('Nigerian Petroleum Development Company (NPDC)', { exact: false }).first()).toBeVisible();
  await page.goto('/leadership', { waitUntil: 'load' });
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).not.toMatch(/Managing Director of Dawn Oil|Dawn Oil Board Director|Chairman of Dawn Oil/i);
});

test('reduced motion keeps Leadership content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/leadership', { waitUntil: 'load' });
  const revealItem = page.locator('[data-reveal]').first();
  await expect(revealItem).toBeVisible();
  expect(await revealItem.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
});
