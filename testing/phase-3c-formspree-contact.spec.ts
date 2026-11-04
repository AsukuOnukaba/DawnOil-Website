import { expect, test } from '@playwright/test';

const endpoint = 'https://formspree.io/f/test-form-id';

async function fillValidForm(page: import('@playwright/test').Page) {
  await page.locator('#full-name').fill('Ada Okafor');
  await page.locator('#organisation').fill('Example Organisation');
  await page.locator('#business-email').fill('ada@example.test');
  await page.locator('#telephone').fill('+234 800 000 0000');
  await page.locator('#enquiry-type').selectOption('opportunity');
  await page.locator('#message').fill('I would like to discuss an upstream opportunity.');
  await page.locator('#privacy-acknowledgement').check();
}

test('contact enquiry options are preselected from supported query parameters', async ({ page }) => {
  await page.goto('/contact?enquiry=opportunity');
  await expect(page.locator('#enquiry-type')).toHaveValue('opportunity');

  await page.goto('/contact?enquiry=partnership');
  await expect(page.locator('#enquiry-type')).toHaveValue('partnership');

  await page.goto('/contact?enquiry=invalid');
  await expect(page.locator('#enquiry-type')).toHaveValue('');
});

test('required fields, formats, limits and accessible validation messages are enforced', async ({ page }) => {
  let submissions = 0;
  await page.route(endpoint, async (route) => {
    submissions += 1;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ next: '/' }) });
  });
  await page.goto('/contact');

  const form = page.locator('[data-contact-form]');
  const submitButton = page.getByRole('button', { name: 'Send enquiry' });
  await expect(submitButton).toBeEnabled();
  await expect(form.locator('[name]')).toHaveCount(8);
  await expect(form.locator('[name="fullName"]')).toHaveAttribute('maxlength', '120');
  await expect(form.locator('[name="organisation"]')).toHaveAttribute('maxlength', '160');
  await expect(form.locator('[name="email"]')).toHaveAttribute('type', 'email');
  await expect(form.locator('[name="email"]')).toHaveAttribute('maxlength', '180');
  await expect(form.locator('[name="telephone"]')).toHaveAttribute('maxlength', '40');
  await expect(form.locator('[name="message"]')).toHaveAttribute('minlength', '20');
  await expect(form.locator('[name="message"]')).toHaveAttribute('maxlength', '1500');
  await expect(form.locator('[name="_gotcha"]')).toHaveCount(1);

  await submitButton.click();
  await expect(page.locator('#full-name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#full-name-error')).toHaveText('Please complete this field.');
  await expect(page.locator('#privacy-error')).toHaveText('Please complete this field.');
  expect(submissions).toBe(0);

  await page.locator('#full-name').evaluate((element: HTMLInputElement) => {
    element.value = 'A'.repeat(121);
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.locator('#organisation').fill('Example Organisation');
  await page.locator('#business-email').fill('ada@example.test');
  await page.locator('#enquiry-type').selectOption('opportunity');
  await page.locator('#message').fill('A sufficiently long message for validation.');
  await page.locator('#privacy-acknowledgement').check();
  await submitButton.click();
  await expect(page.locator('#full-name-error')).toHaveText('Enter no more than 120 characters.');
  expect(submissions).toBe(0);

  await page.locator('#full-name').fill('Ada Okafor');
  await page.locator('#business-email').fill('not-an-email');
  await page.locator('#message').fill('Too short');
  await submitButton.click();
  await expect(page.locator('#business-email-error')).toHaveText('Enter a valid business email address.');
  await expect(page.locator('#message-error')).toHaveText('Enter at least 20 characters.');
  expect(submissions).toBe(0);
});

test('provider success is announced only after acknowledgement and duplicate sends are blocked', async ({ page }) => {
  let submissions = 0;
  let releaseResponse!: () => void;
  const responseDelay = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });

  await page.route(endpoint, async (route) => {
    submissions += 1;
    await responseDelay;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ next: 'https://formspree.io/thank-you' }),
    });
  });
  await page.goto('/contact');
  await fillValidForm(page);
  await page.getByRole('button', { name: 'Send enquiry' }).click();

  await expect(page.locator('[data-form-status]')).toHaveText('Sending your enquiry…');
  await expect(page.locator('[data-contact-form]')).toHaveAttribute('aria-busy', 'true');
  await page.locator('[data-contact-form]').evaluate((form: HTMLFormElement) => form.requestSubmit());
  expect(submissions).toBe(1);

  releaseResponse();
  await expect(page.locator('[data-form-status]')).toHaveText('Thank you. Your enquiry has been sent.');
  await expect(page.locator('[data-contact-form]')).not.toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('#full-name')).toHaveValue('');
  expect(submissions).toBe(1);
});

test('provider validation and rate-limit failures are shown without a success state', async ({ page }) => {
  let submissions = 0;
  await page.route(endpoint, async (route) => {
    submissions += 1;
    const data = route.request().postData() ?? '';
    if (data.includes('rate-limit@example.test')) {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ errors: [{ message: 'Too many submissions. Please try again later.' }] }),
      });
      return;
    }

    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ errors: [{ field: 'email', code: 'TYPE_EMAIL', message: 'should be valid' }] }),
    });
  });

  await page.goto('/contact');
  await fillValidForm(page);
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.locator('#business-email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#business-email-error')).toHaveText('should be valid');
  await expect(page.locator('[data-form-status]')).not.toHaveText('Thank you. Your enquiry has been sent.');

  await page.locator('#business-email').fill('rate-limit@example.test');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.locator('[data-form-status]')).toHaveText(
    'There have been too many attempts. Please wait a few minutes before trying again.',
  );
  expect(submissions).toBe(2);
});

test('network failures show retry guidance rather than success', async ({ page }) => {
  await page.route(endpoint, (route) => route.abort('failed'));
  await page.goto('/contact');
  await fillValidForm(page);
  await page.getByRole('button', { name: 'Send enquiry' }).click();

  await expect(page.locator('[data-form-status]')).toHaveText(
    'We could not connect to the enquiry service. Check your connection and try again.',
  );
});

test('contact form supports keyboard use and fits mobile viewport', async ({ page }) => {
  await page.route(endpoint, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ next: 'https://formspree.io/thank-you' }),
    });
  });
  await page.goto('/contact');

  const width = page.viewportSize()?.width ?? 0;
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  if (width <= 400) {
    const formBox = await page.locator('[data-contact-form]').boundingBox();
    expect(formBox?.width).toBeLessThanOrEqual(width);
  }

  await page.locator('#full-name').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('#organisation')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#business-email')).toBeFocused();

  await fillValidForm(page);
  const submitButton = page.getByRole('button', { name: 'Send enquiry' });
  await submitButton.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-form-status]')).toHaveText('Thank you. Your enquiry has been sent.');
});
