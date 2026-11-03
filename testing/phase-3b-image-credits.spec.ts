import { expect, test } from '@playwright/test';
import fs from 'node:fs';

type ImageManifestEntry = {
  page: string;
  section: string;
  filename: string;
};

const imageManifest: ImageManifestEntry[] = JSON.parse(
  fs.readFileSync(new URL('../src/data/image-manifest.json', import.meta.url), 'utf8'),
);

test('image credits route and footer link work on desktop and mobile', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);

  const footerLink = page.locator('.site-footer a[href="/image-credits"]');
  await expect(footerLink).toHaveText('Image Credits');
  await footerLink.scrollIntoViewIfNeeded();
  await footerLink.hover();
  expect(await footerLink.evaluate((element) => getComputedStyle(element).color)).toBe('rgb(169, 102, 33)');

  const footerLayout = await page.locator('.footer-bottom').evaluate((element) => {
    const links = element.querySelector('.footer-bottom-links');
    return {
      footerRight: element.getBoundingClientRect().right,
      linksRight: links?.getBoundingClientRect().right,
      direction: getComputedStyle(element).flexDirection,
    };
  });
  if (page.viewportSize()?.width === 1440) {
    expect(Math.abs(footerLayout.footerRight - (footerLayout.linksRight ?? 0))).toBeLessThan(2);
  } else if (page.viewportSize()?.width === 390) {
    expect(footerLayout.direction).toBe('column');
  }

  await footerLink.click();

  await expect(page).toHaveURL(/\/image-credits$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Photograph sources');
  await expect(page.locator('.image-credit')).toHaveCount(imageManifest.length);
  await expect(page.locator('.image-credit dt', { hasText: 'Photographer' })).toHaveCount(7);
  await expect(page.locator('.site-footer a[href="/image-credits"]')).toBeVisible();
  const creditsText = await page.locator('.image-credits-list').innerText();
  expect(creditsText).not.toContain('Aureum');
  expect(creditsText).not.toContain('production-use provenance');
  const creditLinks = await page.locator('.image-credit a[href]').evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).href),
  );
  expect(creditLinks.length).toBeGreaterThan(0);
  expect(creditLinks.every((href) => href.startsWith('https://'))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)).toBe(false);
});

test('all registered editorial photographs load on their assigned routes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'tablet-768', 'Desktop and mobile are the required image checkpoints.');

  const routeImages = new Map<string, typeof imageManifest>();
  for (const image of imageManifest) {
    const route = image.page === 'home' ? '/' : image.page;
    routeImages.set(route, [...(routeImages.get(route) ?? []), image]);
  }

  for (const [route, images] of routeImages) {
    const response = await page.goto(route, { waitUntil: 'load' });
    expect(response?.status(), `${route} should load`).toBe(200);

    for (const image of images) {
      if (route === '/' && image.section === 'hero') {
        expect(await page.locator('.hero-media').evaluate((element) => getComputedStyle(element).backgroundImage))
          .toContain(image.filename);
        continue;
      }

      const imageElement = page.locator(`img[src="${image.filename}"]`).first();
      await imageElement.scrollIntoViewIfNeeded();
      await expect.poll(() =>
        imageElement.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0),
      ).toBe(true);
    }
  }
});
