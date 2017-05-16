'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to theme settings
 */
const express = require('express');
const router = express.Router();
const controller = require('./theme.controller');

// post with default values
router.post('/:user_id/theme', controller.template.create);

// get the theme correspond to the user
router.get('/:user_id/theme', controller.template.get);

// Edit, when the user save new settings
router.put('/:user_id/theme', controller.template.update);

// Delete, when a user unsuscribed from the service
router.delete('/:user_id/theme', controller.template.delete);

module.exports = router;
