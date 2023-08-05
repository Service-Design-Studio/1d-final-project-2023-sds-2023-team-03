const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'https://sds-team-3-ecommerce-analysis-tool-jvfpcfcafa-as.a.run.app/';


Given('I visit the Competitors page of {string}', async function (competitor) {
  const encodedCompetitor = encodeURIComponent(competitor);
  const targetUrl = websiteUrl + 'competitors/' + encodedCompetitor;
  await driver.get(targetUrl);
  const currentUrl = await driver.getCurrentUrl();
  assert.strictEqual(currentUrl, targetUrl);
  });
  
  Then('I should see the {string} competitor header', async function (competitor) {
    const compHeader = await driver.findElement(By.xpath(`//h1[contains(text(), "${competitor}")]`));
    const compHeaderContent = await compHeader.getText();
    assert.ok(compHeaderContent.includes(competitor), `Header does not contain "${competitor}"`);
  });
  
  
  When('I navigate to the top performing products section', async function () {
    const carouselElement = await driver.wait(until.elementLocated(By.xpath('//div[@class="mantine-Carousel-root mantine-gpctky"]')), 4500); // Wait for 10 seconds
});
  
  Then('I should see the keywords', async function () {
    const compKeywordsElement = await driver.findElement(By.className('compKeywords'));
  });
  
  Then('I should see top five performing products based on number sold', async function () {
    const carouselElement = await driver.wait(until.elementsLocated(By.xpath('//div[@class="mantine-Carousel-slide mantine-1cj17nx"]')), 4500); // Wait for 10 seconds
    assert.strictEqual(carouselElement.length, 5);
});
  
  When('I navigate to the competitors section', async function () {
    const compSect = await driver.wait(until.elementsLocated(By.xpath('//div[@class="table-container"]')), 4500); // Wait for 10 seconds
  });
  
  Then('I should see the competitors table', async function () {
    const compTable = await driver.wait(until.elementsLocated(By.xpath('//div[@class="table mantine-v3audr"]')), 4500); // Wait for 10 seconds
    assert.strictEqual(compTable.length>0,true);
});
  
  Given('the top five performing products section have successfuly loaded data', async function () {
    const carousel = await driver.wait(until.elementLocated(By.xpath('//div[@class="mantine-Carousel-root mantine-gpctky"]')), 4500); // Wait for 10 seconds
    const carouselElement = await driver.wait(until.elementsLocated(By.xpath('//div[@class="mantine-Carousel-slide mantine-1cj17nx"]')), 4500); // Wait for 10 seconds
    assert.strictEqual(carouselElement.length, 5);
  });
  
  When('I click on a particular card', async function () {
    const windows = await driver.getAllWindowHandles(); // Get the handle of the first window
    await driver.switchTo().window(windows[0]);
    const carouselElement = await driver.findElement(By.xpath('//div[contains(@class, "mantine-Carousel-slide")]')); // Wait for 10 seconds
    await driver.actions().click(carouselElement).perform();
  });
 
  
  Then('I should be directed to the merchant site of the product in the card', async function () {
      var windows = await driver.getAllWindowHandles();
      
      assert.strictEqual(windows.length > 1, true);
      // Switch back to the original window
      await driver.switchTo().window(windows[0]);
  });

  
  Given('the competitors table has successfully loaded data', async function () {
    const button = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Button-inner')]"))
    await driver.actions().click(button).perform();
    const compSect = await driver.wait(until.elementsLocated(By.xpath('//div[@class="table-container"]')), 4500); // Wait for 10 seconds
    const compTable = await driver.findElement(By.xpath('//div[@class="table mantine-v3audr"]'));
});
  
  When('I click on a particular row on the competitors table', async function () {
    const compTable =  await driver.findElement(By.xpath('//table[contains(@class, "mantine-Table-root")]'));
    const rows = await driver.wait(until.elementsLocated(By.xpath('//tr[@class="mantine-1mj2j8y"]')), 4500); // Wait for 10 seconds
    const rowsToClick = rows.slice(0, 5);
  for (const row of rowsToClick) {
    await row.click();
  }
});
  
  Then('I should be directed to the merchant site of the product in the row', async function () {
    const windows = await driver.getAllWindowHandles();
    assert.strictEqual(windows.length > 5, true);
    await driver.switchTo().window(windows[0]);
  });
  
  Given('the competitors table is currently sorted by {string} in ascending order', async function (column) {
    // Code to check if the competitors table is sorted by the specified column in ascending order using Selenium
    // Use 'this.driver' to interact with the WebDriver
  });
  
  When('I press the {string} header on the competitors table', async function (column) {
    // Code to click on the specified column header to sort the competitors table using Selenium
    // Use 'this.driver' to interact with the WebDriver
  });
  
  Then('the competitors table should be sorted in descending order by {string}', async function (column) {
    // Code to check if the competitors table is sorted by the specified column in descending order using Selenium
    // Use 'this.driver' to interact with the WebDriver
  });