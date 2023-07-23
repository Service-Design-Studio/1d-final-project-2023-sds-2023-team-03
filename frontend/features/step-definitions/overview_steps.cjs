const { Given, When, Then, And } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'http://localhost:5173/';

Given('I am on the overview page',async function () {
    await driver.get(websiteUrl);
  });
  
Then('I should see summarized statistics for sales, product actions, and competitor analysis',async function () {
  
    const cardElements = await driver.findElements(By.className('CardWidth'));
    for (const cardElement of cardElements) {
      const imageUrl = await cardElement.getAttribute('imageUrl');
      const category = await cardElement.getAttribute('category');
      const title = await cardElement.getAttribute('title');
      const price = await cardElement.getAttribute('price');
      const sales = await cardElement.getAttribute('sales');
      const mthrev = await cardElement.getAttribute('mthrev');
      const yearrev = await cardElement.getAttribute('yearrev');

      // Check if any of the attributes are null or empty
      assert.ok(imageUrl, 'imageUrl attribute is missing in the CardWidth element.');
      assert.ok(category, 'category attribute is missing in the CardWidth element.');
      assert.ok(title, 'title attribute is missing in the CardWidth element.');
      assert.ok(price, 'price attribute is missing in the CardWidth element.');
      assert.ok(sales, 'sales attribute is missing in the CardWidth element.');
      assert.ok(mthrev, 'mthrev attribute is missing in the CardWidth element.');
      assert.ok(yearrev, 'yearrev attribute is missing in the CardWidth element.');
    }
     const competitionElement = await driver.wait(until.elementLocated(By.className('compInsights')), 5000);
     assert.ok(competitionElement, 'Competition element not found.');
     const competitionText = await competitionElement.getText();
     assert.ok(competitionText.trim().length > 0, 'Competition text is empty.');
     const productSalesElement =  await driver.wait(until.elementLocated(By.className('salesInsights')), 5000);
     assert.ok(productSalesElement, 'Product Sales element not found.');
     const productSalesText = await productSalesElement.getText();
     assert.ok(productSalesText.trim().length > 0, 'Product Sales text is empty.');
  });
  
  Given('there is new data available',async function () {
  });
  
  When('I press the refresh button',async function () {
   const refreshButton = await driver.findElement(By.className('top-right-button'));
   await driver.wait(until.elementIsEnabled(refreshButton), 20000);
   await refreshButton.click();
  });
  
  Then('the page should display the updated statistics',async function () {
    const refreshTimeElement = await driver.wait(until.elementLocated(By.className('refreshTime')), 5000);
    // Get the text content of the element, which should be the refresh time
    const refreshTimeString = await refreshTimeElement.getText();
     // Convert the refresh time string to a Date object
    const refreshTime = new Date(refreshTimeString);
    // Get the current system time
    const currentSystemTime = new Date();
    // Calculate the time difference between the refresh time and current system time
    const timeDifferenceInSeconds = Math.abs((currentSystemTime - refreshTime) / 1000);
    // Assert that the time difference is within the tolerance of ±1 second
    assert.strictEqual(timeDifferenceInSeconds <= 1,true);
  });
  
  Given('I have pressed the refresh button',async function () {
     const refreshButton = await driver.findElement(By.className('top-right-button'));
     await driver.wait(until.elementIsEnabled(refreshButton), 20000);
     await refreshButton.click();
     await driver.sleep(500);
  });
  
  
  Then('the refresh button will be disabled',async function () {
    const refreshButton = await driver.findElement(By.className('top-right-button'));
    const isEnabled = await refreshButton.isEnabled();
    assert.strictEqual(isEnabled, false, 'Refresh button is not disabled');
  });
