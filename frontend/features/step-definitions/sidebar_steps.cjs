const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until,actions } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'http://localhost:5173/';


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
   await driver.quit()
});

// Closing Sidebar (Happy)
Given('the sidebar is expanded', function () {
  // Implement code to set up the sidebar as expanded
  return 'pending';
});

When('I hover anywhere outside the sidebar \\(on the right side of the screen) from within the sidebar', function () {
  // Write code here that turns the phrase above into concrete 
actions
  return 'pending';
});

Then('the sidebar should minimize and retract to the left side', function () {
  // Implement code to verify the sidebar minimization and retraction
  return 'pending';
});

Then('the sidebar will return to its default state', function () {
  // Implement code to verify the sidebar's default state
  return 'pending';
});

// Navigating to Home (Happy)
Given('I am on any page other than Home', function () {
  // Implement code to set up being on a page other than Home
  return 'pending';
});

When('I click on "Home" on the sidebar', function () {
  // Implement code to simulate clicking on the "Home" button
  return 'pending';
});

Then('I should be redirected to the Home page', function () {
  // Implement code to verify the redirection to the Home page
  return 'pending';
});

// Navigating to Sales (Happy)
Given('I am on any page other than Sales', function () {
  // Implement code to set up being on a page other than Sales
  return 'pending';
});

When('I click on "Sales" on the sidebar', function () {
  // Implement code to simulate clicking on the "Sales" button
  return 'pending';
});

Then('I should be redirected to the Sales page', function () {
  // Implement code to verify the redirection to the Sales page
  return 'pending';
});

// Navigating to Logistics (Happy)
Given('I am on any page other than Logistics', function () {
  // Implement code to set up being on a page other than Logistics
  return 'pending';
});

When('I click on "Logistics" on the sidebar', function () {
  // Implement code to simulate clicking on the "Logistics" button
  return 'pending';
});

Then('I should be redirected to the Logistics page', function () {
  // Implement code to verify the redirection to the Logistics page
  return 'pending';
});

// Navigating to Same Page (Sad)
Given('I am on any page', function () {
  // Implement code to set up being on any page
  return 'pending';
});

When('I click on the icon that represents my current page', function () {
  // Implement code to simulate clicking on the current page icon
  return 'pending';
});

Then('I should remain on the same page', function () {
  // Implement code to verify remaining on the same page
  return 'pending';
});
