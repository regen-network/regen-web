import test, { expect } from '@playwright/test';

test.describe('Registry Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('Footer has legal links', async ({ page }) => {
    /** Terms link */
    // create a locator
    const termsLink = page.getByRole('link', { name: 'Terms' });
    // Expect an attribute "to be strictly equal" to the value.
    await expect(termsLink).toHaveAttribute(
      'href',
      'https://regennetwork.notion.site/Platform-Terms-of-Service-b77faf978cd04e2e8d3c58f76841bad1',
    );

    /** Privacy link */
    // create a locator
    const privacyLink = page.getByRole('link', { name: 'Privacy' });
    // Expect an attribute "to be strictly equal" to the value.
    await expect(privacyLink).toHaveAttribute(
      'href',
      'https://www.regen.network/privacy-policy/',
    );

    /** CoinGecko link */
    // create a locator
    const coingeckoLink = page.getByRole('link', { name: 'data provided by' });
    // Expect an attribute "to be strictly equal" to the value.
    await expect(coingeckoLink).toHaveAttribute(
      'href',
      'https://www.coingecko.com/',
    );
  });
});
