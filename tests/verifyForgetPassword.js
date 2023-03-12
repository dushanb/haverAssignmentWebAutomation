const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const { waitForElementToLoad, assertIsElementPresent, navigateToPage } = require('../common/commonFunctions');
const { getElementFromExcel } = require('../common/elementExcel');
const { getExcelValue } = require('../common/dataExcel');

(async function example() {
  // create a new instance of the Chrome driver
  let driver = await new Builder().forBrowser('chrome').build();
  let dataFile = "data";
  let dataSheet = "ABRemForgetPWTest";
  let valueCol = "value1";
  let homePage = "home";
  let testPage = "ForgetPW";

  try {
    // navigate to the website
    await navigateToPage(driver, "url", "title", valueCol);
    
    // find the "Forget Password" link and click it
    const addRemoveLink = await getElementFromExcel(driver, homePage, "ForgetPW");
    await addRemoveLink.click();
    
    //get input field and submit button elements
    const emailInput = await getElementFromExcel(driver, testPage, "email");
    const submitButton = await getElementFromExcel(driver, testPage, "submit");

    //type on input field and submit button
    email = getExcelValue(dataFile, dataSheet, "email", valueCol);
    await emailInput.sendKeys(email);
    await submitButton.click();
    
    driver.sleep(3000);
    let expectedText = getExcelValue(dataFile, dataSheet, "expectedText", valueCol);

    // wait for the server error message to be displayed
    const serverError = await getElementFromExcel(driver, testPage, "serverError");
    await driver.wait(until.elementTextIs(serverError, expectedText), 10000);

    // assert the error message
    const actualValue = await serverError.getText();
    assert.strictEqual(actualValue, expectedText, "Expected value is "+expectedText+", But was "+actualValue);



} 
finally {
    // close the browser
    await driver.quit();
  }
})();