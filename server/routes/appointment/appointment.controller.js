'use strict';

const async = require('async');
const Appointment = require('../../models/Appointment');
const Company = require('../../models/Company');
const Customer = require('../../models/Customer');
const Employee = require('../../models/Employee');

/** **** Company TEMPLATE ROUTES ******/
module.exports = {};

module.exports.create = function(req, res) {
  const appointment = new Appointment();
  const param = req.body;

  let customer = null;
  let employee = null;

  // require provided info
  appointment.start = new Date(param.start);
  appointment.end = new Date(param.end);
  appointment.extras = param.extras;

  async.series([
    // Get the customer id
    (callback) => {
      Customer.findCustomer(param, (err, cust) => {
        if (err || !cust)
          return res.status(400).json({
            error: 'Could not find customer.',
            message: err,
            param: param,
          });

        customer = cust;
        appointment.customer_id = customer._id;
        appointment.customer_first_name = customer.first_name;
        appointment.customer_last_name = customer.last_name;
        callback();
      });
    },
    // Get the client id
    (callback) => {
      Employee.findEmployee(param, (err, emp) => {
        if (err || !emp)

          return res.status(400).json({
            error: 'Could not find employee ' + param.first_name + ' ' + param.last_name,
            message: err,
            param: param,
            return: emp,
          });

        console.log('Params: '+JSON.stringify(param));
        employee = emp;
        appointment.client_id = employee._id;
        appointment.employee_first_name = employee.first_name;
        appointment.employee_last_name = employee.last_name;
        callback();
      });
    },
    // Get the company id
    (callback) => {
      console.log('Employee is: '+JSON.stringify(employee));
      Company.findCompany(employee, (err, company) => {
        if (err || !company)
          return res.status(400).json({
            error: 'Could not find company.',
            message: err,
            param: param,
            employee: employee,
          });

        /* TODO: Have customers register for certain companies
        // Workaround for weird typing errors with id's
        const companies = customer.companies.map((comp) => {
          return '' + comp;
        });

        if (!companies.includes('' + company._id))
          return res.status(400).json({
            error: 'Customer ' + customer.first_name + ' ' + customer.last_name + ' is not registered with company ' + company.name,
            param: param,
          });
        */

        console.log('Company is: ' +JSON.stringify(company));
        appointment.company_id = company._id;
        appointment.company_name = company.name;
        callback();
      });
    },
    // Save the appointment to the database
    (callback) => {
      appointment.save((err) => {
        if (err)
          return res.status(500).json({
            error: 'Saving the appointment failed',
            param: param,
            message: JSON.stringify(err),
          });

        // Give response that API.ai can handle
        const text = 'Successfully created appointment for ' + customer.first_name + ' ' + customer.last_name + ' with ' + employee.first_name + ' ' + employee.last_name + ' from ' + appointment.start + ' to ' + appointment.end;

        res.status(200).json({
          speech: text,
          displayText: text,
          data: appointment,
        });
      });
    },
  ]);
};

module.exports.getAll = function(req, res) {
  Appointment.find({company_id: req.params.id}, (err, appointments) => {
    if (err || !appointments)
      return res.status(400).json({
        error: 'Failed to find any appointments associated with that company',
        message: err,
        param: req.params.id,
      });

    return res.status(200).json(appointments);
  });
};

module.exports.get = function(req, res) {
  Appointment.findOne({_id: req.params.id}, (err, a) => {
    if (err || !a)
      return res.status(400).send({
        error: 'Could not find appointment with id ' + req.params.id,
        params: req.params,
        message: err,
      });
    return res.status(200).json(a);
  });
};

module.exports.update = function(req, res) {
  if (req.params.id)
    req.body.find.id = req.params.id;

  Appointment.findAppointment(req.body.find, (err, appointment) => {
    if (err)
      return res.status(400).json({
        error: 'Could not find appointment.',
        message: err.message,
        param: req.body,
      });

    if (req.body.first_name)
      appointment.first_name = req.body.first_name;

    if (req.body.last_name)
      appointment.last_name = req.body.last_name;

    if (req.body.company_id)
      appointment.company_id = req.body.company_id;

    if (req.body.customer_id)
      appointment.customer_id = req.body.customer_id;

    if (req.body.checked_in)
      appointment.checked_in = req.body.checked_in;

    if (req.body.extras)
      appointment.extras = appointment.extras;

    // TODO: Check validity of date
    if (req.body.start)
      appointment.start = req.body.start;
    if (req.body.end)
      appointment.end = req.body.end;

    appointment.save((err) => {
      if (err)
        return res.status(500).json({
          error: 'Saving the appointment failed',
          param: req.body,
          message: err.message,
        });

      return res.status(200).json(appointment);
    });
  });
};

module.exports.delete = function(req, res) {
  if (req.params.id)
    req.body.find.id = req.params.id;

  Appointment.findAppointment(req.body.find, (err, appointment) => {
    if (err)
      return res.status(400).json({
        error: 'Could not find appointment.',
        message: err.message,
        param: req.body,
      });

    appointment.remove((err) => {
      if (err)
        return res.status(500).json({
          error: 'Could not save',
          param: req.body,
          message: err.message,
        });

      return res.status(200).json(appointment);
    });
  });
};

module.exports.checkin = function(req, res) {
  if (req.params.id)
    req.body.find.id = req.params.id;

  Appointment.findAppointment(req.body.find, (err, appointment) => {
    if (err)
      res.status(400).json({
        error: 'Could not find appointment.',
        message: err.message,
        param: req.body,
      });
    appointment.checked_in = true;
    appointment.save((err) => {
      if (err)
        return res.status(500).json({
          error: 'Saving the appointment failed',
          message: err.message,
        });

      return res.status(200).json(appointment);
    });
  });
};
