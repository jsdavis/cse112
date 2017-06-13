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

  // require provided info
  appointment.start = param.start;
  appointment.end = param.end;
  appointment.extras = param.extras;

  async.series([
    // Get the customer id
    (callback) => {
      Customer.findCustomer(param, (err, customer) => {
        if (err || !customer)
          return res.status(400).json({
            error: 'Could not find customer ' + param.first_name + ' ' + param.last_name,
            message: err,
          });

        else
          appointment.customer_id = customer._id;

        callback();
      });
    },
    // Get the company id
    (callback) => {
      Company.findCompany(param, (err, company) => {
        if (err || !company)
          return res.status(400).json({
            error: 'Could not find company ' + param.company_name,
            message: err,
          });

        else
          appointment.company_id = company._id;

        callback();
      });
    },
    // Get the client id
    (callback) => {
      Employee.findEmployee(param, (err, employee) => {
        if (err || !employee)
          return res.status(400).json({
            error: 'Could not find employee ' + param.first_name + ' ' + param.last_name,
            message: err,
          });

        else
          appointment.client_id = employee._id;

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

        res.status(200).json(appointment);
      });
    },
  ]);
};

module.exports.getAll = function(req, res) {
  Appointment.find({company_id: req.params.id}, (err, result) => {
    if(err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(result);
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
