'use strict';

// Import Resources and Libs

// var Email = require('../../notification/email');
// var TextModel = require('../../notification/text');

const SlackDB = require('../../models/SlackDB');
// const Employee = require('../../models/Employee');
// const Appointment = require('../../models/Appointment');

/* handles route for getting the Company's visitor list */

module.exports.createReq = function(req, res) {
  console.log('Hello World');
  const slack = new SlackDB();
  const param = req.body;
    // require provided info
  console.log('Hello World2');

  slack.userid = param.userid;
  slack.slackToken = param.slackToken;
  slack.slackChannel = param.slackChannel;
  slack.date = new Date();
  console.log('Hello World3');

  SlackDB.find(
    {
      userid: param.userid,
    }, (err, slackdb) => {
    if(err) return res.status(400).json({error: 'Could Not Find'});
    if(slackdb.length==0) {
      console.log('Hello World4');

      slack.save((err, a) => {
        if (err) {
          return res.status(400).json({error: 'Could not save the Slack user'});
        }
        console.log('Good?');
        return res.status(200).json(a);
      });
    }else{
      return res.status(400).json({error: 'Already Created'});
    }
  });
};
