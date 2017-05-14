'use strict';

// Import Resources and Libs

// var Email = require('../../notification/email');
// var TextModel = require('../../notification/text');

const VisitorList = require('../../models/VisitorList');
const Employee = require('../../models/Employee');
const Appointment = require('../../models/Appointment');

/* handles route for getting the Company's visitor list */
exports.getCompanyVisitorListReq = function(req, res) {
  const companyIdIn=req.params.id;
  exports.getCompanyVisitorList(companyIdIn, (errMsg, result) => {
    if(errMsg) return res.status(400).json(errMsg);
    if(result == null) {
      result = new VisitorList();
      result.visitors = [];
      result.company_id=companyId;
      result.save((err) => {
        return res.status(200).json(result);
      });
    }else {
      return res.status(200).json(result);
    }
  });
};


/* logic for getting the Company's visitor list */
exports.getCompanyVisitorList = function(companyIDIn, callback) {
  if(!companyIDIn)
    return callback({error: 'Please send company id.'}, null);
  VisitorList.findOne({company_id: companyIDIn}, (err, list) => {
    if(err) return callback({error: 'Getting Visitor List'}, null);
    if(list==null) {
      list = new VisitorList();
      list.visitors=[];
      list.company_id = companyIDIn;
    }
    list.save((err) => {
      if(err)return callback({error: 'Error in saving'}, null);
      return callback(null, list);
    });
  });
};

/* handles route to delete visitor in the list*/
exports.deleteVisitorReq = function(req, res) {
  const visitorIdIn=req.params.visitor_id;
  const companyIDIn=req.params.company_id;
  exports.deleteVisitor(companyIDIn, visitorIdIn, (errMsg, result) => {
    if(errMsg) return res.status(400).json(errMsg);
    return res.status(200).json(result);
  });
};

/* logic for deleting the visitor in the list */
exports.deleteVisitor = function(companyIDIn, visitorIdIn, callback) {
  if(!companyIDIn)
    return callback({error: 'Please send company id.'}, null);
  if(!visitorIdIn)
    return callback({error: 'Please send visitorList id.'}, null);
  VisitorList.findOneAndUpdate(
        {company_id: companyIDIn},
        {$pull: {visitors: {_id: visitorIdIn}}},
        {safe: true, upsert: true, new: true}, (err, data) => {
          if(err) return callback({error: 'Can\'t update list'}, null);
          return callback(null, data);
        });
};

/* clear the list */
exports.deleteReq = function(req, res) {
  const listId=req.params.id;
  exports.delete(listId, (errMsg, result) => {
    if(errMsg) return res.status(400).json(errMsg);
    return res.status(200).json(result);
  });
};

exports.delete = function(listId, callback) {
  if(!listId)
    return callback({error: 'Please send list id.'}, null);
  VisitorList.findOne({_id: listId}, (err, list) => {
    if(err || list==null) return callback({error: 'Can\'t find company'}, null);
    list.visitors=[];
    list.save((err) => {
      if(err) return callback({error: 'Can\'t save'}, null);
      return callback(null, list);
    });
  });
};
// This route will be called when a visitor checks in
exports.createReq = function(req, res) {
  exports.create(req.body, (errMsg, result) => {
    if(errMsg) return res.status(400).json(errMsg);
    return res.status(200).json(result);
  });
};

exports.create = function(param, callback) {
    // required fields
  const companyIDIn = param.company_id;
  const firstName = param.first_name;
  const lastName = param.last_name;
  const phoneNumber = param.phone_number;
  const checkinTime = param.checkin_time;

    // optional dic var
  const additionalInfo = param.additional_info;

    // find all the appointments for this visitor
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow= new Date();
  tomorrow.setDate(today.getDate()+1);
  tomorrow.setHours(0, 0, 0, 0);

  const query=
    {
      company_id: companyIDIn,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      date: {$gte: today, $lt: tomorrow},
    };

  Appointment.find(query, (err, appointments) => {
    const visitor =
      {
        company_id: companyIDIn,
        last_name: lastName,
        first_name: firstName,
        phone_number: phoneNumber,
        checkin_time: checkinTime,
        additional_info: additionalInfo,
        appointments: appointments,
      };
    VisitorList.findOne(
            {company_id: companyIDIn},
            (err, list) => {
              if(err)
                return callback(
                  {error: 'an error occured while finding'}, null);
              if(list==null) {
                list = new VisitorList();
                list.visitors=[];
                list.company_id = companyIDIn;
              }
              list.visitors.push(visitor);
              list.save((err) => {
                if(err) return callback({error: 'an error in saving'}, null);
                return callback(null, list);
                    /* Employee.find({company : req.body.company_id},
                     function(err, employees) {
                     var i = 0;
                     var respond = function() {
                     i++;
                     if(i == employees.length) {
                     res.status(200).json(list);
                     }
                     };

                     Email.sendEmail(req.body.name, employees,
                      function(){respond();});
                     TextModel.sendText(req.body.name, employees,
                      function(){respond();});
                     }
                     );*/
              });
            }
        );
  });
};

