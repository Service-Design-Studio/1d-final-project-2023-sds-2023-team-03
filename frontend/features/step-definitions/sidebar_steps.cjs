
const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until,actions } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'http://localhost:5173/';
//const websiteUrl = 'https://sds-team-3-ecommerce-analysis-tool-jvfpcfcafa-as.a.run.app/login';

async function fillLoginCredentials() {
  const currentUrl = await driver.getCurrentUrl();
  if (currentUrl === websiteUrl + 'login') {
    const usernameInput = await driver.findElement(By.xpath('//input[@id="username-input"]'));
    console.log('Before sending keys to username input');
    await usernameInput.sendKeys('admin');
    console.log('After sending keys to username input');
    const passwordInput = await driver.findElement(By.xpath('//input[@id="password-input"]'));
    console.log('Before sending keys to password input');
    await passwordInput.sendKeys('Abc12345');
    console.log('After sending keys to password input');
    const submitButton = await driver.findElement(By.xpath('//button[@id="submit-button"]'));
    await submitButton.click();
  }
}


// Opening Sidebar (Happy)
Given('the sidebar is retracted', async function () {
  //Go to home page and check if the side bar is in the minimised state
  actions
  await driver.get(websiteUrl);
  // Verify if the sidebar is in the retracted state
  const isExpanded = await driver.executeScript("return document.querySelector('.sidebar').classList.contains('expanded')");
  assert.strictEqual(isExpanded, false);
});

When('I hover anywhere on the sidebar \\(on the left side of the screen)', async function () {
  // have a mouse go to the sidebar, trigger the hover state on side bar
actions
  const sidebar = await driver.findElement(By.className('sidebar'));
  // Perform mouse hover action on the sidebar
  await driver.actions().move({ origin: sidebar }).perform();
});

Then('the sidebar should enlarge and expand to the right side, revealing the navigation buttons inside', async function () {
  // assert that the side bar has been in the expanded state
  // Verify if the sidebar is in the expanded state
  const isExpanded = await driver.executeScript("return document.querySelector('.sidebar').classList.contains('expanded')");
  assert.strictEqual(isExpanded, true);
});

Then('the icons on the retracted sidebar should turn into clickable text', async function () {
  // ensure that the icons on the sidebar are visible
   // Ensure that the icons on the sidebar are visible
   const icons = await driver.findElements(By.css('.sblogo-minimized div'));
   // Check if the icons on the retracted sidebar are visible
   const areIconsVisible = await Promise.all(icons.map(icon => icon.isDisplayed()));
   assert.strictEqual(areIconsVisible.every(visible => visible), true);
});

// Closing Sidebar (Happy)
Given('the sidebar is expanded', async function () {
  // Implement code to set up the sidebar as expanded
  actions 
  fillLoginCredentials()
  const sidebar = await driver.findElement(By.className('sidebar'));
  // Perform mouse hover action on the sidebar and check that it is expanded
  await driver.actions().move({ origin: sidebar }).perform();
  const isExpanded = await driver.executeScript("return document.querySelector('.sidebar').classList.contains('expanded')");
  assert.strictEqual(isExpanded, true);
});

When('I hover anywhere outside the sidebar \\(on the right side of the screen) from within the sidebar',async function () {
  // Write code here that turns the phrase above into concrete 
  // Move the mouse off the sidebar
  actions
  const windowSize = await driver.executeScript('return [window.innerWidth, window.innerHeight];');
  const windowWidth = windowSize[0];
  const windowHeight = windowSize[1];
  // Move the mouse to the center of the screen
  await driver.actions().move({ x: Math.floor(windowWidth / 2), y: Math.floor(windowHeight / 2) }).perform();
});

Then('the sidebar should minimize and retract to the left side', async function () {
  // Implement code to verify the sidebar minimization and retraction
  const isExpanded = await driver.executeScript("return document.querySelector('.sidebar').classList.contains('expanded')");
  assert.strictEqual(isExpanded, false);
});



// Navigating to Home (Happy)
Given('I am on any page other than Home', async function () {
  // Have the page start at websiteurl/sales and check that it is not the home page (which is simply websiteurl)
  await driver.get(websiteUrl + 'sales');
  const currentUrl = await driver.getCurrentUrl();
  assert.notStrictEqual(currentUrl, websiteUrl);
});

