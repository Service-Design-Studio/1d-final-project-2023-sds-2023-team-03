const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until,actions } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'http://127.0.0.1:5173/';

When('I visit the merchandising page', async function() {
    const targetUrl = websiteUrl + 'merchandising';
    await driver.get(targetUrl);
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, targetUrl);
})

Then('I should see the Merchandising header', async function() {
    const salesHeader = await driver.findElement(By.xpath("//h1[text()='Merchandising']"));
    const salesHeaderContent = await salesHeader.getText();
    assert.strictEqual(salesHeaderContent, "Merchandising");
})

When('I navigate to the product action section', async function() {
    const segmentFlex = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-u25sq6')]"));
    const paSegment = await segmentFlex.findElement(By.xpath("//label[text()='Product Actions']"));
    await driver.actions().click(paSegment).perform();
})

Then('I should see the product actions table', async function() {
    const table = await driver.findElement(By.xpath("//table[contains(@class, 'mantine-Table-root')]"));
    const status = await table.isDisplayed();
    assert(status);
})

Given('the product actions table has successfully loaded data', async function() {
    const table = await driver.findElement(By.xpath("//table[contains(@class, 'mantine-Table-root')]"))
    const tableRow = await table.findElement(By.xpath("//tbody/tr[1]"));
    assert(tableRow)
})

When('I click on a particular row', async function() {
    const tableRow = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[3]")));
    await driver.actions().click(tableRow).perform();
})

Then('the row should expand', async function() {
    const expandedRow = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[5]/td//div[contains(@class, 'rowExpansionText')]")));
    assert(expandedRow);
})

Then('show an image of the product with description', async function() {
    const expandedRow = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[5]/td//div[contains(@class, 'rowExpansionText')]")));
    const image = await expandedRow.findElement(By.xpath("//div[contains(@class, 'mantine-Image-root')]"));
    const desc = await expandedRow.findElement(By.xpath("//div[contains(@class, 'rowExpansionDesc')]"));
    const status = (image && desc);
    assert(status);
})

// use table row 2 here
Given('another row is already expanded', async function() {
    const tableRow = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[2]")));
    await driver.actions().click(tableRow).perform();
    const expandedRow = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[4]/td//div[contains(@class, 'rowExpansionText')]")));
    assert(expandedRow);
})

// expand table row 1
When('I expand another row', async function() {
    const tableRow = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[1]")));
    await driver.actions().click(tableRow).perform();
})

// check that table row 2 is no longer expanded (can't find rowExpansionText div)
Then('the previous one will close', async function() {
    const previousRow = await driver.findElements(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[4]/td//div[contains(@class, 'rowExpansionText')]"));
    assert.strictEqual(previousRow.length, 0);
})

// row 1 expansion
Then('the new one will open', async function() {
    const newRow = await driver.findElement(By.xpath("//table[contains(@class, 'mantine-Table-root')]//tbody/tr[3]/td//div[contains(@class, 'rowExpansionText')]"));
    assert(newRow);
})

Given('the product actions table is currently sorted by {string} in ascending order', async function(str) {
    const headerTitle = str;
    const header = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]/thead/tr/th[contains(@role, 'button')]/descendant::div[text()='" + headerTitle + "']")), 4500);
    var headerStatus = await header.findElement(By.xpath("//div[contains(@class, 'mantine-Center-root')]")).getAttribute("aria-label");
    
    while (headerStatus !== "Sorted ascending") {
        await driver.actions().click(header).perform()
        headerStatus = await header.findElement(By.xpath("//div[contains(@class, 'mantine-Center-root')]")).getAttribute("aria-label");
    }

    assert.strictEqual(headerStatus, "Sorted ascending");
})

When('I press the {string} header on the product actions table', async function(str) {
    const headerTitle = str;
    const header = await driver.wait(until.elementLocated(By.xpath("//table[contains(@class, 'mantine-Table-root')]/thead/tr/th[contains(@role, 'button')]/descendant::div[text()='" + headerTitle + "']")), 4500);
    await driver.actions().click(header).perform();
})

Then('the table should be sorted in descending order', async function() {
    
})