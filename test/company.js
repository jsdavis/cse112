const request = require('supertest');
const config = require('../server/config/config');
const Company = require('../server/models/Company');
const should = require('chai').should();

describe('Company Test', () => {
  const url = 'localhost:' + config.port;
  let token;
  let currCompany;

  const email = 'testies@test.edu';
  const name = 'test';
  const expirationDate='6/17';
  const phoneNumber='1234567890';

  const newEmail = 'testies1@test.edu'; ;
  const newName = 'test1';
  const newExpirationDate='3/19';
  const newPhoneNumber='1231267890';


  const userID = null;


  before((done) => {
    request(url)
            .post('/api/companies')
            .send({
              email: email,
              name: name,
              phone_number: phoneNumber,
            })
            .expect(200)
            .end((err, res) => {
              if(err)
                throw(err);
              res.body.should.have.property('_id');
              currCompany=res.body;
              done();
            });
  });


  it('should not create the company', (done) => {
    request(url)
            .post('/api/companies')
            .send(
      {
        email: email,
        name: name,
        expiration_date: expirationDate,
        phone_number: phoneNumber,
      })
            .expect(400)
            .end((err, res) => {
              res.should.have.property('error');
              done();
            });
  });

  it('should get company', (done) => {
    request(url)
            .get('/api/companies/'+currCompany._id)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('_id');
              done();
            });
  });

  it('should not get company', (done) => {
    request(url)
            .get('/api/companies/'+0)
            .expect(400)
            .end((err, res) => {
              console.log(res.body);
              res.body.should.have.property('error');
              done();
            });
  });


  it('should get all companies', (done) => {
    request(url)
            .get('/api/companies')
            .expect(200)
            .end((err, res) => {
              res.body.should.be.an.instanceof(Array);
              res.body.should.have.length.of.at.least(1);
              done();
            });
  });

  it('should update company', (done) => {
    request(url)
            .put('/api/companies/'+currCompany._id)
            .send(
      {
        email: newEmail,
        name: newName,
        phone_number: newPhoneNumber,
      }
            )
            .expect(200)
            .end((err, res) => {
              if(err)
                throw(err);
              res.body.should.have.property('email');
              res.body.email.should.equal(newEmail);
              res.body.should.have.property('name');
              res.body.name.should.equal(newName);
              res.body.should.have.property('phone_number');
              res.body.phone_number.should.equal(newPhoneNumber);
              done();
            });
  });

  it('should delete company', (done) => {
    request(url)
            .delete('/api/companies/'+currCompany._id)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('_id');
              Company.find({_id: currCompany._id}, (err, _) => {
                // should.exist(err);
                should.equal(err, null);
                done();
              });
            });
  });

  after((done) => {
    done();
  });
});
