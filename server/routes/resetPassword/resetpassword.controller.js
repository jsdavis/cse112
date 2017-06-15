
'use strict';
const config = require('../../config/config.js');
const log = require('../../../log');
const nodemailer = require('nodemailer');
const path = require('path');
const templatesDir = path.resolve(__dirname, '.', 'mailer');
const emailTemplates = require('email-templates');

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */

const EmailAddressRequiredError = new Error('email address required');

// create a defaultTransport using gmail and authentication that are
// stored in the `config.js` file.
const defaultTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.mailer.auth.user,
    pass: config.mailer.auth.pass,
  },
});

module.exports.resetPassword = function(req, res) {
  const data = req.body;
  console.log('lnjkbwhjgv');
  console.log(JSON.stringify(data));
  const locals = {
    email: data.email,
    subject: 'One Form: Reset your password',
    name: 'Forgetful User',
    resetUrl: 'http;//localhost:3000/password_rest/000000000001|afdaevdae353',
  };
  sendOne('password_reset', locals, (errorCode) => {
    if(!errorCode) {
      return res.status(400).send(data);
    }
    return res.status(200).send(data);
  });
};


function sendOne(templateName, locals, callback) {
	// make sure that we have an user email
  if (!locals.email) {
    callback(false);
  }
	// make sure that we have a message
  if (!locals.subject) {
    callback(false);
  }
  emailTemplates(templatesDir, (err, template) => {
    if (err) {
      callback(false);
    }
	// Send a single email
    template(templateName, locals, (err, html, text) => {
      if (err) {
        callback(false);
      }
		// if we are testing don't send out an email instead return
		// success and the html and txt strings for inspection

      const transport = defaultTransport;
      transport.sendMail({
        from: config.mailer.defaultFromAddress,
        to: locals.email,
        subject: locals.subject,
        html: html,
			// generateTextFromHTML: true,
        text: text,
      }, (err, responseStatus) => {
        if (err) {
          callback(false);
        }
        callback(true);
      });
    });
  });
}
