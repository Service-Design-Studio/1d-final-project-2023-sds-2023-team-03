const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'https://sds-team-3-ecommerce-analysis-tool-jvfpcfcafa-as.a.run.app/';
var defaultRowText;

When('I visit the merchandising page', async () => {
    const targetUrl = websiteUrl + 'merchandising';
    await driver.get(targetUrl);
    const currUrl = await driver.getCurrentUrl();
    assert.strictEqual(currUrl, targetUrl);
})

Then('I should see the merchandising table', async () => {
    const table = await driver.findElement(By.xpath("//table[contains(@class, 'mantine-Table-root')]"));
    assert(table);
})

Then('I should see each row populated by row data', {timeout: 60 * 1000}, async () => {
    const tableRow = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[3]")), 55000);
    assert(tableRow);
    defaultRowText = await tableRow.findElement(By.xpath("//div[text()='Rustic Wooden Shirt']")).getText();
})

When('I filter for the {string} tag using the tag filter bar', async (str) => {
    const header = await driver.findElement(By.xpath("//table[contains(@class, 'mantine-Table-root')]//div[text()='Product name']"));
    await driver.actions().click(header).perform();
    const filterBar = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-MultiSelect-values')]"));
    await driver.actions().click(filterBar).perform();
    const badgeFilter = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-MultiSelect-dropdown')]//span[contains(@class, 'mantine-Badge-inner') and text()='" + str + "']"));
    assert(badgeFilter)
    await driver.actions().click(badgeFilter).perform();
})

Then('I should see products with the {string} tag on top of the table on page 1', async (str) => {
    const badge = await driver.findElement(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[1]//span[contains(@class, 'mantine-Badge-inner') and text()='" + str + "']"));
    assert(badge)
    const clearButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Input-rightSection')]"));
    await driver.actions().click(clearButton).perform();
    const header = await driver.findElement(By.xpath("//table[contains(@class, 'mantine-Table-root')]//div[text()='Product name']"));
    await driver.actions().click(header).perform();
})

Given('I am on page 2 of the merchandising table', async () => {
    const pageButtons = await driver.findElements(By.xpath("//button[contains(@class, 'mantine-Pagination-control')]"));
    const page2Button = pageButtons[2];
    await driver.actions().click(page2Button).perform();
    const enabled = page2Button.getAttribute('data-active');
    assert(enabled);
})

Then('I should be moved to the first page',  async () => {
    const pageButtons = await driver.findElements(By.xpath("//button[contains(@class, 'mantine-Pagination-control')]"));
    const page1Button = pageButtons[1];
    const enabled = page1Button.getAttribute('data-active');
    assert(enabled);
})

Given('I have filtered for the {string} tag using the tag filter bar', async (str) => {
    const header = await driver.findElement(By.xpath("//h1[text()='Merchandising']"));
    await driver.actions().click(header).perform();
    const filterBar = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-MultiSelect-values')]"));
    await driver.actions().click(filterBar).perform();
    const badgeFilter = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-MultiSelect-dropdown')]//span[contains(@class, 'mantine-Badge-inner') and text()='" + str + "']"));
    assert(badgeFilter)
    await driver.actions().click(badgeFilter).perform();
})

Given('I have toggled the hide other products switch', async () => {
    const switchButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Switch-thumb')]"));
    await driver.actions().click(switchButton).perform();
})

Then('I should be able to see ONLY products with the {string} and {string} tags', async (str1, str2) => {
    const rows = await driver.findElements(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr"));
    for (const row of rows) { 
        var innerFlag = false;
        const badges = await row.findElements(By.xpath("//span[contains(@class, 'mantine-Badge-inner')]"));
        for (const badge of badges) {
            const badgeText = await badge.getText();
            if (badgeText === str1 || badgeText === str2) {
                innerFlag = true;
            }
        }

        if (!innerFlag) break;
    }

    assert(innerFlag);
    const clearButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Input-rightSection')]"));
    await driver.actions().click(clearButton).perform();
    const switchButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Switch-thumb')]"));
    await driver.actions().click(switchButton).perform();
})

Given('no tags are selected', async () => {
    const header = await driver.findElement(By.xpath("//h1[text()='Merchandising']"));
    await driver.actions().click(header).perform();
    const filterBar = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-MultiSelect-values')]"));
    await driver.actions().click(filterBar).perform();
    const badgeFilters = await driver.findElements(By.xpath("//div[contains(@class, 'mantine-MultiSelect-dropdown')]//span[contains(@class, 'mantine-Badge-inner')]"));
    assert(badgeFilters.length == 5);
    await driver.actions().click(header).perform();
})

When('I toggle the hide other products switch', async () => {
    const switchButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Switch-thumb')]"));
    await driver.actions().click(switchButton).perform();
})

Then('the rows should not change', async () => {
    const tableRow = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[3]")), 55000);
    rowText = await tableRow.findElement(By.xpath("//div[text()='Rustic Wooden Shirt']")).getText();
    console.log(rowText, defaultRowText)
    assert(rowText === defaultRowText);
    const switchButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Switch-thumb')]"));
    await driver.actions().click(switchButton).perform();
})

Then('every product I see should have the {string} tag', {timeout: 1000 * 60}, async (str) => {
    const rows = await driver.findElements(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr"));
    for (const row of rows) { 
        var innerFlag = false;
        const badges = await row.findElements(By.xpath("//span[contains(@class, 'mantine-Badge-inner')]"));
        for (const badge of badges) {
            const badgeText = await badge.getText();
            if (badgeText === str) {
                innerFlag = true;
            }
        }

        if (!innerFlag) break;
    }

    assert(innerFlag);
    const clearButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Input-rightSection')]"));
    await driver.actions().click(clearButton).perform();
    const switchButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-Switch-thumb')]"));
    await driver.actions().click(switchButton).perform();
})