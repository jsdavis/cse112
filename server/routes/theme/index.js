'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
const express = require('express');
const router = express.Router();
const controller = require('./theme.controller');

// post with default values
router.post('/', controller.template.create);

// get the theme correspond to the company
router.get('/:company_id', controller.template.get);

// Edit, when the company_id save new settings
router.put('/:company_id', controller.template.update);

// Delete, when a user unsuscribed from the service
router.delete('/:company_id', controller.template.delete);

module.exports = router;
