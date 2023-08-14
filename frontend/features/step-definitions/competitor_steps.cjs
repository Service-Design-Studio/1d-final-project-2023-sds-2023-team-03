const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'https://sds-team-3-ecommerce-analysis-tool-jvfpcfcafa-as.a.run.app/';
driver.manage().setTimeouts({
  implicit: 10000, // Set an appropriate timeout value
});

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
    const carouselElement = await driver.wait(until.elementLocated(By.xpath('//div[@class="mantine-Carousel-root mantine-gpctky"]')), 10000); // Wait for 10 seconds
});
  
  Then('I should see the Shopee\\/Lazada toggle', async function () {
    const toggle = await driver.findElement(By.className('mantine-1bsf4z5'));
  });
  
  Then('I should see top five performing products based on number sold', async function () {
    const carouselElement = await driver.wait(until.elementsLocated(By.xpath('//div[@class="mantine-Carousel-slide mantine-1cj17nx"]')), 10000); // Wait for 10 seconds
    assert.strictEqual(carouselElement.length, 5);
});
  
  When('I navigate to the competitors section', async function () {
    const compSect = await driver.wait(until.elementsLocated(By.xpath('//div[@class="table-container"]')), 10000); // Wait for 10 seconds
  });
  
  Then('I should see the competitors table', async function () {
    const compTable = await driver.wait(until.elementsLocated(By.xpath('//div[@class="table mantine-v3audr"]')), 10000); // Wait for 10 seconds
    assert.strictEqual(compTable.length>0,true);
});
  
  Given('the top five performing products section have successfuly loaded data', async function () {
    const carousel = await driver.wait(until.elementLocated(By.xpath('//div[@class="mantine-Carousel-root mantine-gpctky"]')), 10000); // Wait for 10 seconds
    const carouselElement = await driver.wait(until.elementsLocated(By.xpath('//div[@class="mantine-Carousel-slide mantine-1cj17nx"]')), 10000); // Wait for 10 seconds
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

  
  Given('the competitors table has successfully loaded data',{timeout: 15000}, async function () {
    const button = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Button-inner')]"))
    await driver.actions().click(button).perform();
    const compSect = await driver.wait(until.elementsLocated(By.xpath('//div[@class="table-container"]')), 10000); // Wait for 10 seconds
    const compTable = await  driver.wait(until.elementsLocated(By.xpath('//div[@class="table mantine-v3audr"]')), 10000);

});
  
  When('I click on a particular row on the competitors table', async function () {
    const compTable =  await driver.findElement(By.xpath('//table[contains(@class, "mantine-Table-root")]'));
    const rows = await driver.wait(until.elementsLocated(By.xpath('//tr[@class="mantine-1mj2j8y"]')), 10000); // Wait for 10 seconds
    const rowsToClick = rows.slice(0, 5);
  for (const row of rowsToClick) {
    await row.click();
  }
});
  
  Then('I should be directed to the merchant site of the product in the row',{timeout: 15000}, async function () {
    const windows = await driver.getAllWindowHandles();
    assert.strictEqual(windows.length > 5, true);
    await driver.switchTo().window(windows[0]);
  });
  
  
  When('I press the {string} header on the competitors table', async function (column) {
    const headerTitle = column;
    const header = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]/thead/tr/th[contains(@role, 'button')]/descendant::div[text()='" + headerTitle + "']")), 4500);
    await driver.actions().click(header).perform();
  });
  
  Then('the competitors table should be sorted in descending order by {string}', async function (column) {
    const target = column;
    const index = () => {
        if (target === "Sales") {
            return 5;
        } else if (target === "Initial price") {
            return 6;
        }else if (target === "Final price") {
          return 7;
      }
    }
    const header = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]/thead/tr/th[contains(@role, 'button')]/descendant::div[text()='" + target + "']")), 10000);
    const tableRow1value = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[1]/td[" + index() + "]")),10000).getText();
    const tableRow5value = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[5]/td[" + index() + "]")),10000).getText();
    if(target === "Sales"){
      assert(tableRow1value >= tableRow5value);
    }
    else{
      assert(tableRow1value <= tableRow5value);
    }
  });