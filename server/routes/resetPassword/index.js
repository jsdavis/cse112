'use strict';
// admin index


const express = require('express');
const controller = require('./resetPassword.controller');

const router = express.Router();


router.get('/', controller.resetPassword);

module.exports = router;
