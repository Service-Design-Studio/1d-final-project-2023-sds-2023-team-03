const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until,actions } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder().forBrowser('chrome').build();
const websiteUrl = 'http://localhost:5173/home';