'use strict';
const log = require('../../log');

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
 * @param {TYPE} io
 * @return {undefined} ret
 */
module.exports.createServer = function(io) {
  log.info('Socket created');
    /*
     * This handles the 'connection' event, which is send when the user is
     * trying to connect a socket.
     *
     * Note that when the connection is established for that client,
     * the '_admin_id' needs to be set so that the client can be added to the
     * room and notified when changes are being made.
     */
  io.on(CONNECTION, (socket) => {
    log.info('SOCKET CONNECTED');
        /* company_id is required to connect to join right socket to listen to*/
    socket.on(VALIDATE_COMPANY_ID, (data) => {
      log.debug(data);
      const companyIdIn = data.company_id;
      Company.findOne({_id: companyIdIn}, (err, c) => {
        if(err || !c)
          return;
        else {
          socket.join(companyIdIn);
          VisitorListCtr.getCompanyVisitorList(companyIdIn,
              (errMsg, result) => {
                if(errMsg)
                  module.exports.notifyError(companyIdIn, {error: errMsg});
                else {
                  module.exports.notifyNewList(companyIdIn, result);
                }
              });
        }
      });
    });

        // requires the company_id to be sent
    socket.on(VISITOR_LIST_UPDATE, (data) => {
      const companyIdIn = data.company_id;
      log.debug('Visitor List Update' + data);
      VisitorListCtr.getCompanyVisitorList(companyIdIn, (errMsg, result) => {
        if(errMsg) {
          module.exports.notifyError(companyIdIn, {error: errMsg});
        } else
                    module.exports.notifyNewList(companyIdIn, result);
      });
    });

    socket.on(DISCONNECT, () => {
            // log.info('user disconnected from ' + company_id);
    });

        // requires the company_id and visitor_id to be sent
    socket.on(REMOVE_VISITOR, (data) => {
      log.debug(data.company_id);
      const companyIdIn = data.company_id;
      const visitorIdIn = data.visitor_id;
      if(!companyIdIn || !visitorIdIn) return;
      VisitorListCtr.deleteVisitor(companyIdIn, visitorIdIn,
       (errMsg, result) => {
         if (errMsg) {
           log.error('Socket Remove Visitor Error:', errMsg);
           module.exports.notifyError(companyIdIn, {error: errMsg});
         } else
                    module.exports.notifyNewList(companyIdIn, result);
       });
    });

        // require the params to be set with info of the visitor
    socket.on(ADD_VISITOR, (data) => {
      log.info('ADDING VISITOR');
      log.debug(data, data.company_id);
      VisitorListCtr.create(data, (errMsg, result) => {
        if(errMsg) {
          log.error('Socket Add Visitor Error:', errMsg);
          module.exports.notifyError(company_id, {error: errMsg});
        } else {
          module.exports.notifyNewList(company_id, result);
        }
      });
    });
  });
};
/*
 * A function that allows you to notify all clients that
 * the queue has been updated.
 *
 * The client side needs to be listening for the 'queue_updated' event. When
 * this event is triggered, the client side can retrieve the whole queue of
 * patients to reflect the changes.
 */
module.exports.notifyNewList = function(companyIdIn, data) {
  io.to(companyIdIn).emit(VISITOR_LIST_UPDATE, data);
};

module.exports.notifyError = function(companyIdIn, data) {
  io.to(companyIdIn).emit(NOTIFY_ERROR, data);
};

/*
 * Set up a custom namespace.
 *
 * On the client side get the socket as follows to robobetty:
 *   var socket = io('/visitorList');
 */
// const nsp = io.of('/visitorList');

// To be used with authorization.
// io.set('authorization', socketioJwt.authorize({
//   secret: jwtSecret,
//   handshake: true
// }));
