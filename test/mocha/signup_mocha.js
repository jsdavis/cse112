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
    .get("http://localhost:8080/signup.html")
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Bootstrap Multi Step Registration Form Template");
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Step 1/2:");
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Create a company");
      });
    })
    .elementById("form-company-name", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementById("form-email", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementById("form-phone", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Next");
      });
    })
    .elementById("form-company-name", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("form-email", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("form-phone", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("submit-company-btn", function(err, el) {
      b.next('clickElement', el, noop);
    })
    .elementById("form-employee-first", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementById("form-employee-last", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementById("form-employee-email", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementById("form-employee-phone", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementById("form-password", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementById("form-repeat-password", function(err, el) {
      b.getAttribute(el, 'value', function(err, value) {
        expect("" + value).to.contain("" + );
      });
    })
    .elementByTagName('html', function(err, el) {
      b.next('text', el, function(err, text) {
        expect("" + text).to.contain("" + "Next");
      });
    })
    .elementById("form-employee-first", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("form-employee-last", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("form-employee-email", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("form-employee-phone", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("form-password", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("form-repeat-password", function(err, el) {
      b.next('clear', el, function(err) {
        b.next('type', el, "Meep", noop);
      });
    })
    .elementById("submit-btn", function(err, el) {
      b.next('clickElement', el, noop);
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
