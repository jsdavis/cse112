'use strict';

// monggose set up
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for user theme settings
const ThemeSchema = new Schema({
  user_id: String,
  form_color: String,
  elements: [{
    type: String,
    label: String
  }]
});

// Export schema
module.exports = mongoose.model('Theme', ThemeSchema);
