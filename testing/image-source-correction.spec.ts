import { expect, test } from '@playwright/test';
import path from 'node:path';

const innerPages = [
  { route: '/about', slug: 'about', image: '/assets/hero/dawn-oil-offshore-platform.webp' },
  { route: '/our-focus', slug: 'our-focus', image: '/assets/hero/dawn-brief-pumpjack.webp' },
  { route: '/capabilities', slug: 'capabilities', image: '/assets/hero/dawn-oil-offshore-platform.webp' },
  { route: '/partnerships', slug: 'partnerships', image: '/assets/hero/dawn-oil-offshore-platform.webp' },
  { route: '/responsibility', slug: 'responsibility', image: '/assets/hero/dawn-oil-offshore-platform.webp' },
  { route: '/contact', slug: 'contact', image: '/assets/hero/dawn-brief-pumpjack.webp' },
] as const;

test('homepage uses the client-directed upstream pumpjack hero with a stable responsive crop', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'tablet-768', 'Desktop and mobile crops are the requested checkpoints.');

  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  const response = await page.goto('/', { waitUntil: 'load' });
  expect(response?.status()).toBe(200);
  const heroMedia = page.locator('.hero-media');
  expect(await heroMedia.evaluate((element) => getComputedStyle(element).backgroundImage)).toContain('dawn-upstream-pumpjack.jpg');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);
  expect(consoleErrors).toEqual([]);

  const size = testInfo.project.name === 'desktop-1440' ? '1440x900' : '390x844';
  await page.locator('.hero').screenshot({
    path: path.resolve(`testing/screenshots/project-image-separation/dawn-home-hero-${size}.png`),
    animations: 'disabled',
  });
});

for (const pageConfig of innerPages) {
  test(`${pageConfig.route} uses its Dawn-directed primary image`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'tablet-768', 'Desktop and mobile crops are the requested checkpoints.');

    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    const response = await page.goto(pageConfig.route, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);
    const image = page.locator('.inner-hero-media img');
    await expect(image).toHaveAttribute('src', pageConfig.image);
    await expect(image).toHaveAttribute('alt', /\S+/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);
    expect(consoleErrors).toEqual([]);

    const size = testInfo.project.name === 'desktop-1440' ? '1440x900' : '390x844';
    await page.locator('.inner-hero').screenshot({
      path: path.resolve(`design_baselines/image-source-correction/${pageConfig.slug}-hero-${size}.png`),
      animations: 'disabled',
    });
  });
}
