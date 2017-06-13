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
  const id = param.customer_id || param.id || param._id || undefined;
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
      id: id,
    });
};

module.exports = mongoose.model('Customer', customerSchema);
