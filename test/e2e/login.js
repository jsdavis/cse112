const config = require('../../nightwatch.js');

module.exports = {
  'beforeEach': (browser) => {
    browser
      .url('http://localhost:8080/login.html')
      .waitForElementVisible('body');
  },
  'Unlucky Geniuses Assert Title Test': function(browser) {
    browser
      .url('http://localhost:8080/login.html')
      .waitForElementVisible('body')
      .assert.title('Emissary | Login')
      .end();
  },
  'Unlucky Geniuses Login Test': function(browser) {
    browser
      .url('http://localhost:8080/login.html')
			.waitForElementVisible('input[id="username"]')
			.setValue('input[id="username', 'test')
			.waitForElementVisible('input[id="password"]')
			.setValue('input[id="password"]', 'test')
			.waitForElementVisible('button[id="loginButton"]')
			.click('button[id="loginButton"]')
			.assert.urlEquals('http://localhost:8080/visitors.html')
      .end();
  },
  'after': (browser) => browser.end(),
};


