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
     const competitionElement = await driver.findElement(By.xpath("//p[contains(text(), 'Competition')]"));
     assert.ok(competitionElement, 'Competition element not found.');
     const competitionText = await competitionElement.getText();
     assert.ok(competitionText.trim().length > 0, 'Competition text is empty.');
   
     const productSalesElement = await driver.findElement(By.xpath("//p[contains(text(), 'Product Sales')]"));
     assert.ok(productSalesElement, 'Product Sales element not found.');
     const productSalesText = await productSalesElement.getText();
     assert.ok(productSalesText.trim().length > 0, 'Product Sales text is empty.');

  });
  
  Given('there is new data available',async function () {
    // Add fake data in with ridiculous value that definitely makes it in
    return 'pending';
  });
  
  When('I press the refresh button',async function () {
    // Click refresh button
    return 'pending';
  });
  
  Then('the page should display the updated statistics',async function () {
    // Added fake data should reflect in
    return 'pending';
  });
  
  Given('I have pressed the refresh button',async function () {
    return 'pending';

    // const refreshButton = await driver.findElement(By.className('top-right-button'));
    //await refreshButton.click();
  });
  
  When('the results are still loading',async function () {
    const refreshButton = await driver.findElement(By.xpath('//button[text()="Refresh Data"]'));
    const isButtonDisabled = await refreshButton.getAttribute('disabled');
  });
  
  Then('nothing should happen',async function () {
    // Date of refresh button still show not current time
    return 'pending';
  });
