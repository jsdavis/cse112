// employee.js
'use strict';

/* Require mongoose to interact with mongoDB */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const channelSchema = mongoose.Schema({
  name: {type: String, required: true},
});

/*
 * Employee schema
 */
const employeeSchema = mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, unique: true, index: true, required: true},
  password: {type: String, required: true},
  phone_number: {type: String, required: false},
  role: {type: String, required: true},
  channels: {type: [String], default: []},
  company_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
  // reminders: {type: [String], default: []},
});


// const reminderSchema = mongoose.Schema({
//   text: {type: String, required: true},
//   date: {type: Date, required: true},
// })

employeeSchema.statics.findEmployee = function(param, callback) {
  const id = param.employee_id || param.client_id || param.id || param._id || undefined;
  if (id)
    this.findById(id, callback);
  else if (param.email)
    this.findOne({
      email: param.email,
    }, callback);
  else if (param.first_name && param.last_name)
    this.findOne({
      first_name: param.first_name,
      last_name: param.last_name,
    }, callback);
  else
    callback({
      error: 'Bad request for finding customer.',
      message: param,
    });
};

// checking if password is valid
employeeSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// generating a hash
employeeSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = mongoose.model('employee', employeeSchema);
