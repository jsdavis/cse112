
'use strict';
const log = require('../../../log');

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
const Admin= require('../../models/Admin');

module.exports.login = function(req, res) {
  Admin.findOne({email: req.body.email}, (err, e) => {
    if(err || !e) {
      return res.status(400).send({error: 'Can not Find'});
    }
    if(!e.validPassword(req.body.password))
      return res.status(400).send({error: 'Incorrect Credentials'});
    const adminJson=e.toJSON();
    delete adminJson.password;
    return res.status(200).json(adminJson);
  });
};

module.exports.getAllAdmins = function(req, res) {
  Admin.find({company_id: req.params.id}, {password: 0}, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find'});
    }
    return res.status(200).json(result);
  });
};

// channels
// module.exports.getAllReminders = function(req, res) {
//   Admin.find({company_id: req.params.id}, {password: 0}, (err, result) => {
//     if(err) {
//       return res.status(400).send({error: 'Can not Find'});
//     }
//     return res.status(200).json(result.reminders);
//   });
// };


module.exports.getAllChannels = function(req, res) {
  Admin.find(req.params.id, {password: 0}, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find'});
    }
    return res.status(200).json(result.channels);
  });
};


module.exports.getById = function(req, res) {
  Admin.findById(req.params.id, {password: 0}, (err, admin) => {
    if (err) {
      return res.status(400).json({error: 'Can not Find'});
    } else {
      log.info(admin);
      return res.status(200).json(admin);
    }
  });
};


module.exports.insert = function(req, res) {
  const admin = new Admin();

    /* required info */
  admin.first_name = req.body.first_name;
  admin.last_name = req.body.last_name;
  admin.email = req.body.email;
  admin.phone_number = req.body.phone_number;
  admin.company_id = req.body.company_id;
  admin.password = admin.generateHash(req.body.password);
  admin.role = req.body.role;
  admin.channels = [];
  admin.save((err, e) => {
    if(err) {
      return res.status(400).json({error: 'Can Not Save: ' + err});
    }
    const adminJson=e.toJSON();
    delete adminJson.password;
    return res.status(200).json(adminJson);
  });
};


// channels
module.exports.addChannel = function(req, res) {
  const channelName = req.body.name;
  const id = req.body.id;

  exports.getById(id, (errMsg, admin) => {
    if(errMsg) return res.status(400).json(errMsg);

    admin.first_name = req.body.first_name || admin.first_name;
    admin.last_name = req.body.last_name || admin.last_name;
    admin.email = req.body.email || admin.email;
    admin.phone_number = req.body.phone_number || admin.phone_number;
    admin.password = admin.generateHash(req.body.password) ||
        admin.password;
    admin.role = req.body.role || admin.role;
    if(admin.channels.indexOf(channelName) < 0) {
      admin.channels.push(channelName);
    }

    admin.save((err) => {
      const adminJson=admin.toJSON();
      delete adminJson.password;
      return res.status(200).json(admin);
    });
  });
};


module.exports.update = function(req, res) {
  Admin.findById(req.params.id, (err, admin) => {
    if(err)
      return res.status(400).json({error: 'Can not Update'});

    admin.first_name = req.body.first_name || admin.first_name;
    admin.last_name = req.body.last_name || admin.last_name;
    admin.email = req.body.email || admin.email;
    admin.phone_number = req.body.phone_number || admin.phone_number;
    admin.password = admin.generateHash(req.body.password) ||
      admin.password;
    admin.role = req.body.role || admin.role;

    admin.save((err) => {
      log.warn(err, admin);
      if (err)
        return res.status(400).json({error: 'Can not Save'});
      const adminJson = admin.toJSON();
      delete adminJson.password;
      return res.status(200).send(adminJson);
    });
  });
};

module.exports.delete = function(req, res) {
  admin.findById(req.params.id, (err, admin) => {
    return admin.remove((err) => {
      if(err) {
        res.status(400).json({error: 'Can not Find'});
      } else {
        const adminJson=admin.toJSON();
        delete adminJson.password;
        return res.status(200).send(adminJson);
      }
    });
  });
};

// channels
module.exports.deleteChannel = function(req, res) {
  const channelName = req.body.name;
  const id = req.body.id;

  exports.getById(id, (errMsg, admin) => {
    if(errMsg) return res.status(400).json(errMsg);

    admin.first_name = req.body.first_name || admin.first_name;
    admin.last_name = req.body.last_name || admin.last_name;
    admin.email = req.body.email || admin.email;
    admin.phone_number = req.body.phone_number || admin.phone_number;
    admin.password = admin.generateHash(req.body.password) ||
        admin.password;
    admin.role = req.body.role || admin.role;
    const index = admin.channels.indexOf(channelName);
    admin.channels.splice(index, 1);

    admin.save((err) => {
      const adminJson=admin.toJSON();
      delete adminJson.password;
      return res.status(200).json(admin);
    });
  });
};
