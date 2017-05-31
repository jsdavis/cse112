const request = require('supertest');
const config = require('../server/config/config');
const AdminUser = require('../server/models/Company');
const Employee = require('../server/models/Employee');

// Employee login feature
function setupEmployee(done) {
  setupAdmin(done, true);
}

function setupAdmin(done) {
  setupUser(done, false);
}

function setupUser(done, isEmployee) {
  const path = isEmployee ? '/api/employees' : '/api/companies';
  const UserModel = isEmployee ? Employee : AdminUser;

  let token;
  let admin;

  // Add random number to email to reduce concurrency issue chances on
  // duplicate unique key errors.
  const email = 'test' + Math.floor(Math.random() * 100000) + '@test.com';
  const password = 'test_password';
  const creditCardNumber='1231231241251';
  const name = 'test';
  const expirationDate='6/17';
  const phoneNumber='1234567890';

  const url = 'localhost:' + config.port;
  request(url)
    .post(path)
    .send({
      email: email,
      password: password,
      credit_card_number: creditCardNumber,
      name: name,
      expiration_date: expirationDate,
      phone_number: phoneNumber,
    })
    .expect(200)
    .end((err, res) => {
      if (err) throw(err);

      res.body.should.have.property('_id');
      login(res.body._id);
    });

  function login(id) {
    request(url)
      .get(path+'/'+id)
      .expect(200)
      .end((err, res) => {
        if (err) throw(err);
        retrieveAdmin();
      });
  }

  function retrieveAdmin() {
    AdminUser.findOne({email: email}, (err, dbAdmin) => {
      if (err) throw(err);

      admin = dbAdmin;
      done({
        admin: admin,
        email: email,
        password: password,
        token: token,
      });
    });
  }
}

function cleanupAuth(email, callback) {
  AdminUser.remove({email: email}, (err) => {
    if (err) throw(err);
    callback();
  });
}

// Employee login feature
function cleanupEmployee(email, callback) {
  Employee.remove({email: email}, (err) => {
    if (err) throw(err);
    callback();
  });
}

module.exports.setupAdmin = setupAdmin;
module.exports.setupEmployee = setupEmployee;
module.exports.cleanupAuth = cleanupAuth;
module.exports.cleanupEmployee = cleanupEmployee;
