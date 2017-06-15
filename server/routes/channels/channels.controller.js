'use strict';
const log = require('../../../log');
const request = require('request');

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
const SlackDB = require('../../models/SlackDB');
const Customer = require('../../models/Customer');
const Appointment = require('../../models/Appointment');
const AppointmentContr = require('../appointment/appointment.controller.js');
const CustomerContr = require('../customer/customer.controller.js');

// const apiai = require('apiai');
// const apiaiApp = apiai('a0569614aa254d96a49d6068db16a718');

module.exports.getSlackInfo = function(req, res) {
  SlackDB.findOne({userid: req.params.userid}, (err, a) => {
    if(err || !a) {
      return res.status(400).send({error: 'Could Not Find'});
    }
    return res.status(200).json(a);
  });
};

module.exports.addSlackInfo = function(req, res) {
  const slackInfo = SlackDB();
  const param = req.params;
  slackInfo.userid = param.userid;
  slackInfo.slackToken = param.slackToken;
  slackInfo.date = new Date();

  if(param.slackChannel.slice(0, 1)=='@')
    slackInfo.slackChannel = param.slackChannel;
  else
    slackInfo.slackChannel = '#'+param.slackChannel;

  slackInfo.save((err) => {
    if (err)
      return res.status(500).json({
        error: 'Saving the slackInfo failed',
        param: param,
        message: err.message,
      });

    res.status(200).json(slackInfo);
  });
};

module.exports.modifySlackInfo = function(req, res) {
  const param = req.params;

  SlackDB.findOne({userid: param.userid}, (err, slackInfo) => {
    if(err || !slackInfo)
      return res.status(400).send({error: 'Could Not Find'});

    slackInfo.date = new Date();
    if(param.slackChannel)
      if(param.slackChannel.slice(0, 1)=='@')
        slackInfo.slackChannel = param.slackChannel;
      else
        slackInfo.slackChannel = '#'+param.slackChannel;
    if(param.userid)
      slackInfo.userid = param.userid;
    if(param.slackToken)
      slackInfo.slackToken = param.slackToken;

    slackInfo.save((err) => {
      if (err)
        return res.status(500).json({
          error: 'Saving the slack info failed',
          param: req.body,
          message: err.message,
        });
      return res.status(200).json(slackInfo);
    });
  });
};

module.exports.deleteSlackInfo = function(req, res) {
  SlackDB.findOne({userid: req.params.userid}, (err, slackInfo) => {
    if(err || !slackInfo)
      return res.status(400).send({error: 'Could Not Find'});

    slackInfo.remove((err) => {
      if (err)
        return res.status(500).json({
          error: 'Could not save',
          param: req.body,
          message: err.message,
        });
      return res.status(200).json(slackInfo);
    });
  });
};

module.exports.chatBotPostResponse = function(req, res) {
  const param = req.body.result;


  const action = param.action;
  if (action == 'createAppointment') {
    const p = param.parameters;
    req.body = {
      start: new Date(p.date + ' ' + p.start_time),
      end: new Date(p.date + ' ' + p.end_time),
      extras: p.extras,
      customer_email: p.email,
      firstname: p.firstname,
      lastname: p.lastname,
    };
    AppointmentContr.create(req, res);
  }
  // var request = apiaiApp.textRequest('<Your text query>', {
  // let req = apiaiApp.textRequest('<Your text query>', {
  //     sessionId: '<unique session id>'
  // });

  // req.on('response', function(response) {
  //     console.log(response);
  // });

  // req.on('error', function(error) {
  //     console.log(error);
  // });

  // req.end();
};

