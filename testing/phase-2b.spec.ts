import { expect, test } from '@playwright/test';
import path from 'node:path';

const pages = [
  {
    route: '/capabilities',
    heading: 'Commercial capability for upstream opportunities',
    slug: 'capabilities',
    cta: 'Speak with our team',
    ctaHref: '/contact',
  },
  {
    route: '/partnerships',
    heading: 'Partnerships',
    slug: 'partnerships',
    cta: 'Discuss a collaboration',
    ctaHref: '/contact?enquiry=partnership',
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
    await expect(page.locator(`.desktop-nav a[href="${innerPage.route}"]`)).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);
    await expect(page.locator('a[href="/leadership"]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: innerPage.cta })).toHaveAttribute('href', innerPage.ctaHref);

    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toMatch(/Chevron|Waltersmith|producing oilfields|drilling services|engineering services/i);

    const hasHorizontalOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);

    if (testInfo.project.name === 'desktop-1440') {
      await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
    } else {
      const menu = page.locator('.mobile-menu summary');
      await menu.click();
      const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
      await expect(mobileNavigation).toBeVisible();
      await expect(mobileNavigation.getByRole('link', { name: 'Capabilities' })).toHaveAttribute('href', '/capabilities');
      await expect(mobileNavigation.getByRole('link', { name: 'Partnerships' })).toHaveAttribute('href', '/partnerships');
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
    await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();

    if (testInfo.project.name === 'desktop-1440' || testInfo.project.name === 'mobile-390') {
      const size = testInfo.project.name === 'desktop-1440' ? '1440x900' : '390x844';
      await page.screenshot({
        path: path.resolve(`design_baselines/phase-2b/${innerPage.slug}/${innerPage.slug}-${size}.png`),
        fullPage: true,
        animations: 'disabled',
      });
    }
  });
}

test('Leadership review route exists while navigation remains inactive', async ({ request }) => {
  const response = await request.get('/leadership');
  expect(response.status()).toBe(200);
});
