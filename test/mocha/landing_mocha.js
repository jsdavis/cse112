/*
const wd = require('wd');
const chai = require('chai');
const expect = chai.expect;
const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid-js');

const VARS = {};

// This assumes that selenium is running at http://127.0.0.1:4444/wd/hub/
let noop = function() {},
  b = wd.remote();

describe('Selenium Test Case', function() {
  this.timeout(60000);

  it('should execute test case without errors', (done) => {
    b.chain((err) => {
      done(err);
    })
    .init({
      browserName: 'firefox',
    })
    .get('http://localhost:8080/index.html')
    .hasElement(CssSelector, 'img', (err, bool) => {
      expect(bool).to.equal(true);
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'HOME');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'FEATURES');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'LOGIN');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'SIGN-UP');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'CUSTOMIZABLE');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'SLACK');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + '24/7 SUPPORT');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'Free Trial');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'Subscription');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'Sign up for a free trial of Emissary now');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'SIGN-UP');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'Perfection.');
      });
    })
    .hasElement(XPath, '//section[@class=\'footer-widgets\']/div/div/div[1]/a/img', (err, bool) => {
      expect(bool).to.equal(true);
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'Checking In Made Simple.');
      });
    })
    .elementByTagName('html', (err, el) => {
      b.next('text', el, (err, text) => {
        expect('' + text).to.contain('' + 'Copyright © Emissary - All Rights Reserved.');
      });
    })
    .close((err) => {
      done(err);
    });
  });
});

afterEach(() => {
  b.quit();
});
*/
