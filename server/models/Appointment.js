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


module.exports = mongoose.model('appointment', appointmentSchema);
