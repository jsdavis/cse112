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
  role: {type: String, required: true},
  // reminders: {type: [String], default: []},
});


// const reminderSchema = mongoose.Schema({
//   text: {type: String, required: true},
//   date: {type: Date, required: true},
// })

employeeSchema.statics.findEmployee = function(param, callback) {
  // Make it impossible to screw this up
  const id = param.employee_id || param.client_id || param.id || param._id || undefined;
  const email = param.employee_email || param.client_email || param.email || undefined;
  const name = {
    first: param.employee_first_name || param.first_name || param.firstName || param.firstname || undefined,
    last: param.employee_last_name || param.last_name || param.lastName || param.lastname || undefined,
  };
  console.log(email);

  if (id)
    this.findById(id, callback);

  else if (email)
    this.findOne({
      email: param.email,
    }, callback);

  else if (name.first && name.last)
    this.findOne({
      first_name: {$regex: new RegExp(name.first, 'i')},
      last_name: {$regex: new RegExp(name.last, 'i')},
    }, callback);
  else
    callback({
      error: 'Bad request for finding employee.',
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
module.exports = mongoose.model('Employee', employeeSchema);
