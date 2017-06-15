'use strict';
// admin index
const controller = require('./resetpassword.controller');

const express = require('express');
//  const controller = require('./resetPassword.controller');

const router = express.Router();


router.post('/', controller.resetPassword);

module.exports = router;
