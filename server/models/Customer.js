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
  phone_number: {type: String, required: true},
  role: {type: String, required: true},
  // company_id: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
  company_id: {type: String, required: true},
  companies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
});

// checking if password is valid
customerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// generating a hash
customerSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// module.exports = mongoose.model('Customer', employeeSchema);
