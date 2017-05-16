
$(document).ready(() => {
  var socket = io(); // Initialize Socket

  // Socket variables
  // var CONNECTION = "connection";
  const VALIDATE_COMPANY_ID = 'validate_company_id';
  const VISITOR_LIST_UPDATE = 'visitor_list_update';
  const DISCONNECT = 'disconnect';
  const REMOVE_VISITOR = 'remove_visitor';
  const ADD_VISITOR = 'add_visitor';
  /** *
   * Compile all the Handle Bar Templates
   */

  // DashBoard Template
  const source = $('#visitor-list-template').html();
  const template = Handlebars.compile(source);

  // Modal Template
  const modal = $('#visitor-info-template').html();
  const modalTemplate = Handlebars.compile(modal);


  // Update Patient List
  socket.on(VALIDATE_COMPANY_ID, (socket) => {
    socket.on(VISITOR_LIST_UPDATE, (data) => {
      const compiledHtml = template(data);
      $('#visitor-list').html(compiledHtml);
    });
  });


  /** *
  * Function Listener for Opening a Modal
  */
  $(document).on('click', '.patient-check-out', function() {
    const uniqueId = $(this).attr('value');

    socket.on(VALIDATE_COMPANY_ID, (socket) => {
      socket.emit('send Id', uniqueId);
      socket.on('send visitorData', (data) => {
        const compiledTemplate = modalTemplate(data);
        $('.modal-dialog').html(compiledTemplate);
      });
    });
  });

  $(document).on('click', '.check-in-btn', function() {
    const id = $(this).closest('.modal-content').find('.phone-number').attr('value');

    socket.on(VALIDATE_COMPANY_ID, (socket) => {
      socket.emit('check-in-patient', id);
    });
  });
});
