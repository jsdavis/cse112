var config = require('../../nightwatch.conf.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Guinea Pig Assert Title': function(browser) {
    browser
      .url('https://unlucky-geniuses.appspot.com/')
      .waitForElementVisible('body')
      .assert.title('CSE 112 Project 1')
			.waitForElementVisible('input[name="input"]')
			.setValue('input[name="input"]', 'baz')
      .end();
  }
};
