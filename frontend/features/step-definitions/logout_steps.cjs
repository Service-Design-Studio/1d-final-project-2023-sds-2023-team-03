const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until,actions } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'https://sds-team-3-ecommerce-analysis-tool-jvfpcfcafa-as.a.run.app/';

Given('I am on the sidebar', async function () {
  const sidebar = await driver.findElement(By.className('sidebar'));
  await driver.actions().move({ origin: sidebar }).perform();
  const isExpanded = await driver.executeScript("return document.querySelector('.sidebar').classList.contains('expanded')");
  assert.strictEqual(isExpanded, true);
  });
  
  Given('I am on {string} page', async function (view) {

    const pageUrl = websiteUrl + view.toLowerCase();
    await driver.get(pageUrl);
  });
  
  When('I click on the logout button situated on the bottom of the sidebar', async function () {
    const logoutButton = await driver.findElement(By.className('logout-button-inner'));
    await logoutButton.click();
  });
  
  Then('I should see a pop-up logout confirmation page', async function () {
    // Wait for the logout confirmation modal to appear
    const modalTitle = await driver.wait(until.elementLocated(By.className('modal-title')));
    // Check if the modal title is displayed
    const isModalOpen = await modalTitle.isEnabled();
    assert.strictEqual(isModalOpen, true);
  });
  
  When('I click on the confirm button', async function () {
    const confirmButton = await driver.findElement(By.className('modal-confirm'));
    await confirmButton.click();
  });
  
  Then('I should be redirected to the login page', async function () {
    const currentUrl = await driver.getCurrentUrl();
    const loginUrl = websiteUrl + 'login';
    assert.strictEqual(currentUrl, loginUrl);
  });
  
  When('I click anywhere outside the modal', async function () {
    // Get the modal element
    actions
     // Get the modal element
    const modal = await driver.findElement(By.className('modal-content'));
    const rect = await modal.getRect();
    const modalX = rect.x;
    const modalY = rect.y;
    const modalWidth = rect.width;
    const modalHeight = rect.height;
    // Calculate the coordinates of a point outside the modal
    const outsideX = Math.floor(modalX + modalWidth) + 10; // Click 10 pixels to the right of the modal
    const outsideY = Math.floor(modalY + modalHeight) + 10; // Click 10 pixels below the modal
    // Move the mouse to the outside point and perform a click action
    await driver.actions().move({ x: outsideX, y: outsideY }).click().perform();
  });
  
  Then('the pop-up should close', async function () {
    // Wait for the logout confirmation modal to appear
    const modalTitle = await driver.wait(until.elementLocated(By.className('modal-title')),500);
    // Check if the modal title is displayed
    const isModalOpen = await modalTitle.isDisplayed();
    assert.strictEqual(isModalOpen, true);
  });
  
 Then('I remain on the {string} page', async function (view) {
  
  const pageUrl = websiteUrl + view.toLowerCase();
  const currentUrl = await driver.getCurrentUrl();
  assert.strictEqual(pageUrl, currentUrl);
});