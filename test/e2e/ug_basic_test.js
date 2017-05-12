// const config = require('../../nightwatch.conf.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Unlucky Geniuses Assert Title Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .assert.title('CSE 112 Project 2')
      .end();
  },
  'Unlucky Geniuses Foo Form Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
			.waitForElementVisible('input[name="input"]')
			.setValue('input[name="input"]', 'baz')
			.waitForElementVisible('button[id="fooBtn"]')
			.click('button[id="fooBtn"]')
			.assert.containsText('#form1', 'True')
			.elementIdClear('input[name="input"]')
			.setValue('input[name="input"]', 'baa')
			.waitForElementVisible('button[id="fooBtn"]')
			.click('button[id="fooBtn"]')
			.assert.containsText('#form1', 'False')
      .end();
  },
  'Unlucky Geniuses Time Valid Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
			.waitForElementVisible('input[name="inputValidtime"]')
			.setValue('input[name="inputValidtime"]', '5:24am')
			.waitForElementVisible('button[id="validTimeBtn"]')
			.click('button[id="validTimeBtn"]')
			// .assert.containsText('#formIsValidTime', 'True')
			.elementIdClear('input[name="inputValidtime"]')
			.setValue('input[name="inputValidtime"]', '5:62am')
			.waitForElementVisible('button[id="validTimeBtn"]')
			.click('button[id="validTimeBtn"]')
			.assert.containsText('#formIsValidTime', 'False')
      .end();
  },
  'Unlucky Geniuses Time Formatter Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
			.waitForElementVisible('input[name="timeFormatString"]')
			.setValue('input[name="timeFormatString"]', '5:24am')
			.click('select[id="timeFormatSelector"] option[value="1"]')
			.waitForElementVisible('button[id="formatTimeBtn"]')
			.click('button[id="formatTimeBtn"]')
			// .assert.containsText('#formatTimeRetval', '5')

			.click('select[id="timeFormatSelector"] option[value="2"]')
			.waitForElementVisible('button[id="formatTimeBtn"]')
			.click('button[id="formatTimeBtn"]')
			// .assert.containsText('#formatTimeRetval', '5 Am')

			.click('select[id="timeFormatSelector"] option[value="3"]')
			.waitForElementVisible('button[id="formatTimeBtn"]')
			.click('button[id="formatTimeBtn"]')
			// .assert.containsText('#formatTimeRetval', '5:24')

			.click('select[id="timeFormatSelector"] option[value="4"]')
			.waitForElementVisible('button[id="formatTimeBtn"]')
			.click('button[id="formatTimeBtn"]')
			// .assert.containsText('#formatTimeRetval', '5:24 Am')

			.click('select[id="timeFormatSelector"] option[value="5"]')
			.waitForElementVisible('button[id="formatTimeBtn"]')
			.click('button[id="formatTimeBtn"]')
			// .assert.containsText('#formatTimeRetval', '5:24:00')

			.click('select[id="timeFormatSelector"] option[value="6"]')
			.waitForElementVisible('button[id="formatTimeBtn"]')
			.click('button[id="formatTimeBtn"]')
			// .assert.containsText('#formatTimeRetval', '5:24:00 Am')

			.elementIdClear('input[name="timeFormatString"]')
			.setValue('input[name="timeFormatString"]', '5:62am')
			.click('select[id="timeFormatSelector"] option[value="1"]')
			.waitForElementVisible('button[id="formatTimeBtn"]')
			.click('button[id="formatTimeBtn"]')
			// .assert.containsText('#formatTimeRetval', 'Time Is Invalid')
      .end();
  },

};

/*
module.exports = {
  beforeEach: (browser) => {
    browser
      .url('http://unlucky-geniuses.herokuapp.com')
      .waitForElementVisible('body');
  },
  'Smoke test': (browser) => {
    browser
      .assert.visible('body', 'Check if page has loaded')
      .assert.title('CSE 112 Project 2');
  },
  after: (browser) => browser.end()
};
*/
