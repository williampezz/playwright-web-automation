const { test, expect } = require('@playwright/test');
const { PricingPage } = require('../pages/pricingPage');

test.describe('POWR Pricing Page Tests - Social Feed', () => {
  let pricingPage;

  test.beforeEach(async ({ page }) => {
  
    pricingPage = new PricingPage(page);
    await pricingPage.navigate();
  });

  test('Page should load successfully', async () => {
    await expect(await pricingPage.page.title()).toBe('Choose a plan that suits your needs and budget!');
  });

  test('Verify anually prices for social Feed app', async () => {
    await pricingPage.selectApp();
    await pricingPage.verifyPrices('yearly'); // yearly is default

  });

  test('Verify monthly prices for Social Feed app', async () => {
    await pricingPage.switchToMonthly(); // switch to mensal
    await pricingPage.verifyPrices('monthly');
  });


});