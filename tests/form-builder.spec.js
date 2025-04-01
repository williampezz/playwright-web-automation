require ('dotenv').config();

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { FormBuilderPage } = require('../pages/FormBuilderPage');
const getRandomEmail = require('../utils/emailGenerator');

test('Create a new form and publish it', async ({ page }) => {
  const email = process.env.POWR_EMAIL;
  const password = process.env.POWR_PASSWORD;


  const loginPage = new LoginPage(page);
  const formBuilderPage = new FormBuilderPage(page);


  // open page   
  await loginPage.navigateToLogin()
    
  await formBuilderPage.createNewForm();

  // change color
  await formBuilderPage.changeBackgroundColor();

  await formBuilderPage.selectColor('#FF5733'); // color in hexadecimal format

  await formBuilderPage.publishApp();

  // .env will be published to the repo for quick access
  await loginPage.login(getRandomEmail(), process.env.POWR_PASSWORD );

  await formBuilderPage.finishPublishingApp();

  await formBuilderPage.openLiveApp();

});
