const config = require('../../nightwatch.js');

module.exports = {
  'beforeEach': (browser) => {
    browser
      .url('http://localhost:8080/forgot-password.html')
      .waitForElementVisible('body');
  },
  'Unlucky Geniuses Assert Title Test': function(browser) {
    browser
      .url('http://localhost:8080/forgot-password.html')
      .waitForElementVisible('body')
      .assert.title('Emissary | Forgot Password')
      .end();
  },
  'Unlucky Geniuses Login Test': function(browser) {
    browser
      .url('http://localhost:8080/forgot-password.html')
			.waitForElementVisible('input[id="email"]')
			.setValue('input[id="email"]', 'test5@test.com')
			.waitForElementVisible('button[id="send-reset-btn"]')
			.click('button[id="send-reset-btn"]')
      .end();
  },
  'after': (browser) => browser.end(),
};


