const { Given, When, Then, And } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'http://localhost:5173/';

Given('I am on the overview page',async function () {
    await driver.get(websiteUrl);
  });
  
  Then('I should see summarized statistics for sales, product actions, and competitor analysis',async function () {
    const groupings = await driver.findElements(By.className('grouping'));
    const columns = await driver.findElements(By.className('column'));
    assert(groupings.length > 0);
    assert(columns.length > 0);
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
    const refreshButton = await driver.findElement(By.className('top-right-button'));
    await refreshButton.click();
  });
  
  When('the results are still loading',async function () {
    const refreshButton = await driver.findElement(By.className('top-right-button'));
    const isButtonDisabled = await refreshButton.getAttribute('disabled');
  });
  
  Then('nothing should happen',async function () {
    // Date of refresh button still show not current time
    return 'pending';
  });
