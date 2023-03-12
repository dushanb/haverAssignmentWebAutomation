const { By } = require('selenium-webdriver');
const dataExcel = require('./dataExcel');

async function getElementFromExcel( driver, page, elementName) {
  let element;
  let locator = dataExcel.getExcelValue("elements", page, elementName, "LocatorType");
  let value = dataExcel.getExcelValue("elements", page, elementName, "LocatorValue");;
console.log("Locator Type : "+ locator);
console.log("Locator Value : "+ value);

  switch (locator) {
    case 'id':
      element = await driver.findElement(By.id(value));
      break;
    case 'name':
      element = await driver.findElement(By.name(value));
      break;
    case 'class':
      element = await driver.findElement(By.className(value));
      break;
    case 'css':
      element = await driver.findElement(By.css(value));
      break;
    case 'xpath':
      element = await driver.findElement(By.xpath(value));
      break;
    case 'linkText':
      element = await driver.findElement(By.linkText(value));
      break;
    case 'partialLinkText':
      element = await driver.findElement(By.partialLinkText(value));
      break;
    case 'tagName':
      element = await driver.findElement(By.tagName(value));
      break;
    default:
      throw new Error(`Unsupported locator type: ${locator}`);
  }
  
  return element;
}

// getElementFromExcel("addRemove")

module.exports = { getElementFromExcel };