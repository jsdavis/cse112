const config = require('../../nightwatch.js');

module.exports = {
  '@disabled': false,
  'beforeEach': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body');
  },
  'Unlucky Geniuses Assert Title Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .assert.title('One 4m | Home')
      .end();
  },
  'Unlucky Geniuses Logo Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('img')
      .end();
  },
  'Unlucky Geniuses Nav Bar Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#main-menu', 'Home')
			.assert.containsText('#main-menu', 'Login')
			.assert.containsText('#main-menu', 'Sign-Up')
      .end();
  },
  'Unlucky Geniuses Features Text Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#features-sec', 'Customizable')
			.assert.containsText('#features-sec', 'Slack')
			.assert.containsText('#features-sec', '24/7 Support')
      .end();
  },
  'Unlucky Geniuses Pricing Text Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#pricing-opts', 'Free Trial')
			.assert.containsText('#pricing-opts', 'Subscription')
      .end();
  },
  'Unlucky Geniuses Footer Widget Text Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#footer', 'Checking In Made Simple.')
			.assert.containsText('#footer', 'Address')
			.assert.containsText('#footer', 'Contact')
      .end();
  },
  'Unlucky Geniuses Footer Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#footer-cr', 'Copyright © One 4m - All Rights Reserved.')
      .waitForElementVisible('body')
      .assert.title('One 4m | Home')
      .end();
  },
  'after': (browser) => browser.end(),
};


