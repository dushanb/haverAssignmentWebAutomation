const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const { waitForElementToLoad, assertIsElementPresent, navigateToPage } = require('../common/commonFunctions');
const { getElementFromExcel } = require('../common/elementExcel');
const { getExcelValue } = require('../common/dataExcel');

(async function example() {
  // create a new instance of the Chrome driver
  let driver = await new Builder().forBrowser('chrome').build();
  let dataFile = "data";
  let dataSheet = "DropDownTest";
  let valueCol = "value1";
  let homePage = "home";
  let testPage = "DropDown";

  try {
    // navigate to the website
    await navigateToPage(driver, "url", "title", valueCol);
    
    // find the "Dropdown" link and click it
    const addRemoveLink = await getElementFromExcel(driver, homePage, "Dropdown");
    await addRemoveLink.click();
    
    
    //get dropdown elements
    optionElement =  getExcelValue("elements", testPage, "options", "LocatorValue");
    let options = await driver.findElements(By.xpath(optionElement));
    // let options = await getElementFromExcel(driver, testPage, "options");
    let dropdown = await getElementFromExcel(driver, testPage, "dropdown");
    const optionValues = [];
    selected = false;

    //get values in dropdown
    for (let i = 0; i < options.length; i++) {
      optionValues.push(await options[i].getText());
    }
    const desiredValue = getExcelValue(dataFile, dataSheet, "dropDownValue", valueCol);
    console.log(options.length);
    console.log(optionValues);

    //select given value in drop down
    for (let i = 0; i < options.length; i++) {
      const value = await options[i].getText();
      console.log(value);
      if (value === desiredValue) {
        await dropdown.click();
        await options[i].click();
        selected = true;
        break;
      }
    }

    //assert value is selected or not
    if(!selected){
        assert.fail("Value is not in the drop down, values in drop dwon [ "+optionValues+" ] , Expected value : "+ desiredValue);
    }

  } finally {
    // close the browser
    await driver.quit();
  }
})();
