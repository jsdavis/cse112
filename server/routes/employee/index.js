// employee index

'use strict';

const express = require('express');
const controller = require('./employee.controller');

const router = express.Router();

router.get('/company/:id', controller.getAllEmployees);
router.get('/:id', controller.getById);
router.post('/', controller.insert);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/login', controller.login);

// Channels
router.get('/:id/channels/', controller.getAllChannels);
// router.get(':id/channels/reminders', controller.getAllReminders);
router.put('/:id/channels/add/:name', controller.addChannel);
router.put('/:id/channels/remove/:name', controller.deleteChannel);

module.exports = router;
