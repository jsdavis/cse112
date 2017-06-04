const config = require('../../nightwatch.js');
num = Math.floor((Math.random() * 100000) + 1);

module.exports = {
  'beforeEach': (browser) => {
    browser
      .url('http://localhost:8080/signup.html')
      .waitForElementVisible('body');
  },
  'Unlucky Geniuses Assert Title Test': function(browser) {
    browser
      .url('http://localhost:8080/signup.html')
      .waitForElementVisible('body')
      .assert.title('Login')
      .end();
  },
  'Unlucky Geniuses Signup Test': function(browser) {
    browser
      .url('http://localhost:8080/signup.html')
      .assert.containsText('#signup-form-one', 'Step 1/2:')
			.waitForElementVisible('input[id="form-company-name"]')
			.setValue('input[id="form-company-name"]', 'Test' + num)
			.waitForElementVisible('input[id="form-email"]')
			.setValue('input[id="form-email"]', 'Test' + num)
			.waitForElementVisible('input[id="form-phone"]')
			.setValue('input[id="form-phone"]', 'Test' + num)
			.waitForElementVisible('button[id="submit-company-btn"]')
			.click('button[id="submit-company-btn"]')
			.waitForElementVisible('input[id="form-employee-first"]')
			.setValue('input[id="form-employee-first"]', 'Test' + num)
			.waitForElementVisible('input[id="form-employee-last"]')
			.setValue('input[id="form-employee-last"]', 'Test' + num)
			.waitForElementVisible('input[id="form-employee-email"]')
			.setValue('input[id="form-employee-email"]', 'Test' + num)
			.waitForElementVisible('input[id="form-employee-phone"]')
			.setValue('input[id="form-employee-phone"]', 'Test' + num)
			.waitForElementVisible('input[id="form-password"]')
			.setValue('input[id="form-password"]', 'Test' + num)
			.waitForElementVisible('input[id="form-repeat-password"]')
			.setValue('input[id="form-repeat-password"]', 'Test' + num)
			.waitForElementVisible('button[id="submit-btn"]')
			.click('button[id="submit-btn"]')
			.assert.urlEquals('http://localhost:8080/visitors.html')
      .end();
  },
  'after': (browser) => browser.end(),
};


