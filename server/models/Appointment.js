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
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
  customer_id: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  extras: {type: Object, required: false},
});

appointmentSchema.statics.findAppointment = function(param, callback) {
  if (param.appointment_id)
    this.findById(param.appointment_id, callback);
  else if (param.id)
    this.findById(param.id, callback);
  else if (param.first_name && param.last_name && param.start && param.end)
    this.findOne({
      first_name: param.first_name,
      last_name: param.last_name,
      start: param.start,
      end: param.end,
    }, callback);
  else
    callback({
      error: 'Bad request for finding appointment.',
      message: param,
    });
};

module.exports = mongoose.model('appointment', appointmentSchema);
