const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const { waitForElementToLoad, assertIsElementPresent, navigateToPage } = require('../common/commonFunctions');
const { getElementFromExcel } = require('../common/elementExcel');
const { getExcelValue } = require('../common/dataExcel');

(async function example() {
  // create a new instance of the Chrome driver
  let driver = await new Builder().forBrowser('chrome').build();
  let dataFile = "data";
  let dataSheet = "CheckBoxTest";
  let valueCol = "value1";
  let homePage = "home";
  let testPage = "CheckBox";

  try {
    // navigate to the website
    await navigateToPage(driver, "url", "title", valueCol);
    
    // find the "Checkbox Elements" link and click it
    const checkBoxesLink = await getElementFromExcel(driver, homePage, "Checkboxes");
    await checkBoxesLink.click();
    
    await driver.sleep(3000);
    // wait for the heading and paragraph elements
    const checkBox = await getElementFromExcel(driver, testPage, "checkBox");

    //select checkbox if it is not selected already
    if(!await checkBox.isSelected()){
        await checkBox.click();
        console.log("click on checkbox.")
    }
    else{
        console.log("checkbox already selected.");
    }
    
    //assert checkbox is selected
    message = getExcelValue(dataFile, dataSheet, "message", valueCol)
    if(!checkBox.isSelected){
        assert.fail(message);
     }

  } 
  finally {
    // close the browser
    await driver.quit();
  }
})();
