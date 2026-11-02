import { expect, test } from '@playwright/test';

const publicRoutes = [
  '/',
  '/about',
  '/our-focus',
  '/capabilities',
  '/leadership',
  '/partnerships',
  '/responsibility',
  '/contact',
] as const;

test('public routes expose consistent metadata and valid active navigation', async ({ page, request }) => {
  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();

  for (const route of publicRoutes) {
    const response = await page.goto(route, { waitUntil: 'load' });
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('h1'), `${route} H1`).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Dawn Oil Limited');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);

    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(title.length, route).toBeGreaterThan(10);
    expect(description?.length || 0, route).toBeGreaterThan(50);
    expect(seenTitles.has(title), `${route} unique title`).toBe(false);
    expect(seenDescriptions.has(description || ''), `${route} unique description`).toBe(false);
    seenTitles.add(title);
    seenDescriptions.add(description || '');

    await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);
    await expect(page.locator('img:not([alt])')).toHaveCount(0);

    const activeLinks = await page.locator('a[href^="/"]').evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))] as string[],
    );
    for (const href of activeLinks) {
      if (href.includes('#')) continue;
      const linkedResponse = await request.get(href);
      expect(linkedResponse.status(), `${route} -> ${href}`).toBe(200);
    }
  }
});

test('contact query parameters preselect valid enquiry types and submission stays disabled', async ({ page }) => {
  await page.goto('/contact?enquiry=opportunity', { waitUntil: 'load' });
  await expect(page.locator('#enquiry-type')).toHaveValue('opportunity');
  await page.goto('/contact?enquiry=partnership', { waitUntil: 'load' });
  await expect(page.locator('#enquiry-type')).toHaveValue('partnership');
  await page.goto('/contact?enquiry=invalid', { waitUntil: 'load' });
  await expect(page.locator('#enquiry-type')).toHaveValue('');

  const form = page.locator('[data-contact-form]');
  expect(await form.getAttribute('action')).toBeNull();
  await expect(page.getByRole('button', { name: 'Send enquiry' })).toBeDisabled();
});

test('Leadership is linked and available for indexing', async ({ page, request }) => {
  const response = await page.goto('/leadership', { waitUntil: 'load' });
  expect(response?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('.desktop-nav a[href="/leadership"]')).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('[data-director-card]')).toHaveCount(5);

  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Allow: /');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(404);
});

test('keyboard navigation and reduced motion remain functional', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'load' });

  const skipLink = page.locator('.skip-link');
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  const revealItem = page.locator('[data-reveal]').first();
  await expect(revealItem).toBeVisible();
  expect(await revealItem.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');

  if (testInfo.project.name !== 'desktop-1440') {
    const menu = page.locator('.mobile-menu summary');
    await menu.focus();
    await page.keyboard.press('Enter');
    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    await expect(mobileNavigation.getByRole('link', { name: 'Leadership' })).toHaveAttribute('href', '/leadership');
  }

  const hasHorizontalOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
