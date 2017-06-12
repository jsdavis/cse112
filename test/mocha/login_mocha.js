/*
var wd = require('wd'),
    chai = require('chai'),
    expect = chai.expect,
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid-js');

var VARS = {};

// This assumes that selenium is running at http://127.0.0.1:4444/wd/hub/
var noop = function() {},
    b = wd.remote();

describe('Selenium Test Case', function() {

  this.timeout(60000);

  it('should execute test case without errors', function(done) {

    b.chain(function(err) {
      done(err);
    })
    .init({
      browserName: 'firefox'
    })
    .get("http://localhost:8080/login.html")
    .hasElement(CssSelector,"img", function(err, bool) {
      expect(bool).to.equal(true);
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Dear user, log in to access the admin area");
      });
    })
    .hasElement(CssSelector,"i.entypo-user", function(err, bool) {
      expect(bool).to.equal(true);
    })
    .elementById("username", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementById("password", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Log In");
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Forgot password");
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "ToS");
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Privacy Policy");
      });
    })
    .close(function(err) {
      done(err);
    });

  });
});

afterEach(function() {
  b.quit();
});

*/
