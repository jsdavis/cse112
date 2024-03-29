const chai = require('chai');
const should = chai.should();
const Theme = require('../server/models/Theme');
const config = require('../server/config/config');
const ConfigureAuth = require('./ConfigureAuth.js');
const request = require('supertest');

// Schema Test
describe('Theme Settings Model', () => {
  it('should create(POST) a new setting', (done) => {
    const theme = new Theme({
      user_id: 'test', // company or user id
      form_color: 'default',
      background_img: 'default',
      displayPhone: false,
      displayClock: false,
      displaySignature: false,
      additionalComments: false,
    });
    theme.save(done);
  });

  it.skip('should GET theme setting', (done) => {
    Theme.findOne({
      user_id: 'test',
    },
    (err, theme) => {
      if (err) return done(err);

      theme.background_img.should.equal('default');
      theme.form_color.should.equal('default');
      theme.displayClock.should.equal(false);
      theme.displayPhone.should.equal(false);
      theme.displaySignature.should.equal(false);
      theme.additionalComments.should.equal(false);
      done();
    });
  });

  it('should update(PUT) theme setting', (done) => {
    Theme.findOne({
      user_id: 'test',
    },
    (err, theme) => {
      theme.user_id = 'test'; // company or user id
      theme.form_color = 'default';
      theme.background_img = 'default';
      theme.displayPhone = false;
      theme.displayClock = true;
      theme.displaySignature = false;
      theme.additionalComments = true;

      theme.save((err) => {
        if (err) return done(err);

        theme.background_img.should.equal('default');
        theme.form_color.should.equal('default');
        theme.displayClock.should.equal(true);
        theme.displayPhone.should.equal(false);
        theme.displaySignature.should.equal(false);
        theme.additionalComments.should.equal(true);
        done();
      });
    });
  });

  it.skip('should remove(DELETE) theme setting', (done) => {
    Theme.remove({
      user_id: 'test',
    },
    (err, theme) => {
      if (err) return done(err);

      theme.should.equal(1);
      done();
    });
  });
});

// Route Tests need to be changed to work with auth

describe('Themes Route Test', () => {
  let credentials;  // variable to hold all the need authentication variables.

  // before function is called at the very beginning of the 'Forms' test suite,
  // no tests are run until the done() callback is called.
  before((done) => {
    // setupAdmin will create and admin and log you in, give it a callback that will give you
    // the credentials you need. Make sure to call done() inside ConfigureAuth's callback!
    ConfigureAuth.setupAdmin((cred) => {
      credentials = cred;
      done();
    });
  });

  describe('POST /api/:user_id/theme', () => {
    it('should respond with theme info for respective user_id settings that were created for first time user', (done) => {
      const url = 'localhost:' + config.port;
      const _userID = '1';
      const _formColor = 'default';
      const _backgroundImg = 'default';
      const _displayPhone = false;
      const _displayClock = false;
      const _displaySignature = false;
      const _additionalComments = false;

      request(url)
        .post('/api/' + _userID + '/theme')
        .query({email: credentials.email, token: credentials.token})
        .send({
          form_color: _formColor,
          background_img: _backgroundImg,
          displayPhone: _displayPhone,
          displayClock: _displayClock,
          displaySignature: _displaySignature,
          additionalComments: _additionalComments,
        })
        .end((err, res) => {
          res.body.should.have.property('user_id');
          res.body.should.have.property('form_color');
          res.body.should.have.property('background_img');
          res.body.should.have.property('displayPhone');
          res.body.should.have.property('displayClock');
          res.body.should.have.property('displaySignature');
          res.body.should.have.property('additionalComments');

          res.body.user_id.should.equal(_userID);
          res.body.form_color.should.equal(_formColor);
          res.body.background_img.should.equal(_backgroundImg);
          res.body.displayPhone.should.equal(_displayPhone);
          res.body.displayClock.should.equal(_displayClock);
          res.body.displaySignature.should.equal(_displaySignature);
          res.body.additionalComments.should.equal(_additionalComments);

          done();
        });
    });
  });

  describe('GET /api/:user_id/theme', () => {
    it('should respond with theme info for respective user_id', (done) => {
      const url = 'localhost:' + config.port;
      const userID = '1';
      request(url)
        .get('/api/' + userID + '/theme')
        .query({email: credentials.email, token: credentials.token})
        .end((err, res) => {
          res.body.should.have.property('_id');
          res.body.should.have.property('additionalComments');
          res.body.should.have.property('user_id');
          res.body.should.have.property('form_color');
          res.body.should.have.property('background_img');
          res.body.should.have.property('displayPhone');
          res.body.should.have.property('displayClock');
          res.body.should.have.property('displaySignature');

          done();
        });
    });
  });


  describe('PUT /api/:user_id/theme', () => {
    it('should respond with theme info for respective user_id settings that were updated', (done) => {
      const url = 'localhost:' + config.port;
      const _userID = '1';
      const _formColor = '1';
      const _backgroundImg = '1';
      const _displayPhone = false;
      const _displayClock = false;
      const _displaySignature = false;
      const _additionalComments = false;

      request(url)
        .put('/api/' + _userID + '/theme')
        .query({email: credentials.email, token: credentials.token})
        .send({
          form_color: _formColor,
          background_img: _backgroundImg,
          displayPhone: _displayPhone,
          displayClock: _displayClock,
          displaySignature: _displaySignature,
          additionalComments: _additionalComments,
        })
        .end((err, res) => {
          res.body.should.have.property('user_id');
          res.body.should.have.property('form_color');
          res.body.should.have.property('background_img');
          res.body.should.have.property('displayPhone');
          res.body.should.have.property('displayClock');
          res.body.should.have.property('displaySignature');
          res.body.should.have.property('additionalComments');

          res.body.user_id.should.equal(_userID);
          res.body.form_color.should.equal(_formColor);
          res.body.background_img.should.equal(_backgroundImg);
          res.body.displayPhone.should.equal(_displayPhone);
          res.body.displayClock.should.equal(_displayClock);
          res.body.displaySignature.should.equal(_displaySignature);
          res.body.additionalComments.should.equal(_additionalComments);

          done();
        });
    });
  });

  describe('DELETE /api/:user_id/theme', () => {
    it('should respond with successful delete', (done) => {
      const url = 'localhost:' + config.port;
      const userID = '1';
      request(url)
        .delete('/api/' + userID + '/theme')
        .query({email: credentials.email, token: credentials.token})
        .expect(200)
        .end((err, res) => {
          res.body.should.have.property('msg');
          done();
        });
    });
  });

  after((done) => {
    // give cleanupAuth the email of the admin user it created earlier.
    ConfigureAuth.cleanupAuth(credentials.email, done);
  });
});
