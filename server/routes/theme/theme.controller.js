'use strict';
const log = require('../../../log');

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */

const Theme = require('../../models/Theme');

/** ********************* THEME TEMPLATE ROUTES ***********************/
module.exports.template = {};

module.exports.template.use = function(req, res, next) {
  // do logging
  log.info('Intializing theme controller.....');
  next();
};

module.exports.template.create = function(req, res) {
  const theme = new Theme();
  theme.company_id = req.params.company_id;
  theme.form_color = req.params.form_color;
  theme.elements = req.params.elements;

  theme.save((err) => {
    if (err)
      res.status(400).send(err);

    res.status(200).json(theme);
  });
};

module.exports.template.get = function(req, res) {
  Theme.findOne({
    company_id: req.params.company_id,
  }, (err, theme) => {
    if (err)
      res.status(400).send(err);

    res.status(200).json(theme);
  });
};

module.exports.template.update = function(req, res) {
  Theme.findOne({
    company_id: req.params.company_id,
  }, (err, theme) => {
    if (err)
      res.status(400).send(err);

    theme.company_id = req.body.company_id;
    if (req.body.form_color)
      theme.form_color = req.body.form_color;
    if (req.body.elements)
      theme.elements = req.body.elements;

    theme.save((err) => {
      if (err)
        res.status(400).send(err);

      res.status(200).json(theme);
    });
  });
};

module.exports.template.delete = function(req, res) {
  Theme.remove({
    company_id: req.params.company_id,
  }, (err, theme) => {
    if (err)
      res.status(400).send(err);

    res.status(200).json({msg: 'OK'});
  });
};
