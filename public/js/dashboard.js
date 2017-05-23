
$(document).ready(() => {
  const socket = io(); // Initialize Socket
  // alert("Created socket");
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
  // alert("socket  on");

  const companyData = JSON.parse(localStorage.getItem('currentCompany'));
  const myCompanyId = companyData._id;
  const visitors = getVisitors(myCompanyId);

  // DashBoard Template
  const source = $('#visitor-list-template').html();
  const template = Handlebars.compile(source);


  // Modal Template
  const modal = $('#visitor-info-template').html();
  const modalTemplate = Handlebars.compile(modal);
  const compiledHtml = template(visitors);
  $('#visitor-list').html(compiledHtml);

  // alert("socket  on");
  // Update Patient List
  // socket.on(VALIDATE_COMPANY_ID, (socket) => {
    // alert("in socket on");
  //   socket.on(VISITOR_LIST_UPDATE, (data) => {
  //     const compiledHtml = template(data);
  //     $('#visitor-list').html(compiledHtml);
  //   });
  // });

  /** *
  * Function Listener for Opening a Modal
  */
  $(document).on('click', '.patient-check-out', function() {
    /* eslint-disable */ // eslint doesn't like 'this'
    const uniqueId = $(this).attr('value');
    /* eslint-enable */

    const visitorData = getVisitorData(myCompanyId, uniqueId);
    alert('Hello dATA:::' + JSON.stringify(visitorData));
    const compiledTemplate = modalTemplate(visitorData);
    $('.modal-dialog').html(compiledTemplate);
    // socket.on(VALIDATE_COMPANY_ID, (socket) => {
    //   socket.emit('send Id', uniqueId);
    //   socket.on('send visitorData', (data) => {
    //     const compiledTemplate = modalTemplate(data);
    //     $('.modal-dialog').html(compiledTemplate);
    //   });
    // });
  });

  $(document).on('click', '.check-in-btn', function() {
    // alert("in CHECKIN BTN CLICK");
    /* eslint-disable */ // eslint doesn't like 'this'
    const id = $(this).closest('.modal-content').find('.phone-number').attr('value');
    /* eslint-enable */
    socket.on(VALIDATE_COMPANY_ID, (socket) => {
      socket.emit('check-in-patient', id);
    });
  });
});


  // Makes a get request to display list of employees
function getVisitors(myCompanyId) {
  // alert("egfsd");
  let json;
  $.ajax({
    dataType: 'json',
    type: 'GET',
    data: $('#response').serialize(),
    async: false,
    url: '/api/visitorLists/company/' + myCompanyId,
    success: function(response) {
      // alert("was success");
      json = response;
      console.log(response);
    },
  });
  alert(JSON.stringify(json.visitors));
  return json.visitors;
}


function getVisitorData(myCompanyId, uniqueId) {
  // alert("egfsd");
  let json;
  $.ajax({
    dataType: 'json',
    type: 'GET',
    data: $('#response').serialize(),
    async: false,
    url: '/api/visitorLists/company/' + myCompanyId,
    success: function(response) {
      // alert("was success");
      json = response;
      console.log(response);
    },
  });

  const container = json.visitors;
  // return JSON.stringify(container[0]);
  for (let i = 0; i < container.length; i++) {
    if (container[i]['_id'] == uniqueId) {
      return(container[i]);
    }
  }
}
