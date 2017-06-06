'use strict';

// Import Resources and Libs

// var Email = require('../../notification/email');
// var TextModel = require('../../notification/text');

// const VisitorList = require('../../models/VisitorList');
// const Employee = require('../../models/Employee');
// const Appointment = require('../../models/Appointment');

/* handles route for getting the Company's visitor list */
exports.getCompanyVisitorListReq = function(req, res) {
  const userId=req.params.id;
  const slackToken=req.params.token;
  const slackChannel=req.params.channel;
  exports.getCompanyVisitorList(companyIdIn, (errMsg, result) => {
    if(errMsg) return res.status(400).json(errMsg);
    if(result == null) {
      result = new VisitorList();
      result.visitors = [];
      result.company_id = companyId;
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

// This route will be called when a visitor checks in
exports.createReq = function(req, res) {
  exports.create(req.body, (errMsg, result) => {
    if(errMsg) return res.status(400).json(errMsg);
    return res.status(200).json(result);
  });
};

exports.create = function(param, callback) {
    // required fields
  const userId = param.id;
  const slackToken=req.params.token;
  const slackChannel=req.params.channel;

    // find all the appointments for this visitor
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow= new Date();
  tomorrow.setDate(today.getDate()+1);
  tomorrow.setHours(0, 0, 0, 0);

  const query=
    {
      userid: companyIDIn,
      slackToken: slackToken,
      slackChannel: slackChannel,
      date: {$gte: today, $lt: tomorrow},
    };

  SlackDB.find(query, (err, slackDB) => {
    const slacks =
      {
        userid: userId,
        slackChannel: slackChannel,
        slackToken: slackToken,
        date: {$gte: today, $lt: tomorrow},
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
                if (err) return callback({error: 'an error in saving'}, null);
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

