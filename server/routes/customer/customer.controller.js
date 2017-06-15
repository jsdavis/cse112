'use strict';
const log = require('../../../log');

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
const Customer = require('../../models/Customer');

module.exports.login = function(req, res) {
  console.log(req.body.email + ' ' + req.body.password);
  Customer.findOne({email: req.body.email}, (err, c) => {
    if(err || !c) {
      return res.status(400).send({error: 'Can not Find'});
    }
    if(!c.validPassword(req.body.password))
      return res.status(400).send({error: 'Incorrect Credentials'});
    const customerJson=c.toJSON();
    delete customerJson.password;
    return res.status(200).json(customerJson);
  });
};

// TODO!! CHANGE TO RETURN COMPANY NAMES
module.exports.getAllCompanies = function(req, res) {
  const param = req.body;

  Customer.findCustomer(param, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find Customer ' + param.id});
    }
    return res.status(200).json(result.companies);
  });
};

module.exports.registerCompany = function(req, res) {
  const param = req.body;
  const company = param.company_name;

  // check to make sure param has something we need

  Customer.findCustomer(param, (err, customerRes) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find Customer ' + param.id});
    }
    const companies = customerRes.companies;

    Company.findCompany(param, (err, companyRes) => {
      if(err) {
        return res.status(400).send({error: 'Can not Find Company ' + company});
      }
      if(companies.indexOf(companyRes.id) < 0) {
        companies.push(companyRes.id);
      }
    });
    customerRes.save((err, c) => {
      if(err) {
        return res.status(400).json({error: 'Can Not Save: ' + err});
      }
      const customerJson=c.toJSON();
      return res.status(200).json(customerJson);
    });
  });
};


module.exports.deleteCompany = function(req, res) {
  const param = req.body;
  const companyName = param.company_name;

  Customer.findCustomer(param, (err, customerRes) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find Customer ' + param.id});
    }

    const companies = customerRes.companies;

    Company.findCompany(param, (err, companyRes) => {
      if(err) {
        return res.status(400).send({error: 'Can not Find Company ' + company});
      }
      if(companies.indexOf(companyRes.id) < 0) {
        res.status(400).send({error: 'Can not delete company' + companyName + ' since it is not registered'});
      } else {
        companies.splice(companies.indexOf(companyRes.id), 1);
      }
    });

    customerRes.save((err, c) => {
      if(err) {
        return res.status(400).json({error: 'Can Not Save: ' + err});
      }
      const customerJson=c.toJSON();
      return res.status(200).json(customerJson);
    });
  });
};


module.exports.getAllChannels = function(req, res) {
  Customer.findCustomer(req.body, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find'});
    }
    return res.status(200).json(result.channels);
  });
};

module.exports.registerChannel = function(req, res) {
  const param = req.body;
  const channel = param.channel;

  Customer.findCustomer(param, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find Customer ' + param.id});
    }
    if(result.channels.indexOf(channel) < 0) {
      result.channels.push(channel);

      result.save((err, c) => {
        if(err) {
          return res.status(400).json({error: 'Can Not Save: ' + err});
        }
        const customerJson=c.toJSON();
        return res.status(200).json(customerJson);
      });
    }
    return res.status(200).json(result.channels);
  });
};

module.exports.deleteChannel = function(req, res) {
  const param = req.body;
  const channel = param.channel;


  Customer.findCustomer(param, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find Customer ' + param.id});
    }
    if(result.channels.indexOf(channel) < 0) {
      res.status(400).send({error: 'Can not delete channel' + channel + ' since it is not registered'});
    } else {
      result.channels.splice(result.channels.indexOf(channel), 1);
      result.save((err, c) => {
        if(err) {
          return res.status(400).json({error: 'Can Not Save: ' + err});
        }
        const customerJson=c.toJSON();
        return res.status(200).json(customerJson);
      });
    }
    return res.status(200).json(result.channels);
  });
};


module.exports.getById = function(req, res) {
  Customer.findById(req.params.id, (err, customer) => {
    if (err) {
      return res.status(400).json({error: 'Can not Find'});
    } else {
      // log.info(customer);
      return res.status(200).json(customer);
    }
  });
};

module.exports.getByEmail = function(req, res) {
  Customer.findOne({email: req.params.email}, (err, customer) => {
    if (err || !customer) {
      return res.status(400).json({error: 'Can not Find'});
    } else {
      // log.info(customer);
      return res.status(200).json(showCompanyPublicInfo(customer));
    }
  });
};

module.exports.insert = function(req, res) {
  const customer = new Customer();

    /* required info */
  customer.first_name = req.body.first_name;
  customer.last_name = req.body.last_name;
  customer.email = req.body.email;
  customer.phone_number = req.body.phone_number;
  customer.company_id = req.body.company_id;
  customer.password = customer.generateHash(req.body.password);
  customer.role = req.body.role;

  customer.save((err, c) => {
    if(err) {
      return res.status(400).json({error: 'Can Not Save: ' + err});
    }
    const customerJson=c.toJSON();
    delete customerJson.password;
    return res.status(200).json(customerJson);
  });
};


module.exports.update = function(req, res) {
  Employee.findById(req.params.id, (err, customer) => {
    if(err)
      return res.status(400).json({error: 'Can not Update'});

    customer.first_name = req.body.first_name || customer.first_name;
    customer.last_name = req.body.last_name || customer.last_name;
    customer.email = req.body.email || customer.email;
    customer.phone_number = req.body.phone_number || customer.phone_number;
    customer.password = customer.generateHash(req.body.password) ||
      customer.password;
    customer.role = req.body.role || customer.role;

    customer.save((err) => {
      log.warn(err, customer);
      if (err)
        return res.status(400).json({error: 'Can not Save'});
      const customerJson= customer.toJSON();
      delete customerJson.password;
      return res.status(200).send(customerJson);
    });
  });
};

module.exports.delete = function(req, res) {
  Customer.findById(req.params.id, (err, customer) => {
    return customer.remove((err) => {
      if(err) {
        res.status(400).json({error: 'Can not Find'});
      } else {
        const customerJson=customer.toJSON();
        delete customerJson.password;
        return res.status(200).send(customerJson);
      }
    });
  });
};

function showCustomerPublicInfo(c) {
  return {
    _id: c._id,
    first_name: c.first_name,
    last_name: c.last_name,
    email: c.email,
    channels: c.channels,
    companies: c.companies,
    role: c.role,
  };
}
