'use strict';

const express = require('express');
let server;
let io = require('socket.io')();
const exports = module.exports;

// Constants for listening to Sockets
const CONNECTION = 'connection';
const VALIDATE_COMPANY_ID = 'validate_company_id';
const VISITOR_LIST_UPDATE = 'visitor_list_update';
const DISCONNECT = 'disconnect';
const REMOVE_VISITOR = 'remove_visitor';
const ADD_VISITOR = 'add_visitor';
const NOTIFY_ERROR = 'notify_error';

const VisitorListCtr = require('../routes/visitorList/visitorList.controller');
const Company = require('../models/Company');
/** ******** Socket IO Module **********/
/**
 * Grabs submission details from the submit foo HTML element
 * Calls Foo function with the input string.
 * @param {TYPE} ioIn
 * @return {undefined} ret
 */
exports.createServer = function(ioIn) {
  io = ioIn;

    /*
     * This handles the 'connection' event, which is send when the user is
     * trying to connect a socket.
     *
     * Note that when the connection is established for that client,
     * the '_admin_id' needs to be set so that the client can be added to the
     * room and notified when changes are being made.
     */
  io.on(CONNECTION, (socket) => {
    console.log('SOCKET CONNECTED');
        /* company_id is required to connect to join right socket to listen to*/
    socket.on(VALIDATE_COMPANY_ID, (data) => {
      console.log(data);
      const companyIdIn = data.company_id;
      Company.findOne({_id: companyIdIn}, (err, c) => {
        if(err || !c)
          return;
        else {
          socket.join(companyIdIn);
          VisitorListCtr.getCompanyVisitorList(companyIdIn,
              (errMsg, result) => {
                if(errMsg)
                  exports.notifyError(companyIdIn, {error: errMsg});
                else {
                  exports.notifyNewList(companyIdIn, result);
                }
              });
        }
      });
    });

        // requires the company_id to be sent
    socket.on(VISITOR_LIST_UPDATE, (data) => {
      const companyIdIn = data.company_id;
      console.log('Visitor List Update' + data);
      VisitorListCtr.getCompanyVisitorList(companyIdIn, (errMsg, result) => {
        if(errMsg) {
          exports.notifyError(companyIdIn, {error: errMsg});
        } else
                    exports.notifyNewList(companyIdIn, result);
      });
    });

    socket.on(DISCONNECT, () => {
            // console.log('user disconnected from ' + company_id);
    });

        // requires the company_id and visitor_id to be sent
    socket.on(REMOVE_VISITOR, (data) => {
      console.log(data.company_id);
      const companyIdIn = data.company_id;
      const visitorIdIn = data.visitor_id;
      if(!companyIdIn || !visitorIdIn) return;
      VisitorListCtr.deleteVisitor(companyIdIn, visitorIdIn,
       (errMsg, result) => {
         if(errMsg) {
           console.log('error');
           exports.notifyError(companyIdIn, {error: errMsg});
         } else
                    exports.notifyNewList(companyIdIn, result);
       });
    });

        // require the params to be set with info of the visitor
    socket.on(ADD_VISITOR, (data) => {
      console.log('ADDING VISITOR');
      console.log(data);
      console.log(data.company_id);
      const companyIdIn = data.company_id;
      VisitorListCtr.create(data, (errMsg, result) => {
        if(errMsg) {
          console.log('error');
          exports.notifyError(company_id, {error: errMsg});
        } else {
          exports.notifyNewList(company_id, result);
        }
      });
    });
  });
  return server;
};
/*
 * A function that allows you to notify all clients that
 * the queue has been updated.
 *
 * The client side needs to be listening for the 'queue_updated' event. When
 * this event is triggered, the client side can retrieve the whole queue of
 * patients to reflect the changes.
 */
exports.notifyNewList = function(companyIdIn, data) {
  io.to(companyIdIn).emit(VISITOR_LIST_UPDATE, data);
};

exports.notifyError = function(companyIdIn, data) {
  io.to(companyIdIn).emit(NOTIFY_ERROR, data);
};

/*
 * Set up a custom namespace.
 *
 * On the client side get the socket as follows to robobetty:
 *   var socket = io('/visitorList');
 */
const nsp = io.of('/visitorList');

// To be used with authorization.
// io.set('authorization', socketioJwt.authorize({
//   secret: jwtSecret,
//   handshake: true
// }));
