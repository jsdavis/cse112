/**
 * Created by kevingu on 2/21/16.
 */
'use strict';

/* Require mongoose to interact with mongoDB */
const mongoose = require('mongoose');
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
});

appointmentSchema.statics.findAppointment = function(param, callback) {
  const id = param.appointment_id || param.id || param._id || undefined;
  if (id)
    this.findById(id, callback);

  else if (param.first_name && param.last_name && param.start && param.end) {
    Customer.findCustomer(param, (err, customer) => {
      if (err || !customer) {
        Employee.findEmployee(param, (err, employee) => {
          this.findOne({
            client_id: employee._id,
            start: param.start,
            end: param.end,
          }, callback);
        });
      } else {
        this.findOne({
          customer_id: customer._id,
          start: param.start,
          end: param.end,
        }, callback);
      }
    });
  } else
    callback({
      error: 'Bad request for finding appointment.',
      message: param,
    });
};

module.exports = mongoose.model('appointment', appointmentSchema);
