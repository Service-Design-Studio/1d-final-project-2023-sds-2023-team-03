const { Given, When, Then, And } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'http://localhost:5173/';

When(`I visit the {string} page`, async function(route) {
    const targetUrl = websiteUrl + route;
    await driver.get(targetUrl);

    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, targetUrl)
});

Then(`I should see the {string} header`, async function(text) {
    const salesHeader = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-caxjnw')]//h1[text()='Sales Analytics']"));
    assert.strictEqual(await salesHeader.getText(), text);
})

Given(`I am in preset selection mode`, async function() {
    const presetBoxDisplayed = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-np8w2')]//label[text()='Last 30 days']")).isDisplayed();
    assert.strictEqual(presetBoxDisplayed, true);
})

When(`I select "Last 12 months"`, async function() {
    const lastYearButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-np8w2')]//label[text()='Last 12 months']"));
    await driver.actions().click(lastYearButton).perform();
    const buttonActive = await lastYearButton.getAttribute("data-active");
    assert.strictEqual(Boolean(buttonActive), true);
})

Then(`the search section should blur`, async function() {
    const lastMonthButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-np8w2')]//label[text()='Last 30 days']"));
    const lastYearButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-np8w2')]//label[text()='Last 12 months']"));
    await driver.actions().click(lastMonthButton).perform();
    await driver.actions().click(lastYearButton).perform();
    const blurDisplayed = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'mantine-1nisyfe')]")), 4500).isDisplayed();
    assert.strictEqual(blurDisplayed, true);
})

Then(`I should see the queried data reflect on the graph under the search section`, async function() {
    const apexSvg = "//*[name()='svg' and @class='apexcharts-svg']"
    const apexSvgInner = "//*[name()='g' and @class='apexcharts-inner apexcharts-graphical']"
    const apexBarPlotSeries = "//*[name()='g' and @class='apexcharts-bar-series apexcharts-plot-series']"
    const apexData = "//*[name()='g' and @class='apexcharts-series']"
    const topFrequency = "//*[name()='path'][1]"
    const lastYearButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-np8w2')]//label[text()='Last 12 months']"));

    await driver.actions().click(lastYearButton).perform();
    const res = await driver.wait(until.elementLocated(By.xpath(apexSvg + apexSvgInner + apexBarPlotSeries + apexData + topFrequency)), 4500);
    const val = await res.getAttribute('val');

    assert.equal(val, '195')
})

Then(`the header on top of the table should reflect the query parameters`, async function() {
    const apexSvg = "//*[name()='svg' and @class='apexcharts-svg']"
    const titleText = "//*[name()='text' and @class='apexcharts-title-text']"
    const titleElement = await driver.wait(until.elementLocated(By.xpath(apexSvg + titleText)), 4500);
    const res = await titleElement.getText();

    const today = new Date();
    const lastYear = new Date(new Date().setDate(today.getDate() - 365))
    const todayText = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
    const lastYearText = `${lastYear.getDate()}-${lastYear.getMonth()+1}-${lastYear.getFullYear()}`
    const sol = `Product units data for "running" from ${lastYearText} to ${todayText}:`

    assert.strictEqual(res, sol);
});

When(`10 seconds pass without a response from the server`, {timeout: 10 * 5000}, async function() {
    await driver.setNetworkConditions({
        offline: false,
        latency: 15,
        download_throughput: 10,
        upload_throughput: 10
    })

    const lastMonthButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-np8w2')]//label[text()='Last 30 days']"));
    await driver.actions().click(lastMonthButton).perform();

    const blur = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'mantine-1nisyfe')]")), 10000);
    var time = Date.now();
    await driver.wait(until.stalenessOf(blur), 15000);
    var time = Date.now() - time;
    const restoreNetwork = () => {
        driver.setNetworkConditions({
        offline: false,
        latency: 0,
        download_throughput: 50 * 1024,
        upload_throughput: 50 * 1024
        })
        return true;
    }
    await driver.wait(() => restoreNetwork(), 1500);

    const finalCheck = (time < 11000)
    assert.strictEqual(finalCheck, true);
});

Then(`I should receive a search timeout message modal`, async function() {
    const exitButton = await driver.findElement(By.xpath("//header[contains(@class, 'mantine-ko6o8l')]"))
    const overlay = await driver.findElement(By.xpath("//section[contains(@class, 'mantine-3cevnw')]"))
    const overlayDisplayed = await overlay.isDisplayed();
    await driver.actions().click(exitButton).perform();
    await driver.wait(until.stalenessOf(overlay));

    assert.strictEqual(overlayDisplayed, true);
})

Given(`I have submitted a search`, async function() {
    const lastYearButton = await driver.findElement(By.xpath("//div[contains(@class, 'mantine-np8w2')]//label[text()='Last 12 months']"));
    await driver.actions().click(lastYearButton).perform();
    const buttonActive = await lastYearButton.getAttribute('data-active');
    assert.strictEqual(Boolean(buttonActive), true);
})

Given(`the segment control is not currently on {string}`, async function(text) {
    const segmentedControls = await driver.findElements(By.xpath("//div[@class='sales-segment']//div[contains(@class, 'mantine-SegmentedControl-control')]"))
    
    var segment = null;
    for (var i=0; i < segmentedControls.length; i++) {
        var selectSegment = segmentedControls[i];
        var segmentText = await selectSegment.getText();
        if (segmentText !== text) {
            segment = selectSegment;
            break;
        }
    }

    await driver.actions().click(segment).perform();
    var refuseSegment;
    for (var i = 0; i < segmentedControls.length; i++) {
        var segmentText = await segmentedControls[i].getText();
        if (segmentText === text) {
            refuseSegment = segmentedControls[i]
            break;
        }
    }
    const refuseSegmentStatus = (Boolean(await refuseSegment.getAttribute('data-active')) == true);

    assert.equal(refuseSegmentStatus, false);
})

When(`I click on the {string} graph segment`, async function(text) {
    const segmentXPath = "//div[@class='sales-segment']//label[text()='" + text + "']";
    const segmentedControl = await driver.findElement(By.xpath(segmentXPath));
    await driver.actions().click(segmentedControl).perform();

    const segmentStatus = (Boolean(await segmentedControl.getAttribute('data-active')) == true);
    assert.strictEqual(segmentStatus, true);
});

Then(`the current graph should be replaced by the {string} graph`, async function(text) {
    const apexSvg = "//*[name()='svg' and @class='apexcharts-svg']"
    const titleText = "//*[name()='text' and @class='apexcharts-title-text']"
    const titleElement = await driver.wait(until.elementLocated(By.xpath(apexSvg + titleText)), 4500);
    const title = await titleElement.getText();
    const status = title.toLowerCase().includes(text.toLowerCase());
    assert.strictEqual(status, true);
});

Then(`the {string} graph segment should still be visible`, async function (text){
    const apexSvg = "//*[name()='svg' and @class='apexcharts-svg']"
    const titleText = "//*[name()='text' and @class='apexcharts-title-text']"
    const titleElement = await driver.wait(until.elementLocated(By.xpath(apexSvg + titleText)), 4500);
    const title = await titleElement.getText();
    const status = title.toLowerCase().includes(text.toLowerCase());
    assert.strictEqual(status, true);
})