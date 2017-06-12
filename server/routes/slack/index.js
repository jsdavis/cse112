'use strict';

const express = require('express');
const controller = require('./slack.controller');

const router = express.Router();

router.post('/', controller.createReq);
// router.delete('/:id', controller.deleteReq);

module.exports = router;
