// admin.js
'use strict';

/* Require mongoose to interact with mongoDB */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const channelSchema = mongoose.Schema({
  name: {type: String, required: true},
});

/*
 * admin schema
 */
const adminSchema = mongoose.Schema({
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

adminSchema.statics.findAdmin = function(param, callback) {
  // Make it impossible to screw this up
  const id = param.admin_id || param.client_id || param.id || param._id || undefined;
  const email = param.admin_email || param.client_email || param.email || undefined;
  const name = {
    first: param.first_name || param.firstName || param.firstname || undefined,
    last: param.last_name || param.lastName || param.lastname || undefined,
  };

  if (id)
    this.findById(id, callback);

  else if (email)
    this.findOne({
      email: param.email,
    }, callback);

  else if (name.first && name.last)
    this.findOne({
      first_name: name.first,
      last_name: name.last,
    }, callback);
  else
    callback({
      error: 'Bad request for finding customer.',
      message: param,
    });
};

// checking if password is valid
adminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// generating a hash
adminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = mongoose.model('admin', adminSchema);
