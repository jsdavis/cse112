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

driver.get("http://localhost:8080/index.html");
driver.isElementPresent(driver.findElement(By.css("img"))).then(function (isPresent) {
    if (!isPresent) {
        driver.quit();
        console.log('verifyElementPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("HOME") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("FEATURES") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("LOGIN") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("SIGN-UP") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("CUSTOMIZABLE") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("SLACK") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("24/7 SUPPORT") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Free Trial") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Subscription") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Sign up for a free trial of Emissary now") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("SIGN-UP") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Perfection.") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.isElementPresent(driver.findElement(By.xpath("//section[@class='footer-widgets']/div/div/div[1]/a/img"))).then(function (isPresent) {
    if (!isPresent) {
        driver.quit();
        console.log('verifyElementPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Checking In Made Simple.") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});
driver.findElement(By.tagName('html')).getText().then(function (text) {
    var hasText = text.indexOf("Copyright © Emissary - All Rights Reserved.") !== -1;
    if (!hasText) {
        driver.quit();
        console.log('verifyTextPresent failed');
    }
});

driver.quit();

*/
