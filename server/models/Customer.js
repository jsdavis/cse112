'use strict';

/* Require mongoose to interact with mongoDB */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


/*
 *  customer schema
 */
const customerSchema= mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, unique: true, index: true, required: true},
  password: {type: String, required: true},
  channels: {type: [String], required: false},
  companies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
  reminders: {type: [String], required: false},
  role: {type: String, required: true},
});

// checking if password is valid
customerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// generating a hash
customerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

customerSchema.statics.findCustomer = function(param, callback) {
  // Make it impossible to screw this up
  const id = param.customer_id || param.id || param._id || undefined;
  const email = param.customer_email || param.email || undefined;
  const name = {
    first: param.customer_first_name || param.first_name || param.firstName || param.firstname || undefined,
    last: param.customer_last_name || param.last_name || param.lastName || param.lastname || undefined,
  };

  if (id)
    this.findById(id, callback);

  else if (email)
    this.findOne({
      email: email,
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
      id: id,
    });
};

module.exports = mongoose.model('Customer', customerSchema);
