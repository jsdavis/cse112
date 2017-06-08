'use strict';

const express = require('express');
const controller = require('./channels.controller');

const router = express.Router();

// GET for list of appointments
router.get('/appointments/customer/:id', controller.getCustomerAppointments);
router.get('/appointments/company/:id', controller.getCompanyAppointments);

// POST/PUT/DELETE for managing appointments
/*
router.post('/appointments/', controller.addAppointment);
  Added to /api/appointments/ POST. Accepts JSON as follows:
    {
      start: date,
      end: date,
      first_name: optional. if given, need last_name as well,
      last_name: optional. if given, need first_name as well,
      customer_id: alternative to first_name and last_name,
      company_name: optional. can give company_id instead,
      company_id: optional. can give company_name instead
    }
*/
router.put('/appointments/:id', controller.updateAppointment);
router.delete('/appointments/:id', controller.deleteAppointment);

// PUT for checking in. Accepts an appointmentId
router.put('/checkin/:id', controller.checkIn);

// GET/POST/DELETE for managing companies I'm registered with
// router.get('/customer/companies', controller.getRegisteredCompanies);
// router.post('/customer/companies', controller.registerCompany);
// router.delete('/customer/companies', controller.deregisterCompany);

// GET/POST/DELETE for managing channels I'm registered with
// router.get('/customer/channels', controller.getChannels);
// router.post('/customer/channels', controller.registerChannel);
// router.delete('/customer/channels', controller.deregisterChannel);

// GET/POST/DELETE for managing reminder channels
router.get('/customer/reminders', controller.getReminders);
router.post('/customer/reminders', controller.addReminder);
router.delete('customer/reminders', controller.deleteReminder);

module.exports = router;
