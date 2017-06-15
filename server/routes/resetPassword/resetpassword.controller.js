
'use strict';
const log = require('../../../log');
const nodemailer = require('nodemailer');

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */

module.exports.resetPassword = function(req, res) {
  const data = req.body;
  ajaxPostUserEmployee(data);

  return res.status(400).send({error: 'Can not Find'});
};


function ajaxPostUserEmployee(data) {
  $.ajax({
    type: 'GET',
    url: '/api/employees/email/'+data.email,
    data: data,
    dataType: 'json',
    success: function(response) {
      console.log('Hello! employee '+JSON.stringify(response));
    },
    error: function() {
      ajaxPostUserCustomer(data);
    },
  });
}

function ajaxPostUserCustomer(data) {
  $.ajax({
    type: 'GET',
    url: '/api/employees/email/'+data.email,
    data: data,
    dataType: 'json',
    success: function(response) {
      sendEmail();
      location.href = '/api/login';
    },
    error: function() {
      console.log('Hello! Customer '+JSON.stringify(response));

      window.onerror=handleError();
           // location.href = '/login.html';
    },
  });
}
