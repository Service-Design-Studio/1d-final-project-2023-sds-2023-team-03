const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'https://sds-team-3-ecommerce-analysis-tool-jvfpcfcafa-as.a.run.app/';



// Step definition for Scenario: Product with Name and Description
Given('I am on any competitor\'s page', async () => {
    await driver.get(websiteUrl +'competitors/Adidas');
});

Given('I see a table of competitors’ products', async () => {
    const compTable = await driver.wait(until.elementsLocated(By.xpath('//div[@class="table mantine-v3audr"]')), 10000); // Wait for 10 seconds
    assert(compTable);
});

When('the product has a name and description',{timeout:15000}, async () => {
    const header = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]/thead/tr/th/descendant::div[text()='" + 'Product name' + "']")), 15000);
    const tableRow1value = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[1]/td[" + 3 + "]")),15001).getText();
    const tableRow2value = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[2]/td[" + 3 + "]")),15002).getText();
    assert(tableRow1value);
    assert(tableRow2value);
});

Then('I should see the category column of the product to contain a specific category',{timeout:15000}, async () => {
    const header = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]/thead/tr/th/descendant::div[text()='" + 'Category' + "']")), 15000);
    const tableRow1value = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[1]/td[" + 2 + "]")),15000).getText();
    const tableRow2value = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[2]/td[" + 2 + "]")),15000).getText();
    const tableRow3value = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[3]/td[" + 2 + "]")),15000).getText();
    assert(tableRow1value);
    assert(tableRow2value);
    assert(tableRow3value);
});

