/**
 * Created by kevingu on 2/21/16.
 */
const request = require('supertest');
const config = require('../server/config/config');
const Appointment = require('../server/models/Appointment');
const Company = require('../server/models/Company');
const should = require('chai').should();

describe('Appointment Test', () => {
  const url = 'localhost:' + config.port;
  let token;
  let currAppointment;
  let currCompany;

    // old appointment info
  const firstName = 'test';
  const lastName = 'test';
  const date='2016-04-23T18:25:43.511Z';
  const providerName = 'test test';

    // new appointment info
  const newFirstName = 'test1';
  const newLastName = 'test1';
  const newPhoneNumber='1231267890';
  const newDate='2016-03-23T18:25:43.511Z';
  const newProviderName = 'test1 test1';

    // company info
  const email = 'new@test.edu';
  const creditCardNumber='1231231241251';
  const name = 'test';
  const expirationDate='6/17';
  const phoneNumber='1234567890';

  const userID = null;


  before((done) => {
        // setup company
    const company = new Company();
    company.email = email;
    company.credit_card_number = creditCardNumber;
    company.name = name;
    company.expiration_date = expirationDate;
    company.phone_number = phoneNumber;
    company.paid_time=new Date();

    company.save((err, c) => {
      currCompany=c;
      request(url)
                .post('/api/appointments')
                .send(
        {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          date: date,
          company_id: currCompany._id,
          provider_name: providerName,
        }
                )
                .expect(200)
                .end((err, res) => {
                  res.body.should.have.property('_id');
                  currAppointment=res.body;
                  done();
                });
    });
  });


  it('should not create the appointment', (done) => {
    request(url)
            .post('/api/appointments')
            .send(
      {
        first_name: newFirstName,
        last_name: newLastName,
        phone_number: newPhoneNumber,
        date: newDate,
        company_id: currCompany._id,
        provider_name: newProviderName,
      }
            )
            .expect(400)
            .end((err, res) => {
              res.should.have.property('error');
              done();
            });
  });

  it('should get appointment', (done) => {
    request(url)
            .get('/api/appointments/'+currAppointment._id)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('_id');
              done();
            });
  });

  it('should not get appointment', (done) => {
    request(url)
            .get('/api/appointments/'+0)
            .expect(400)
            .end((err, res) => {
              console.log(res.body);
              res.body.should.have.property('error');
              done();
            });
  });


  it('should get all appointments', (done) => {
    request(url)
            .get('/api/appointments/company/'+currCompany._id)
            .expect(200)
            .end((err, res) => {
              res.body.should.be.an.instanceof(Array);
              done();
            });
  });

  it('should update appointment', (done) => {
    request(url)
            .put('/api/appointments/'+currAppointment._id)
            .send(
      {
        first_name: newFirstName,
        last_name: newLastName,
        phone_number: newPhoneNumber,
        date: newDate,
        provider_name: newProviderName,
      }
            )
            .expect(200)
            .end((err, res) => {
              if(err)
                throw(err);
              res.body.should.have.property('first_name');
              res.body.first_name.should.equal(newFirstName);
              res.body.should.have.property('last_name');
              res.body.last_name.should.equal(newLastName);
              res.body.should.have.property('phone_number');
              res.body.phone_number.should.equal(newPhoneNumber);
              res.body.should.have.property('date');
              res.body.date.should.equal(newDate);
              res.body.should.have.property('provider_name');
              res.body.provider_name.should.equal(newProviderName);
              done();
            });
  });

  it('should delete appointment', (done) => {
    request(url)
            .delete('/api/appointments/'+currAppointment._id)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('_id');
              Appointment.find({_id: currAppointment._id}, (err, _) => {
                // should.equal(err, null);
                should.exist(err);
                done();
              });
            });
  });

  after((done) => {
    Company.remove({email: email}, (err, c) => {
      done();
    });
  });
});
