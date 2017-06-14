/**
 * Created by kevingu on 2/12/16.
 */
// load the things we need

const mongoose = require('mongoose');

// define the schema for our user model
const companySchema = mongoose.Schema({
  name: {type: String, required: true},
  adminUser: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}],
});

companySchema.statics.findCompany = function(param, callback) {
  const id = param.company_id || param.id || param._id || undefined;
  if (id)
    this.findById(param.company_id, callback);

  else if (param.company_name)
    this.findOne({
      name: param.company_name,
    }, callback);

  else
    callback({
      error: 'Bad request for finding company.',
      message: param,
    });
};

module.exports = mongoose.model('Company', companySchema);
