import { expect, test } from '@playwright/test';
import path from 'node:path';

const pages = [
  {
    route: '/responsibility',
    heading: 'Responsible business',
    slug: 'responsibility',
  },
  {
    route: '/contact',
    heading: 'Contact Dawn Oil',
    slug: 'contact',
  },
] as const;

for (const innerPage of pages) {
  test(`${innerPage.route} is responsive, accessible and error-free`, async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    const response = await page.goto(innerPage.route, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(innerPage.heading);
    await expect(page.locator(`.desktop-nav a[href="${innerPage.route}"]`)).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);
    await expect(page.locator('.desktop-nav a[href="/leadership"]')).toHaveCount(1);

    const hasHorizontalOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);

    if (innerPage.route === '/responsibility') {
      await expect(page.locator('.contact-cta').getByRole('link', { name: 'Contact Dawn Oil' })).toHaveAttribute('href', '/contact');
      const bodyText = await page.locator('body').innerText();
      expect(bodyText).not.toMatch(/ISO|certified|emissions reduction|net[ -]?zero|community project|sustainability programme/i);
    }

    if (innerPage.route === '/contact') {
      const form = page.locator('[data-contact-form]');
      await expect(form).toBeVisible();
      expect(await form.getAttribute('action')).toBeNull();
      await expect(page.getByRole('button', { name: 'Send enquiry' })).toBeDisabled();
      await expect(page.locator('[data-form-status]')).toBeHidden();

      expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(false);

      await page.locator('#full-name').fill('Ada Okafor');
      await page.locator('#organisation').fill('Example Organisation');
      await page.locator('#business-email').fill('not-an-email');
      await page.locator('#business-email').blur();
      await expect(page.locator('#business-email-error')).toHaveText('Enter a valid business email address.');
      await page.locator('#business-email').fill('ada@example.com');
      await page.locator('#enquiry-type').selectOption('corporate');
      await page.locator('#message').fill('A concise introduction to a potential corporate enquiry.');
      await page.locator('#privacy-acknowledgement').check();
      expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(true);

      await page.locator('#full-name').focus();
      await page.keyboard.press('Tab');
      await expect(page.locator('#organisation')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.locator('#business-email')).toBeFocused();

      await page.goto('/contact?enquiry=opportunity', { waitUntil: 'load' });
      await expect(page.locator('#enquiry-type')).toHaveValue('opportunity');
      await page.goto('/contact?enquiry=partnership', { waitUntil: 'load' });
      await expect(page.locator('#enquiry-type')).toHaveValue('partnership');
      await page.goto('/contact', { waitUntil: 'load' });
    }

    if (testInfo.project.name === 'desktop-1440') {
      await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
    } else {
      const menu = page.locator('.mobile-menu summary');
      await menu.click();
      const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
      await expect(mobileNavigation).toBeVisible();
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
        path: path.resolve(`design_baselines/phase-2c/${innerPage.slug}/${innerPage.slug}-${size}.png`),
        fullPage: true,
        animations: 'disabled',
      });
    }
  });
}

test('reduced motion keeps Responsibility content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/responsibility', { waitUntil: 'load' });
  const revealItem = page.locator('[data-reveal]').first();
  await expect(revealItem).toBeVisible();
  expect(await revealItem.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
});

test('Leadership review route exists while navigation remains inactive', async ({ request }) => {
  const response = await request.get('/leadership');
  expect(response.status()).toBe(200);
});
