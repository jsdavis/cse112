const request = require('supertest');

const config = require('../server/config/config');
const Company = require('../server/models/Company');
const Appointment = require('../server/models/Appointment');
const VisitorList = require('../server/models/VisitorList');

const should = require('chai').should();

describe('VisitorList', () => {
  const url = 'localhost:' + config.port;

  let currCompany;
  let currVisitorList;
  let appointment1;
  let appointment2;
  let visitor1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrowDate = new Date();
  const tomorrow = tomorrowDate.setDate(today.getDate()+2);

    // info for the company
  const companyInfo = {
    email: 'tests@test.edu',
    credit_card_number: '1231231241251',
    name: 'tests',
    expiration_date: '6/17',
    phone_number: '1234567890',
    paid_time: new Date(),
  };

    // info for first visitor
  const firstVisitorInfo = {
    first_name: 'test1',
    last_name: 'test1',
    phone_number: '1234567890',
    checkin_time: new Date(),
    additional_info: {
      allergies: 'peanuts',
    },
  };

    // info for second visitor
  const secondVisitorInfo = {
    first_name: 'test2',
    last_name: 'test2',
    phone_number: '1234567890',
    checkin_time: new Date(),
    additional_info: {
      allergies: 'seafood',
    },
  };

    // info for visitor_one's appointment
  const firstAppointmentInfo = {
    first_name: firstVisitorInfo.first_name,
    last_name: firstVisitorInfo.last_name,
    phone_number: firstVisitorInfo.phone_number,
    date: new Date(),
    provider_name: 'provider1',
  };

    // info for visitor_two's appointment
  const secondAppointmentInfo = {
    first_name: secondVisitorInfo.first_name,
    last_name: secondVisitorInfo.last_name,
    phone_number: secondVisitorInfo.phone_number,
    date: tomorrow,
    provider_name: 'provider2',
  };


  before((done) => {
    currCompany = new Company();
    currCompany.email = companyInfo.email;
    currCompany.credit_card_number = companyInfo.credit_card_number;
    currCompany.name = companyInfo.name;
    currCompany.expiration_date = companyInfo.expiration_date;
    currCompany.phone_number = companyInfo.phone_number;
    currCompany.paid_time = companyInfo.paid_time;
    currCompany.save((err, c) => {
      if(err) throw(err);
      currCompany = c;
      appointment1 = new Appointment();
      appointment1.first_name = firstAppointmentInfo.first_name;
      appointment1.last_name = firstAppointmentInfo.last_name;
      appointment1.phone_number = firstAppointmentInfo.phone_number;
      appointment1.date = firstAppointmentInfo.date;
      appointment1.company_id = c._id;
      appointment1.provider_name = firstAppointmentInfo.provider_name;
      appointment1.save((err, a1) => {
        console.log(err);
        if(err) throw(err);
        appointment1=a1;
        appointment2 = new Appointment();
        appointment2.first_name = secondAppointmentInfo.first_name;
        appointment2.last_name = secondAppointmentInfo.last_name;
        appointment2.phone_number = secondAppointmentInfo.phone_number;
        appointment2.date = secondAppointmentInfo.date;
        appointment2.company_id = c._id;
        appointment2.provider_name = secondAppointmentInfo.provider_name;
        appointment2.save((err, a2) => {
          if(err) throw(err);
          appointment2=a2;
          done();
        });
      });
    });
  });


  it('should add vistitors to list', (done) => {
    request(url)
        .post('/api/visitorLists')
        .send({
          company_id: currCompany._id,
          first_name: firstVisitorInfo.first_name,
          last_name: firstVisitorInfo.last_name,
          phone_number: firstVisitorInfo.phone_number,
          checkin_time: firstVisitorInfo.checkin_time,
          additional_info: firstVisitorInfo.additional_info,
        })
        .expect(200)
        .end((err, res) => {
          if(err) throw(err);
          res.body.should.have.property('_id');
          res.body.should.have.property('visitors');
          const visitors = res.body.visitors;
          visitors.should.have.length.of(1);
          visitor1 = visitors[0];

          visitor1.should.have.property('_id');
          visitor1.should.have.property('company_id');
          visitor1.should.have.property('first_name');
          visitor1.should.have.property('last_name');
          visitor1.should.have.property('phone_number');
          visitor1.should.have.property('checkin_time');

          visitor1.should.have.property('appointments');
          visitor1.appointments.should.be.an.instanceof(Array);
          visitor1.appointments.should.have.length.of(1);

          visitor1.should.have.property('additional_info');
          visitor1.additional_info.should.have.property('allergies');


          currVisitorList=res.body;
            // adding second visitor
          request(url)
                .post('/api/visitorLists')
                .send({
                  company_id: currCompany._id,
                  first_name: secondVisitorInfo.first_name,
                  last_name: secondVisitorInfo.last_name,
                  phone_number: secondVisitorInfo.phone_number,
                  checkin_time: secondVisitorInfo.checkin_time,
                  additional_info: secondVisitorInfo.additional_info,
                })
                .expect(200)
                .end((err, res) => {
                  if(err) throw(err);
                  const visitors = res.body.visitors;
                  visitors.should.have.length.of(2);
                  const visitor2 = visitors[0];
                  visitor2.should.have.property('appointments');
                  visitor2.appointments.should.be.an.instanceof(Array);
                  visitor2.appointments.should.have.length.of(1);
                  done();
                });
        });
  });


  it('should get visitor list', (done) => {
    // this.timeout(8000);
    request(url)
            .get('/api/visitorLists/company/'+currCompany._id)
            .send()
            .expect(200)
            .end((err, res) => {
              should.exist(res.body.visitors);
              res.body.visitors.should.be.an.instanceof(Array);
              res.body.visitors.should.have.length.of(2);
              done();
            });
  });

  it('should not get visitor list', (done) => {
    // this.timeout(8000);
    request(url)
            .get('/api/visitorLists/company/0')
            .send()
            .expect(404)
            .end((err, res) => {
              console.log(res.body);
              res.body.should.have.property('error');
              done();
            });
  });

  it('should delete specified Visitor', (done) => {
    request(url)
            .get('/api/visitorLists/company/'+currCompany._id)
            .end((err, res) => {
              let prevLen=0;
              let patientId;
              res.body.should.have.property('visitors');
              res.body.visitors.should.be.an.instanceof(Array);
              for(let i=0; i< res.body.visitors.length; i++) {
                prevLen++;
                patientId=res.body.visitors[i]._id;
              }
              request(url)
                    .delete('/api/visitorLists/company/'+currCompany._id
                        +'/visitor/'+visitor1._id)
                    .expect(200)
                    .end((err, res) => {
                      should.exist(res.body);
                      res.body.visitors.should.be.an.instanceof(Array);
                      res.body.visitors.should.have.length.of(prevLen-1);
                      done();
                    });
            });
  });

  it('should clear visitorLists', (done) => {
    // this.timeout(8000);
    request(url)
            .delete('/api/visitorLists/'+currVisitorList._id)
            .expect(200)
            .end((err, res) => {
              res.body.should.have.property('visitors');
              res.body.visitors.should.have.length.of(0);
              done();
            });
  });


  after((done) => {
    Appointment.remove({_id: appointment1._id}, (err, _) => {
      if(err) throw(err);
      Appointment.remove({_id: appointment2._id}, (err, _) => {
        if(err) throw(err);
        Company.remove({_id: currCompany._id}, (err, _) => {
          if(err) throw(err);
                    // done();
          VisitorList.remove({_id: currVisitorList._id}, (err, _) => {
            if(err) throw(err);
            done();
          });
        });
      });
    });
  });
}
);
