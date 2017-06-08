'use strict';
const log = require('../../../log');

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
const Customer = require('../../models/Customer');

module.exports.login = function(req, res) {
  Customer.findOne({email: req.body.email}, (err, c) => {
    if(err || !e) {
      return res.status(400).send({error: 'Can not Find'});
    }
    if(!e.validPassword(req.body.password))
      return res.status(400).send({error: 'Incorrect Credentials'});
    const customerJson=c.toJSON();
    delete customerJson.password;
    return res.status(200).json(customerJSon);
  });
};

module.exports.getAllCompanies = function(req, res) {
  Customer.find({customerId: req.params.id}, {password: 0}, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find'});
    }
    return res.status(200).json(result.companies);
  });
};

module.exports.getById = function(req, res) {
  Customer.findById(req.params.id, {password: 0}, (err, customer) => {
    if (err) {
      return res.status(400).json({error: 'Can not Find'});
    } else {
      // log.info(customer);
      return res.status(200).json(customer);
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
