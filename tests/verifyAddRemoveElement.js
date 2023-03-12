const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const { waitForElementToLoad, assertIsElementPresent, navigateToPage } = require('../common/commonFunctions');
const { getElementFromExcel } = require('../common/elementExcel');
const { getExcelValue } = require('../common/dataExcel');

(async function example() {
  // create a new instance of the Chrome driver
  let driver = await new Builder().forBrowser('chrome').build();
  let dataFile = "data";
  let dataSheet = "ABRemoveTest";
  let valueCol = "value1";
  let homePage = "home";
  let testPage = "ABRemove";
  
  try {
    // navigate to the website
    await navigateToPage(driver, "url", "title", valueCol);
    
    // find the "Add/Remove Elements" link and click it
    const addRemoveLink = await getElementFromExcel(driver, homePage, "AddRemove");
    await addRemoveLink.click();
    
    await driver.sleep(3000);
    // wait for the "Add Element" button to be visible
    const addElementButton = await getElementFromExcel(driver, testPage, "addRemoveBtn");

     // assert that the "Add Element" button is present
     assert.ok(await addElementButton.isDisplayed, 'Add Element button is not displayed');
    
     // assert the text of the "Add Element" button
     const addElementButtonText = await addElementButton.getText();
     let expectedAddElementText = getExcelValue(dataFile, dataSheet, "expectedAddElementText", valueCol);
     assert.strictEqual(addElementButtonText, expectedAddElementText, `Expected '${expectedAddElementText}' button text, but got '${addElementButtonText}'`);

     await addElementButton.click();

    // wait for the "Delete" button to be visible
    const deleteButton = await getElementFromExcel(driver, testPage, "deleteBtn");
    
    // assert that the "Delete" button is present
    assert.ok(await deleteButton.isDisplayed, 'Delete button is not displayed');
    
    // assert the text of the "Delete" button
    const deleteText = await deleteButton.getText();
    let expectedDeleteText = getExcelValue(dataFile, dataSheet, "expectedDeleteText", valueCol);
    assert.strictEqual(deleteText, expectedDeleteText, `Expected '${expectedDeleteText}' button text, but got '${deleteText}'`);

    //click on delete button
    deleteButton.click();

    //assert delete button is present
    message = getExcelValue(dataFile, dataSheet, "message", valueCol);
    timeout = getExcelValue(dataFile, dataSheet, "timeout", valueCol);;
    
    // assertIsElementPresent(driver, deleteButton, message, timeout) 
    try{
       await driver.wait(until.stalenessOf(deleteButton), timeout);
    }
    catch(error){
      assert.fail(message);
    }

  } 
  finally {
    // close the browser
    await driver.quit();
  }
})();


