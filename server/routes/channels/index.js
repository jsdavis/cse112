'use strict';

const express = require('express');
const controller = require('./channels.controller');

const router = express.Router();

router.get('/company/:id', controller.getAllEmployees);
router.get('/:id', controller.getById);
router.post('/', controller.insert);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/login', controller.login);

module.exports = router;
