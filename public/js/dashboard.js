
let visitors;
let source;
let template;

let modal;
let modalTemplate;
let compiledHtml;

let companyData;
let myCompanyId;


$(document).ready(() => {
  const socket = io(); // Initialize Socket
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

  companyData = JSON.parse(localStorage.getItem('currentCompany'));
  myCompanyId = companyData._id;

  updateVisitors();
  updateModalVisitor();

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
  let uniqueId;
  $(document).on('click', '.patient-check-out', function() {
    /* eslint-disable */ // eslint doesn't like 'this'
    uniqueId = $(this).attr('value');
    /* eslint-enable */

    const visitorData = getVisitorData(myCompanyId, uniqueId);
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
    /* eslint-disable */ // eslint doesn't like 'this'
    const id = $(this).closest('.modal-content').find('.phone-number').attr('value');
    /* eslint-enable */
    socket.on(VALIDATE_COMPANY_ID, (socket) => {
      socket.emit('check-in-patient', id);
    });
  });

  /* eslint-disable */ // eslint doesn't like 'this'
  $(document).on('click', '.removeButton', function() {
    let json;
    $.ajax({
      dataType: 'json',
      type: 'DELETE',
      data: $('#response').serialize(),
      async: false,
      url: '/api/visitorLists/company/' + myCompanyId + '/visitor/' + uniqueId,
      success: function(response) {
        json = response;
        console.log(response);

        updateVisitors();
        updateModalVisitor();
      },
    });
  });
  /* eslint-enable */ // eslint doesn't like 'this'
});

function updateVisitors() {
  visitors = getVisitors(myCompanyId);
  // DashBoard Template
  source = $('#visitor-list-template').html();
  template = Handlebars.compile(source);
}

function updateModalVisitor() {
    // Modal Template
  modal = $('#visitor-info-template').html();
  modalTemplate = Handlebars.compile(modal);
  compiledHtml = template(visitors);
  $('#visitor-list').html(compiledHtml);
}

// Makes a get request to display list of employees
function getVisitors(myCompanyId) {
  let json;
  $.ajax({
    dataType: 'json',
    type: 'GET',
    data: $('#response').serialize(),
    async: false,
    url: '/api/visitorLists/company/' + myCompanyId,
    success: function(response) {
      json = response;
      console.log(response);
    },
  });
  return json.visitors;
}


function getVisitorData(myCompanyId, uniqueId) {
  let json;
  $.ajax({
    dataType: 'json',
    type: 'GET',
    data: $('#response').serialize(),
    async: false,
    url: '/api/visitorLists/company/' + myCompanyId,
    success: function(response) {
      json = response;
      console.log(response);
    },
  });

  const container = json.visitors;
  // return JSON.stringify(container[0]);
  for (let i = 0; i < container.length; i++) {
    if (container != null && container[i] != null && container[i]['_id'] == uniqueId) {
      return(container[i]);
    }
  }
}
