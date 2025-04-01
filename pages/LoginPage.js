
class LoginPage {
    constructor(page) {
      this.page = page;
      this.createButton = page.getByText('Sign Up FREE').last();

      this.emailInput = page.locator('#new_registration_email'); 
      this.passwordInput = page.locator('#new_registration_password');
      this.loginButton = page.locator('#sign-up-submit');
    }

    async navigateToLogin() {
      await this.page.goto('https://www.powr.io/pricing');
    }
  
    async login(email, password) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    
    }
  }
  
  module.exports = { LoginPage };