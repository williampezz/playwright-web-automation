const { expect } = require("@playwright/test");

class PricingPage {
  constructor(page) {
    this.page = page;
    this.selectedAppText = page.locator('.Select-value-label');

    //select prices for the selected app
    this.plans = {
      free: page.locator('.pricing-page__plan-card:has-text("Free") .pricing-page__dollar-price').first(),
      starter: page.locator('.pricing-page__plan-card:has-text("Starter") .pricing-page__dollar-price').first(),
      pro: page.locator('.pricing-page__plan-card:has-text("Pro") .pricing-page__dollar-price').first(),
      business: page.locator('.pricing-page__plan-card:has-text("Business") .pricing-page__dollar-price').first(),
    };

    this.planCents = {
      starter: page.locator('.pricing-page__plan-card:has-text("Starter") .pricing-page__cent-price').first(),
      pro: page.locator('.pricing-page__plan-card:has-text("Pro") .pricing-page__cent-price').first(),
      business: page.locator('.pricing-page__plan-card:has-text("Business") .pricing-page__cent-price').first(),
    };

    // Botão para alternar entre mensal e anual
    this.billingToggle = page.locator('div:nth-child(3) > .toggle > .toggle__container > .toggle__switcher');



  }

  async navigate() {
    await this.page.goto('https://www.powr.io/pricing');
  }

  async selectApp(appName = 'Social Feed') {
    await expect(this.selectedAppText).toHaveText(appName);
  }

  async switchToMonthly() {

    await this.billingToggle.click({force: true});
  }

  async verifyPrices(billingType = 'yearly') {
    const expectedPrices = {
      yearly: {
        free: "$0",
        starter: "$4.94",
        pro: "$12.14",
        business: "$80.99"
      },
      monthly: {
        free: "$0",
        starter: "$5.49",
        pro: "$13.49",
        business: "$89.99"
      }
    };

    for (const [plan, locator] of Object.entries(this.plans)) {
      let price = await locator.innerText();
      
      if (this.planCents[plan]) {
        let cents = await this.planCents[plan].innerText();
        price += cents;
      }

      expect(price).toContain(expectedPrices[billingType][plan]);
    }
  }
}



module.exports = { PricingPage };