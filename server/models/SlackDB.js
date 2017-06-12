/**
 * Created by kevingu on 2/21/16.
 */
'use strict';

/* Require mongoose to interact with mongoDB */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
 * Slack schema
 */

// TODO add last and first name field
const slackSchema = mongoose.Schema({
  userid: {type: String, required: true},
  slackToken: {type: String, required: true},
  slackChannel: {type: String, required: true},
  date: {type: Date, required: true},
});


module.exports = mongoose.model('SlackDB', slackSchema);
