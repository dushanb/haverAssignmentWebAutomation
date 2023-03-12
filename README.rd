Harver QA Exercise
========================

## WEb Automation Part

select following links from https://the-internet.herokuapp.com/ and automated script names are given below
1. A/B testing : tests/verifyABTesting.js
2. Add/Remove Elements : verifyAddRemoveElemnt.js
3. checkboxes : verifyCheckboxes.js
4. dropdown : verifyDropdown.js
5. forgetPassword : verifyForgetPassword.js

### node version : 18.15.0

Using selenium framework

##common
    under common folder all common functions are declared 

##tests
    under tests folder all tests are created 

##resources 
    under resources all resources are stored 
        ####excelFiles
            data.xlsx : url details and testcase wise data are stored
            element.xlsx : all elements are stored in this excelFiles

###Run a testcase
    navigate to tests folder
    run following command
        node <testcasename> 
        ex:- node verifyABTesting.js


