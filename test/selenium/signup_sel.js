/*
   var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var _ = require('underscore');
var VARS = {};

var globalTimeout = 60*1000;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.controlFlow().on('uncaughtException', function(err) {
    console.log('There was an uncaught exception: ' + err);
});

driver.get("http://localhost:8080/signup.html");
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Bootstrap Multi Step Registration Form Template") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Step 1/2:") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Create a company") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.id("form-company-name")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.id("form-email")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.id("form-phone")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Next") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.id("form-company-name")).clear();
driver.findElement(By.id("form-company-name")).sendKeys("Meep");
driver.findElement(By.id("form-email")).clear();
driver.findElement(By.id("form-email")).sendKeys("Meep");
driver.findElement(By.id("form-phone")).clear();
driver.findElement(By.id("form-phone")).sendKeys("Meep");
driver.findElement(By.id("submit-company-btn")).click();
driver.findElement(By.id("form-employee-first")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.id("form-employee-last")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.id("form-employee-email")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.id("form-employee-phone")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.id("form-password")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.id("form-repeat-password")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Next") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.id("form-employee-first")).clear();
driver.findElement(By.id("form-employee-first")).sendKeys("Meep");
driver.findElement(By.id("form-employee-last")).clear();
driver.findElement(By.id("form-employee-last")).sendKeys("Meep");
driver.findElement(By.id("form-employee-email")).clear();
driver.findElement(By.id("form-employee-email")).sendKeys("Meep");
driver.findElement(By.id("form-employee-phone")).clear();
driver.findElement(By.id("form-employee-phone")).sendKeys("Meep");
driver.findElement(By.id("form-password")).clear();
driver.findElement(By.id("form-password")).sendKeys("Meep");
driver.findElement(By.id("form-repeat-password")).clear();
driver.findElement(By.id("form-repeat-password")).sendKeys("Meep");
driver.findElement(By.id("submit-btn")).click();

driver.quit();

*/