Given("I hover anywhere on the sidebar (on the left side of the screen)", async function () {
 // have a mouse go to the sidebar, trigger the hover state on side bar
 actions
 fillLoginCredentials()
 const sidebar = await driver.findElement(By.className('sidebar'));
 // Perform mouse hover action on the sidebar
 await driver.actions().move({ origin: sidebar }).perform();
 const isExpanded = await driver.executeScript("return document.querySelector('.sidebar').classList.contains('expanded')");
 assert.strictEqual(isExpanded, true);
});

When('I click on "Home" on the sidebar', async function () {
  // Click on the icon that represents home
  const homeButton = await driver.findElement(By.xpath("//div[contains(@class, 'sblogo-expanded')]//span[text()='Home']"));
  await homeButton.click();
});

Then('I should be redirected to the Home page', async function () {
  // Check that the current url is website url
  const currentUrl = await driver.getCurrentUrl();
  assert.strictEqual(currentUrl, websiteUrl+'home');
});

// Navigating to Sales (Happy)
Given('I am on any page other than Sales', async function () {
   // Have the page start at websiteurl/sales and check that it is not the home page (which is simply websiteurl)
  await driver.get(websiteUrl);
  fillLoginCredentials()
  const salesUrl = websiteUrl + 'sales';
  assert.notStrictEqual(salesUrl, websiteUrl);
});

When('I click on "Sales" on the sidebar', async function () {
  const salesButton = await driver.findElement(By.xpath("//div[contains(@class, 'sblogo-expanded')]//span[text()='Sales']"));
  await salesButton.click();
});

Then('I should be redirected to the Sales page', async function () {
    // Check that the current url is website url
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, websiteUrl+'sales');
});

// Navigating to Logistics (Happy)
Given('I am on any page other than Merchandising', async function () {
  await driver.get(websiteUrl);
  fillLoginCredentials()
  const merchUrl = websiteUrl + 'merchandising';
  assert.notStrictEqual(merchUrl, websiteUrl);
});

When('I click on "Merchandising" on the sidebar', async function () {
  const merchButton = await driver.findElement(By.xpath("//div[contains(@class, 'sblogo-expanded')]//span[text()='Merchandising']"));
  await merchButton.click();
});

Then('I should be redirected to the Logistics page', async function () {
   // Check that the current url is website url
   const currentUrl = await driver.getCurrentUrl();
   assert.strictEqual(currentUrl, websiteUrl+'merchandising');
});

// Navigating to Same Page (Sad)
Given('I am on {string}', async function (page) {
 
  const pageUrl = websiteUrl + page.toLowerCase();
  await driver.get(pageUrl);
});

When('I click on the icon that represents {string}', async function (page) {
  const merchButton = await driver.findElement(By.xpath(`//div[contains(@class, 'sblogo-expanded')]//span[text()='${page}']`));
  await merchButton.click();
});

Then('I should remain on {string}', async function (page) {

  const currentUrl = await driver.getCurrentUrl();
  const pageUrl = websiteUrl + page.toLowerCase();
  assert.strictEqual(currentUrl, pageUrl);
});

// Competitors
Given('that I am on any page other than {string}', async function (competitor) {
  // Implement code to set up being on a page other than the specified competitor
  await driver.get(websiteUrl);
  const compUrl = websiteUrl + 'competitors/{$competitor}';
  assert.notStrictEqual(compUrl, websiteUrl);
});

When('I click on the {string} in the competitor dropdown box', async function (competitor) {
  const dropdown = await driver.findElement(By.xpath("//div[contains(@class, 'sblogo-expanded')]//span[text()='Competitors']"));
  // Find and click on the specific competitor by its text
  await driver.actions().move({ origin: dropdown }).perform();
  console.log("Competitor" + competitor);
  const competitorOption = await driver.wait(until.elementLocated(By.xpath(`.//div[contains(text(), '${competitor}')]`)), 5000);
  await competitorOption.click();
});

Then('I will be redirected to the page of {string}', async function (competitor) {
  const currentUrl = await driver.getCurrentUrl();
  const compUrl = websiteUrl + 'competitors/' + encodeURIComponent(competitor);
  assert.strictEqual(currentUrl, compUrl);
});





