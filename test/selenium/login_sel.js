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

driver.get("http://localhost:8080/login.html");
driver.isElementPresent(driver.findElement(By.css("img"))).then(function (isPresent) {
    if (!isPresent) {
        driver.quit();
        console.log('verifyElementPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Dear user, log in to access the admin area") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.isElementPresent(driver.findElement(By.css("i.entypo-user"))).then(function (isPresent) {
    if (!isPresent) {
        driver.quit();
        console.log('verifyElementPresent failed');
    }
});
driver.findElement(By.id("username")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.id("password")).getAttribute('value').then(function (value) {
    if (!_.isEqual(value, )) {
        console.log('verifyElementValue failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Log In") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Forgot password") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("ToS") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Privacy Policy") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});

driver.quit();

*/
