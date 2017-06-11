/**
 * Created by kevingu on 2/21/16.
 */
const request = require('supertest');
const config = require('../server/config/config');
const Appointment = require('../server/models/Appointment');
const Company = require('../server/models/Company');
const Customer = require('../server/models/Customer');
const should = require('chai').should();

describe('Appointment Test', () => {
  const url = 'localhost:' + config.port;
  let token;
  let currAppointment;
  let currCustomer;
  let currCompany;
  let cust_id;
  let c_id;

  // appointment info
  const firstName = 'test';
  const lastName = 'test';
  const start = new Date();
  const end = new Date();
  const checkedIn = false;
  const providerNameExtra = 'test test';

  // customer info
  const customer = new Customer();
  const customerFirstName = 'customer_name';
  const customerLastName = 'customer_last_name';
  const customerEmail = 'customer_test@ucsd.edu';
  const customerPassword = 'customer_password';
  const customerChannels = ['facebook', 'slack'];
  const customerCompanies = ['test'];
  const customerReminders = ['meet up at 1']; 

  // new appointment info
  const newFirstName = 'test1';
  const newLastName = 'test1';
  const newStart = new Date();
  const newEnd = new Date();
  const newCheckedIn = true;
  const newProviderNameExtra = 'test1 test1';

  // company info
  const email = 'verynew@test.edu';
  const name = 'test';
  const phoneNumber = '1234567890';
  const paidTime = new Date();

  const userID = null;

  before((done) => {
    // setup company
    const company = new Company();
    company.email = email;
    company.name = name;
    company.phone_number = phoneNumber;
    company.paid_time = new Date();

    company.save((err, c) => {
      currCompany = c;
      // setup customer
      const customer = new Customer();
      customer.first_name = customerFirstName;
      customer.last_name = customerLastName;
      customer.email = customerEmail;
      customer.phone_number = phoneNumber;
      customer.company_id = currCompany._id;
      customer.password = customerPassword;
      customer.role = 'customer';

      customer.save((err, cust) => {
        currCustomer = cust;
        request(url)
          .post('/api/appointments')
          .send({
            first_name: firstName,
            last_name: lastName,
            start: start,
            end: end,
            checked_in: checkedIn,
            company_id: currCompany._id,
            customer_id: currCustomer._id,
            extras: providerNameExtra
          })
          .expect(200)
          .end((err, res) => {
console.log("currCompany " + currCompany);
console.log("currCustomer " + currCustomer);
//            res.body.should.have.property('_id');
            currAppointment = res.body;
console.log("currAppointment " + res.body);
            done();
          });
      });
    });
  });
/*
  it('should not create the appointment', (done) => {
    request(url)
      .post('/api/appointments')
      .send({
        first_name: newFirstName,
        last_name: newLastName,
        start: newStart,
        end: newEnd,
        checked_in: newCheckedIn,
        company_id: currCompany._id,
        customer_id: currCustomer._id,
        extras: providerNameExtra
      })
      .expect(400)
      .end((err, res) => {
        res.should.have.property('error');
        done();
      });
  });
*/

  it('should get appointment', (done) => {
    request(url)
      .get('/api/appointments/'+currAppointment._id)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('_id');
        done();
      });
  });
/*
  it('should not get appointment', (done) => {
    request(url)
      .get('/api/appointments/'+0)
      .expect(400)
      .end((err, res) => {
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
      .send({
        first_name: newFirstName,
        last_name: newLastName,
        phone_number: newPhoneNumber,
        date: newDate,
        provider_name: newProviderName,
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw(err);

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
        Appointment.find({_id: currAppointment._id}, (err, result) => {
          should.not.exist(err);
          result.should.be.empty;
          done();
        });
      });
  });
*/
  after((done) => {
    Company.remove({email: email}, (err, c) => {
      done();
    });
  });
});
