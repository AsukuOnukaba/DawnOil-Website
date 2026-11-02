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
] as const;

const pixels = (value: string) => Number.parseFloat(value);

for (const route of routes) {
  test(`${route} typography wraps without layout overflow`, async ({ page }, testInfo) => {
    const response = await page.goto(route, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);

    const bodySize = pixels(await page.locator('body').evaluate((element) => getComputedStyle(element).fontSize));
    expect(bodySize).toBe(testInfo.project.name === 'desktop-1440' ? 18 : 17);

    const h1Size = pixels(await page.locator('h1').evaluate((element) => getComputedStyle(element).fontSize));
    if (route === '/') {
      expect(h1Size).toBeGreaterThanOrEqual(testInfo.project.name === 'desktop-1440' ? 56 : 38);
      expect(h1Size).toBeLessThanOrEqual(testInfo.project.name === 'desktop-1440' ? 60 : 42);
    } else {
      expect(h1Size).toBeGreaterThanOrEqual(testInfo.project.name === 'desktop-1440' ? 46 : 34);
      expect(h1Size).toBeLessThanOrEqual(testInfo.project.name === 'desktop-1440' ? 52 : 38);
    }

    const h2 = page.locator('h2:visible').first();
    if (await h2.count()) {
      const h2Size = pixels(await h2.evaluate((element) => getComputedStyle(element).fontSize));
      expect(h2Size).toBeGreaterThanOrEqual(testInfo.project.name === 'desktop-1440' ? 40 : 30);
      expect(h2Size).toBeLessThanOrEqual(testInfo.project.name === 'desktop-1440' ? 44 : 34);
    }

    const hasHorizontalOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);

    const clippedComponents = await page.locator(
      '.focus-card, .value-card, .partner-card, .leadership-priority, .responsibility-principle, .button',
    ).evaluateAll((elements) => elements
      .filter((element) => {
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden';
      })
      .filter((element) => element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1)
      .map((element) => element.className));
    expect(clippedComponents).toEqual([]);
  });
}

test('About Us label and navigation sizing are consistent', async ({ page }, testInfo) => {
  await page.goto('/', { waitUntil: 'load' });
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about');

  if (testInfo.project.name === 'desktop-1440') {
    const desktopNav = page.getByRole('navigation', { name: 'Primary navigation' });
    await expect(desktopNav.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about');
    const navSize = pixels(await desktopNav.getByRole('link', { name: 'About Us' }).evaluate((element) => getComputedStyle(element).fontSize));
    expect(navSize).toBe(16);
    const fits = await desktopNav.evaluate((element) => element.getBoundingClientRect().right <= window.innerWidth);
    expect(fits).toBe(true);
  } else {
    const menu = page.locator('.mobile-menu summary');
    await menu.click();
    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' });
    const aboutLink = mobileNav.getByRole('link', { name: 'About Us' });
    await expect(aboutLink).toHaveAttribute('href', '/about');
    const navSize = pixels(await aboutLink.evaluate((element) => getComputedStyle(element).fontSize));
    expect(navSize).toBe(17);
    await menu.click();
  }
});
