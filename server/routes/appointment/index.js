'use strict';

const express = require('express');
const controller = require('./appointment.controller');

const router = express.Router();

router.post('/', controller.create);
router.get('/:id', controller.get);
router.get('/company/:id', controller.getAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
