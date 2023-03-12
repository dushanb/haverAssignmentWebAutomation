const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const { waitForElementToLoad, assertIsElementPresent, navigateToPage } = require('../common/commonFunctions');
const { getElementFromExcel } = require('../common/elementExcel');
const { getExcelValue } = require('../common/dataExcel');

(async function example() {
  // create a new instance of the Chrome driver
  let driver = await new Builder().forBrowser('chrome').build();
  let dataFile = "data";
  let dataSheet = "ABTest";
  let valueCol = "value1";
  let homePage = "home";
  let testPage = "ABTest";
  
  try {

    // navigate to the website
    await navigateToPage(driver, "url", "title", valueCol);
    
    // find the "A/B Testing" link and click it
    let addRemoveLink = await getElementFromExcel(driver, homePage, "ABTesting");

    await addRemoveLink.click();
    
    // wait for the heading and paragraph elements
    const heading = await getElementFromExcel(driver, testPage, "heading");
    const paragraph = await getElementFromExcel(driver, testPage, "paragraph");

     // assert the text of the heading
     const headingText = await heading.getText();
     let  expectedHeadingText = getExcelValue(dataFile, dataSheet, "headingtText", valueCol );
     assert.strictEqual(headingText, expectedHeadingText, `Expected 'A/B Test Control' button text, but got '${headingText}'`);

     // assert the text of the content
     const paragraphText = await paragraph.getText();
     let paragraphExpectedText = getExcelValue(dataFile, dataSheet, "paraText", valueCol );//"Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).";
     assert.strictEqual(paragraphText, paragraphExpectedText, `Expected '${paragraphExpectedText}' button text, but got '${paragraphText}'`);
     
  }
  finally {
    // close the browser
    await driver.quit();
  }
})();

