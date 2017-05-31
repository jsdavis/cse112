/* This test relies on removed features
 * -Reebal

const request = require('supertest');
const config = require('../server/config/config');

// Wrapper that creates admin user to allow api calls
const ConfigureAuth = require('./ConfigureAuth');
const Employee = require('../server/models/Employee');

const Email = require('../notification/email');
const TextModel = require('../notification/text');

// SAMPLE : [{phone_number: "XXX-XXX-XXXX", email: "XXXXX@XXXXX.com"}];
const employees = [];

describe.skip('Notification', () => {
  it('It should send an email', (done) => {
    this.timeout(9000);
    Email.sendEmail('Tony Montana', employees, done);
    done();
  });

  it('It should send an text', (done) => {
    this.timeout(9000);
    TextModel.sendText('Tony Montana', employees, done);
    done();
  });
});
*/
