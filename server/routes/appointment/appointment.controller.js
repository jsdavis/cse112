'use strict';

const Appointment = require('../../models/Appointment');
const Company = require('../../models/Company');
const Customer = require('../../models/Customer');

/** **** Company TEMPLATE ROUTES ******/
module.exports = {};

module.exports.create = function(req, res) {
  const appointment = new Appointment();
  const param = req.body;

  // require provided info
  appointment.phone_number = param.phone_number;
  appointment.start = param.start;
  appointment.end = param.end;
  appointment.extras = param.extras;

  if (param.customer_id)
    appointments.customer_id = param.customer_id;
  else {
    Customer.find({
      first_name: param.first_name,
      last_name: param.last_name,
    }, (err, customers) => {
      if (err)
        return res.status(400).json({
          error: 'Could not find customer ' + param.first_name + ' ' + param.last_name,
          message: err.message,
        });

      else if (customers.length > 1) {
        return res.status(400).json({
          error: 'There are multiple customers with that name.',
        });
      } else {
        appointment.customer_id = customers[0]._id;
      }
    });
  }

  Appointment.find(
    {
      company_id: param.company_id,
      date: param.date,
    }, (err, appointments) => {
    if(err) return res.status(400).json({error: 'Could Not Find'});
    if(appointments.length==0) {
      appointment.save((err, a) => {
        if (err)
          return res.status(400).json({error: 'Could Not Save'});
        return res.status(200).json(a);
      });
    }else{
      return res.status(400).json({error: 'Already Created'});
    }
  });
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
    if(err || !a)
      return res.status(400).send({error: 'Could Not Find'});
    return res.status(200).json(a);
  });
};

module.exports.update = function(req, res) {
  Appointment.findOne({_id: req.params.id}, (err, a) => {
    if(err || !a)
      return res.status(401).json({error: 'Could Not Find'});

    if (req.body.first_name !== undefined)
      a.first_name = req.body.first_name;

    if (req.body.last_name !== undefined)
      a.last_name = req.body.last_name;

    if (req.body.phone_number !== undefined)
      a.phone_number = req.body.phone_number;

    if (req.body.date!== undefined)
      a.date = req.body.date;
    if (req.body.provider_name!== undefined)
      a.provider_name = req.body.provider_name;
        // TODO check if the date is taken already
    a.save((err) => {
      if(err) {
        return res.status(400).json({error: 'Could Not Save'});
      }
      return res.status(200).json(a);
    });
  });
};

module.exports.delete = function(req, res) {
  Appointment.findById(req.params.id, (err, a) => {
    if(err)
      res.status(400).json({error: 'Could Not Find'});
    a.remove((err) => {
      if(err) {
        res.status(400).json({error: 'Could Not Save'});
      } else {
        return res.status(200).json(a);
      }
    });
  });
};
