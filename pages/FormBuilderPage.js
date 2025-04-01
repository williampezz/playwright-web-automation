class FormBuilderPage {
    constructor(page) {
      this.page = page;
      this.newFormButton = page.locator('[data-qa="button-free"]').first(); // button getstarted
      this.backgroundColorPicker = page.locator('[data-qa="tab-Design"]').first();
      this.backgroundColorDrilldown = page.getByText('Background').first();
      this.buttonConfirmColor = page.locator('button.button-primary:has-text("OK")');


      this.publishButton = page.locator('[data-qa="button-publish"]'); 
      this.shareLiveApp = page.getByText('Share App'); 
      this.copyLink = page.locator('button.button-primary:has-text("Copy Link")');

    
    }
  
    async createNewForm() {
 
  
      await this.newFormButton.evaluate(el => el.click()); //click using pure JS
      
    }
  
    async changeBackgroundColor() {
      await this.page.waitForTimeout(4000);
      await this.backgroundColorPicker.click({force: true});
      await this.page.waitForTimeout(4000);
      await this.backgroundColorDrilldown.click({force: true});

    }


    async selectColor(colorHex) {

  await this.page.locator('.colorpicker-component-appBackgroundColor .swatch').click();
  await this.page.locator('[data-qa="colorpicker-appBackgroundColor"] input[type="text"]').fill(colorHex);
  await this.page.waitForTimeout(2000);
  await this.buttonConfirmColor.click({force: true});


 
}

// Convert hexadecimal color to RGB
hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;

  
}
  
    async publishApp() {
      await this.page.waitForTimeout(2000);
      await this.publishButton.click();
  
    }

    async finishPublishingApp() {
      await this.page.waitForTimeout(2000);
      await this.shareLiveApp.click();
      await this.copyLink.click();
    }
  
    async getLiveAppLink() {
      const urlInput = this.page.locator('input.non-editable--url[readonly]');

      await urlInput.waitFor({ state: 'visible', timeout: 5000 });
        
   
      return await urlInput.getAttribute('value');

    }
    async openLiveApp() {
      const appUrl = await this.getLiveAppLink();
      await this.page.goto(appUrl); // open the live app link
      await this.page.waitForTimeout(5000);
    }






  }
  
  module.exports = { FormBuilderPage };
  