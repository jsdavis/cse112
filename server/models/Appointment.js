/**
 * Created by kevingu on 2/21/16.
 */
'use strict';

/* Require mongoose to interact with mongoDB */
const async = require('async');
const mongoose = require('mongoose');
const Customer = require('./Customer');
const Employee = require('./Employee');
const Schema = mongoose.Schema;
/*
 * Appointment schema
 */

const appointmentSchema = mongoose.Schema({
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  checked_in: {type: Boolean, default: false},
  client_id: {type: Schema.Types.ObjectId, ref: 'Employee', required: true},
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
  customer_id: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  extras: {type: Object, required: false},
  customer_first_name: {type: String, required: true},
  customer_last_name: {type: String, required: true},
  employee_first_name: {type: String, required: true},
  employee_last_name: {type: String, required: true},
  company_name: {type: String, required: true},
});

appointmentSchema.statics.findAppointment = function(param, callback) {
  const id = param.appointment_id || param.id || param._id || undefined;

  if (id)
    this.findById(id, callback);

  else
    async.parallel([
      (cb) => {
        if (param.customer_email) {
          Customer.findOne({email: param.customer_email}, (err, cust) => {
            if (err || !cust) cb();
            param.customer_first_name = cust.first_name;
            param.customer_last_name = cust.last_name;
            cb();
          });
          delete param.customer_email;
        }
      },
      (cb) => {
        if (param.employee_email) {
          Employee.findOne({email: param.employee_email}, (err, emp) => {
            if (err || !emp) cb();
            param.employee_first_name = emp.first_name;
            param.employee_last_name = emp.last_name;
            cb();
          });
          delete param.employee_email;
        }
      },
      (err, results) => {
        this.findOne(param, callback);
      },
    ]);
};

module.exports = mongoose.model('appointment', appointmentSchema);
