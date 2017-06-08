'use strict';
const log = require('../../../log');

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
const Employee = require('../../models/Employee');

module.exports.getAllEmployees = function(req, res) {
  Employee.find({company_id: req.params.id}, {password: 0}, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find'});
    }
    return res.status(200).json(result);
  });
};

module.exports.getById = function(req, res) {
  Employee.findById(req.params.id, {password: 0}, (err, employee) => {
    if (err) {
      return res.status(400).json({error: 'Can not Find'});
    } else {
      // log.info(employee);
      return res.status(200).json(employee);
    }
  });
};

module.exports.insert = function(req, res) {
  const employee = new Employee();

    /* required info */
  employee.first_name = req.body.first_name;
  employee.last_name = req.body.last_name;
  employee.email = req.body.email;
  employee.phone_number = req.body.phone_number;
  employee.company_id = req.body.company_id;
  employee.password = employee.generateHash(req.body.password);
  employee.role = req.body.role;

  employee.save((err, e) => {
    if(err) {
      return res.status(400).json({error: 'Can Not Save: ' + err});
    }
    const employeeJson=e.toJSON();
    delete employeeJson.password;
    return res.status(200).json(employeeJson);
  });
};


module.exports.update = function(req, res) {
  Employee.findById(req.params.id, (err, employee) => {
    if(err)
      return res.status(400).json({error: 'Can not Update'});

    employee.first_name = req.body.first_name || employee.first_name;
    employee.last_name = req.body.last_name || employee.last_name;
    employee.email = req.body.email || employee.email;
    employee.phone_number = req.body.phone_number || employee.phone_number;
    employee.password = employee.generateHash(req.body.password) ||
      employee.password;
    employee.role = req.body.role || employee.role;

    employee.save((err) => {
      log.warn(err, employee);
      if (err)
        return res.status(400).json({error: 'Can not Save'});
      const employeeJson = employee.toJSON();
      delete employeeJson.password;
      return res.status(200).send(employeeJson);
    });
  });
};

module.exports.delete = function(req, res) {
  Employee.findById(req.params.id, (err, employee) => {
    return employee.remove((err) => {
      if(err) {
        res.status(400).json({error: 'Can not Find'});
      } else {
        const employeeJson=employee.toJSON();
        delete employeeJson.password;
        return res.status(200).send(employeeJson);
      }
    });
  });
};
