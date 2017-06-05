const config = require('../../nightwatch.js');

module.exports = {
  'beforeEach': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body');
  },
  'Unlucky Geniuses Assert Title Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .assert.title('Unlucky Geniuses')
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
      .assert.containsText('#main-menu', 'HOME')
			.assert.containsText('#main-menu', 'FEATURES')
			.assert.containsText('#main-menu', 'PRICING')
			.assert.containsText('#main-menu', 'LOGIN')
			.assert.containsText('#main-menu', 'SIGN-UP')
      .end();
  },
  'Unlucky Geniuses Features Text Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#features-sec', 'CUSTOMIZABLE')
			.assert.containsText('#features-sec', 'SLACK')
			.assert.containsText('#features-sec', '24/7 SUPPORT')
      .end();
  },
  'Unlucky Geniuses Pricing Text Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#pricing-opts', 'Free Trial')
			.assert.containsText('#pricing-opts', 'Subscription')
      .end();
  },
  'Unlucky Geniuses Trial Text Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#trial-ad', 'Sign up for a free trial of Emissary now')
			.assert.containsText('#trial-ad', 'SIGN-UP')
      .end();
  },
  'Unlucky Geniuses Testimonials Text Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#testimonials', 'Perfection')
      .end();
  },
  'Unlucky Geniuses Footer Widget Text Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#footer-widget', 'Checking In Made Simple.')
      .end();
  },
  'Unlucky Geniuses Footer Test': function(browser) {
    browser
      .url('http://localhost:8080')
      .assert.containsText('#footer', 'Copyright © Emissary - All Rights Reserved.')
      .waitForElementVisible('body')
      .assert.title('Unlucky Geniuses')
      .end();
  },
  'after': (browser) => browser.end(),
};


