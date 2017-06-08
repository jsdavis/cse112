/**
 * Created by kevingu on 2/12/16.
 */
// load the things we need

const mongoose = require('mongoose');

// define the schema for our user model
const companySchema = mongoose.Schema({
  email: {type: String, unique: true, index: true, required: true},
  name: {type: String, required: true},
  phone_number: {type: String, required: true},
  paid_time: {type: Date, required: true},
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Company', companySchema);

customerSchema.statics.findCompany = function(param, callback) {
  if (param.id)
    this.findById(param.id, callback);
  else if (param.company_name) {
    this.findOne({name: param.company_name}, callback);
  }
};

module.exports = mongoose.model('Company', companySchema);
