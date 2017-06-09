'use strict';

const express = require('express');
const controller = require('./customer.controller');

const router = express.Router();

router.get('/company/:id', controller.getAllCustomers);
router.get('/:id', controller.getById);
router.post('/', controller.insert);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/login', controller.login);


router.get('/companies', controller.getAllCompanies);
router.post('/companies', controller.registerCompany);
router.delete('/companies', controller.deleteCompany);

router.get('/channels', controller.getAllChannels);
router.post('/channels', controller.registerChannel);
router.delete('/channels', controller.deleteChannel);

module.exports = router;
