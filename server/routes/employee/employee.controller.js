
'use strict';
const log = require('../../../log');

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
const Employee = require('../../models/Employee');

module.exports.login = function(req, res) {
  Employee.findOne({email: req.body.email}, (err, e) => {
    if(err || !e) {
      return res.status(400).send({error: 'Can not Find'});
    }
    if(!e.validPassword(req.body.password))
      return res.status(400).send({error: 'Incorrect Credentials'});
    const employeeJson=e.toJSON();
    delete employeeJson.password;


    return res.status(200).json(employeeJson);
  });
};

module.exports.getAllEmployees = function(req, res) {
  // if(req.body.userType != 'employee_admin') {
  //   res.redirect('/api/visitorList/company/'+req.params.company_id);
  // }
  Employee.find({company_id: req.params.id}, {password: 0}, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find'});
    }
    return res.status(200).json(result);
  });
};

// channels
// module.exports.getAllReminders = function(req, res) {
//   Employee.find({company_id: req.params.id}, {password: 0}, (err, result) => {
//     if(err) {
//       return res.status(400).send({error: 'Can not Find'});
//     }
//     return res.status(200).json(result.reminders);
//   });
// };


module.exports.getAllChannels = function(req, res) {
  Employee.find(req.params.id, {password: 0}, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'Can not Find'});
    }
    return res.status(200).json(result.channels);
  });
};


module.exports.getById = function(req, res) {
  Employee.findById(req.params.id, {password: 0}, (err, employee) => {
    if (err) {
      return res.status(400).json({error: 'Can not Find'});
    } else {
      // log.info(employee);
      return res.status(200).json(employee);
    }
  });
};

module.exports.getByEmail = function(req, res) {
  Employee.findById({email: req.params.email}, (err, employee) => {
    if (err) {
      return res.status(400).json({error: 'Can not Find'});
    } else {
      // log.info(employee);
      return res.status(200).json(employee);
    }
  });
};

module.exports.insert = function(req, res) {
  const employee = new Employee();
  let params = req.body;
  if (req.body.company_name != undefined) {
    params = req.body.adminUser;
    console.log(JSON.stringify(params));
  }

  employee.first_name = params.first_name;
  employee.last_name = params.last_name;
  employee.email = params.email;
  employee.phone_number = params.phone_number;
  employee.company_id = params.company_id;
  employee.password = employee.generateHash(params.password);
  employee.role = params.role;
  employee.channels = [];

  employee.save((err, e) => {
    if(err) {
      return res.status(400).json({error: 'Can Not Save: ' + err});
    }
    const employeeJson=e.toJSON();
    delete employeeJson.password;
    console.log('Successfully added adming employee!!!');
    return res.status(200).json(employeeJson);
  });
};


// channels
module.exports.addChannel = function(req, res) {
  const obj = {};

  const channelName = req.params.name;
  const id = req.params.id;
  obj.params = {};
  obj.params.id =id;

  exports.getById(obj, (errMsg, employee) => {
    if(errMsg) return res.status(400).json(errMsg);

    employee.first_name = req.body.first_name || employee.first_name;
    employee.last_name = req.body.last_name || employee.last_name;
    employee.email = req.body.email || employee.email;
    employee.phone_number = req.body.phone_number || employee.phone_number;
    employee.password = employee.generateHash(req.body.password) ||
        employee.password;
    employee.role = req.body.role || employee.role;
    console.log('in here!!!');
    if(employee.channels.indexOf(channelName) < 0) {
      console.log('An here!!'+employee.channels);
      employee.channels.push(channelName);
    }

    employee.save((err) => {
      const employeeJson=employee.toJSON();
      delete employeeJson.password;
      return res.status(200).json(employee);
    });
  });
};


module.exports.update = function(req, res) {
  Employee.findById(req.params.id, (err, employee) => {
    if(err)
      return res.status(400).json({error: 'Can not Update'});

    employee.first_name = req.body.first_name || employee.first_name;
    employee.last_name = req.body.last_name || employee.last_name;
    employee.email = req.body.email || employee.email;
    employee.phone_number = req.body.phone_number || employee.phone_number;
    employee.password = employee.generateHash(req.body.password) ||
      employee.password;
    employee.role = req.body.role || employee.role;

    employee.save((err) => {
      log.warn(err, employee);
      if (err)
        return res.status(400).json({error: 'Can not Save'});
      const employeeJson = employee.toJSON();
      delete employeeJson.password;
      return res.status(200).send(employeeJson);
    });
  });
};

module.exports.delete = function(req, res) {
  Employee.findById(req.params.id, (err, employee) => {
    return employee.remove((err) => {
      if(err) {
        res.status(400).json({error: 'Can not Find'});
      } else {
        const employeeJson=employee.toJSON();
        delete employeeJson.password;
        return res.status(200).send(employeeJson);
      }
    });
  });
};

// channels
module.exports.deleteChannel = function(req, res) {
  const obj = {};
  const channelName = req.params.name;
  const id = req.params.id;
  obj.params.id =id;

  exports.getById(id, (errMsg, employee) => {
    if(errMsg) return res.status(400).json(errMsg);

    employee.first_name = employee.first_name;
    employee.last_name = employee.last_name;
    employee.email = employee.email;
    employee.phone_number = employee.phone_number;
    employee.password = employee.password;
    employee.role = employee.role;
    const index = employee.channels.indexOf(channelName);
    if(index >= 0)
      employee.channels.splice(index, 1);

    employee.save((err) => {
      const employeeJson=employee.toJSON();
      delete employeeJson.password;
      return res.status(200).json(employee);
    });
  });
};
