const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const { getElementFromExcel } = require('../common/elementExcel');
const { getExcelValue } = require('../common/dataExcel');

async function waitForElementToLoad(driver, locator, timeout) {
  try {
    const element = getElementFromExcel(driver, locator);//await driver.wait(until.elementLocated(By.css(selector)), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    return element;
  } catch (error) {
    throw new Error(`Timed out after ${timeout}ms waiting for element with selector "${selector}"`);
  }
}

async function assertIsElementPresent(driver, element, message, timeout){
  try{
    await driver.wait(until.stalenessOf(element), timeout);
  }
  catch(error){
    assert.fail(message);
  }
}


async function navigateToPage( driver, pageUrl, pageTitleLocator, pageTitleValue) {

  // navigate to the website
  const url = getExcelValue("data", "URL", pageUrl, "value1");
  await driver.get(url);

  // wait for the page title to match the expected value
  const titleValue = getExcelValue("elements", "home", pageTitleLocator, "LocatorValue");
  await driver.wait(until.titleIs(titleValue), 1000);

}

async function selectCheckBox(element){
  
}

module.exports = {
  waitForElementToLoad,
  assertIsElementPresent,
  navigateToPage,
};