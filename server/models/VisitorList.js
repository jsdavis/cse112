/**
 * Created by kevingu on 2/23/16.
 */


'use strict';

const mongoose = require('mongoose');
// TODO figure out why I need this
mongoose.models = {};
mongoose.modelSchemas = {};

const Schema = mongoose.Schema;
/*
 * Appointment schema
 */
const appointmentSchema = mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  phone_number: {type: String, required: true},
  date: {type: Date, required: true},
  provider_name: {type: String, required: true},
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
});


const visitorSchema = new Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  phone_number: {type: String, required: true},
  checkin_time: {type: Date, default: Date.now, required: true},
  appointments: {type: [appointmentSchema]},
  additional_info: {},
});


const visitorListSchema = new Schema({
  company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
  visitors: {type: [visitorSchema], default: []},
});

module.exports = mongoose.model('visitorList', visitorListSchema);
