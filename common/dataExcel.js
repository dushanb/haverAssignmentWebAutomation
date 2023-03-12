const xlsx = require('xlsx');
const path = require('path');

//get data from excel sheet
function getExcelValue(fileName, sheetName, parameter, value){
    //excel file path
    const filepath = path.join(__dirname, '..', 'resources', 'excelfiles', fileName+'.xlsx');
    
    //read excel
    const workbook = xlsx.readFile(filepath);
    
    //excel sheet
    const worksheet = workbook.Sheets[sheetName];

    //get value coloumn name and index
    let coloumn = getValueColumnName(worksheet, value);
    let index = getIndex(worksheet, parameter);

    //if value cell is no found return null
    if(coloumn == null || index == null){
        return null;
    }

    //return value
    return worksheet[coloumn+index].v;
}

//get value column name
function getValueColumnName(worksheet, value){
    let valueCell;
    for (let cellAddress in worksheet) {
        if(worksheet[cellAddress].v === value){
            valueCell = cellAddress;
            break;
        }
    }
    if(valueCell == null){
        return null;
    }

    return (valueCell.match(/[A-Z]+/)[0]);
}

//get value column index
function getIndex(worksheet, parameter){
    let parameterCell;
    for (let cellAddress in worksheet) {
        if(worksheet[cellAddress].v === parameter){
            parameterCell = cellAddress;
            break;
        }
    }
    if(parameterCell == null){
        return null;
    }

    return (parameterCell.match(/\d+/)[0]);
}

module.exports = { getExcelValue };

// console.log(getExcelValue("data", "Sheet1", "animal", "value1"));
